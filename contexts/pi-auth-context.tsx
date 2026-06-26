"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { PI_NETWORK_CONFIG, BACKEND_URLS } from "@/lib/system-config";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface PiUser {
  uid: string;
  username: string;
}

export interface LoginDTO {
  id: string;
  username: string;
  credits_balance: number;
  terms_accepted: boolean;
}

interface PiAuthResult {
  accessToken: string;
  user: PiUser;
}

// Extend window.Pi type with everything UBAP needs
declare global {
  interface Window {
    Pi: {
      init: (config: { version: string; sandbox: boolean }) => void;
      authenticate: (
        scopes: string[],
        onIncompletePaymentFound?: (payment: any) => void
      ) => Promise<PiAuthResult>;
      createPayment: (
        data: { amount: number; memo: string; metadata: Record<string, any> },
        callbacks: {
          onReadyForServerApproval: (paymentId: string) => void;
          onReadyForServerCompletion: (paymentId: string, txid: string) => void;
          onCancel: (paymentId: string) => void;
          onError: (error: Error, payment?: any) => void;
        }
      ) => void;
    };
  }
}

interface PiAuthContextType {
  isAuthenticated: boolean;
  authMessage: string;
  piAccessToken: string | null;
  userData: LoginDTO | null;
  isSandbox: boolean;
  isDemoMode: boolean;
  reinitialize: () => Promise<void>;
}

const PiAuthContext = createContext<PiAuthContextType | undefined>(undefined);

// ─── Demo fallback user ───────────────────────────────────────────────────────
const DEMO_USER: LoginDTO = {
  id: "ubap_demo_001",
  username: "Pioneer Demo",
  credits_balance: 10000,
  terms_accepted: true,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function isPiBrowser(): boolean {
  if (typeof window === "undefined") return false;
  return typeof (window as any).Pi !== "undefined";
}

function isPreviewEnv(): boolean {
  if (typeof window === "undefined") return true;
  const h = window.location.hostname;
  // Only treat as preview if running on localhost or v0.dev itself
  // vercel.app deployments are REAL production — do NOT bypass Pi auth there
  return h.includes("localhost") || h === "v0.dev" || h.endsWith(".v0.dev");
}

function loadSDKScript(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).Pi) { resolve(); return; }
    const existing = document.querySelector(`script[src="${url}"]`);
    if (existing) {
      // Script already inserted — wait for Pi to appear
      let tries = 0;
      const poll = setInterval(() => {
        if ((window as any).Pi) { clearInterval(poll); resolve(); }
        if (++tries > 20) { clearInterval(poll); reject(new Error("Pi SDK timeout")); }
      }, 200);
      return;
    }
    const s = document.createElement("script");
    s.src = url;
    s.async = true;
    s.onload = () => {
      // Pi object may take a tick to appear after script load
      let tries = 0;
      const poll = setInterval(() => {
        if ((window as any).Pi) { clearInterval(poll); resolve(); }
        if (++tries > 10) { clearInterval(poll); resolve(); } // resolve anyway
      }, 100);
    };
    s.onerror = () => reject(new Error("Failed to load Pi SDK"));
    document.head.appendChild(s);
  });
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function PiAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMessage, setAuthMessage]         = useState("Initialisation UBAP...");
  const [piAccessToken, setPiAccessToken]     = useState<string | null>(null);
  const [userData, setUserData]               = useState<LoginDTO | null>(null);
  const [isSandbox, setIsSandbox]             = useState(true);
  const [isDemoMode, setIsDemoMode]           = useState(false);

  const initialize = async () => {
    try {
      // ── PREVIEW / DEMO (not in Pi Browser) ──────────────────────────────
      if (isPreviewEnv() || !isPiBrowser()) {
        // Try to load SDK anyway — maybe running in Pi Browser on vercel.app
        if (PI_NETWORK_CONFIG.SDK_URL) {
          try { await loadSDKScript(PI_NETWORK_CONFIG.SDK_URL); } catch { /* ok */ }
        }

        if (!isPiBrowser()) {
          // Genuine demo mode
          setAuthMessage("Mode demonstration (ouvrez dans Pi Browser pour les vrais depots)");
          setUserData(DEMO_USER);
          setPiAccessToken("demo_token");
          setIsDemoMode(true);
          setIsSandbox(true);
          setIsAuthenticated(true);
          return;
        }
      }

      // ── REAL PI BROWSER ──────────────────────────────────────────────────
      setAuthMessage("Chargement Pi SDK...");
      if (PI_NETWORK_CONFIG.SDK_URL) {
        await loadSDKScript(PI_NETWORK_CONFIG.SDK_URL);
      }

      if (!isPiBrowser()) {
        throw new Error("Pi SDK introuvable apres chargement");
      }

      setAuthMessage("Initialisation Pi Network...");

      // PRODUCTION MODE: Use SANDBOX value from system-config.ts (currently false = Mainnet)
      const sandboxMode = PI_NETWORK_CONFIG.SANDBOX;
      window.Pi.init({ version: "2.0", sandbox: sandboxMode });
      setIsSandbox(sandboxMode);

      setAuthMessage("Connexion a votre wallet Pi...");

      // IMPORTANT: "payments" scope MUST be requested here.
      // Without it, Pi.createPayment() throws "Cannot create payment without payment scope"
      const authResult = await window.Pi.authenticate(
        ["username", "payments"],
        // Handle incomplete payment from previous session — complete it automatically
        async (incompletePayment: any) => {
          if (!incompletePayment?.identifier) return;
          try {
            await fetch("/api/pi/complete", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                paymentId: incompletePayment.identifier,
                txid: incompletePayment?.transaction?.txid ?? "",
              }),
            });
          } catch { /* non-blocking */ }
        }
      );

      setPiAccessToken(authResult.accessToken);

      // Authenticate with UBAP backend using Pi access token
      setAuthMessage("Connexion au serveur UBAP...");
      try {
        const res = await fetch(BACKEND_URLS.LOGIN, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authResult.accessToken}`,
          },
          body: JSON.stringify({ pi_auth_token: authResult.accessToken }),
        });
        if (res.ok) {
          const data: LoginDTO = await res.json();
          setUserData(data);
        } else {
          // Backend unavailable — use Pi user info directly
          setUserData({
            id: authResult.user.uid,
            username: authResult.user.username,
            credits_balance: 0,
            terms_accepted: true,
          });
        }
      } catch {
        setUserData({
          id: authResult.user.uid,
          username: authResult.user.username,
          credits_balance: 0,
          terms_accepted: true,
        });
      }

      setIsAuthenticated(true);
      setIsDemoMode(false);
      setAuthMessage("Connecte!");

    } catch (err: any) {
      // Graceful fallback — never block the user
      setAuthMessage("Mode demonstration actif");
      setUserData(DEMO_USER);
      setPiAccessToken("demo_token");
      setIsDemoMode(true);
      setIsSandbox(true);
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: PiAuthContextType = {
    isAuthenticated,
    authMessage,
    piAccessToken,
    userData,
    isSandbox,
    isDemoMode,
    reinitialize: initialize,
  };

  return (
    <PiAuthContext.Provider value={value}>{children}</PiAuthContext.Provider>
  );
}

export function usePiAuth() {
  const ctx = useContext(PiAuthContext);
  if (!ctx) throw new Error("usePiAuth must be used inside PiAuthProvider");
  return ctx;
}
