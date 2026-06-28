"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { PI_NETWORK_CONFIG } from "@/lib/system-config";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface PiUser {
  uid: string;
  username: string;
}

export interface LoginDTO {
  id: string;
  pi_uid?: string;
  username: string;
  country?: string;
  balance_pi?: number;
  balance_fiat?: number;
  created_at?: string;
  updated_at?: string;
  credits_balance?: number;
  terms_accepted?: boolean;
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
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => void;
  reinitialize: () => Promise<void>;
}

const PiAuthContext = createContext<PiAuthContextType | undefined>(undefined);
const AUTH_STORAGE_KEY = "ubap:pi-auth";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function isPiBrowser(): boolean {
  if (typeof window === "undefined") return false;
  return typeof (window as any).Pi !== "undefined";
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

function readStoredAuth() {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStoredAuth(token: string | null, user: LoginDTO | null) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ token, user }));
  } catch {
    // ignore storage errors
  }
}

function clearStoredAuth() {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    // ignore storage errors
  }
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function PiAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMessage, setAuthMessage]         = useState("Initialisation UBAP...");
  const [piAccessToken, setPiAccessToken]     = useState<string | null>(null);
  const [userData, setUserData]               = useState<LoginDTO | null>(null);
  const [isSandbox, setIsSandbox]             = useState(true);
  const [isLoading, setIsLoading]             = useState(true);

  const initialize = async () => {
    setIsLoading(true);
    try {
      const storedSession = readStoredAuth();
      if (storedSession?.user) {
        setUserData(storedSession.user);
        setPiAccessToken(storedSession.token ?? null);
        setIsAuthenticated(true);
        setAuthMessage("Session restaurée");
        setIsSandbox(PI_NETWORK_CONFIG.SANDBOX);
        setIsLoading(false);
        return;
      }

      setAuthMessage("Chargement Pi SDK...");
      if (PI_NETWORK_CONFIG.SDK_URL) {
        await loadSDKScript(PI_NETWORK_CONFIG.SDK_URL);
      }

      if (!isPiBrowser()) {
        setAuthMessage(
          "Pi Browser requis. Ouvrez UBAP dans Pi Browser sur mobile pour vous connecter."
        );
        setIsAuthenticated(false);
        setIsSandbox(PI_NETWORK_CONFIG.SANDBOX);
        return;
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
      const loginResponse = await fetch("/api/auth/pi-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessToken: authResult.accessToken,
          piUid: authResult.user.uid,
          username: authResult.user.username,
        }),
      });

      if (!loginResponse.ok) {
        throw new Error("Impossible de recuperer l'utilisateur depuis le serveur UBAP");
      }

      const loginData = await loginResponse.json();
      const user: LoginDTO = loginData.user ?? loginData;
      setUserData(user);
      writeStoredAuth(authResult.accessToken, user);

      setIsAuthenticated(true);
      setAuthMessage("Connecte!");
    } catch (err: any) {
      console.error("[v0] Pi auth error:", err?.message ?? err);
      setAuthMessage(
        "Echec d'authentification Pi. Ouvrez UBAP dans Pi Browser et essayez de nouveau."
      );
      setUserData(null);
      setIsAuthenticated(false);
      setIsSandbox(PI_NETWORK_CONFIG.SANDBOX);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearStoredAuth();
    setIsAuthenticated(false);
    setUserData(null);
    setPiAccessToken(null);
    setAuthMessage("Déconnecté. Appuyez sur Se connecter pour vous reconnecter.");
    setIsSandbox(PI_NETWORK_CONFIG.SANDBOX);
    setIsLoading(false);
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
    isLoading,
    login: initialize,
    logout,
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
