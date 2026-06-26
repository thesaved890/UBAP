/**
 * UBAP — Pi Network SDK (client-side payments)
 *
 * BANKING DEPOSIT FLOW:
 * ─────────────────────
 * User's Pi Wallet → UBAP App Wallet
 *
 * 1. User enters amount in UBAP and taps "Deposer"
 * 2. Pi.createPayment() opens the user's OWN Pi Wallet inside Pi Browser
 * 3. User sees the amount and confirms with their Pi credentials
 * 4. Pi SDK fires onReadyForServerApproval → /api/pi/approve (server tells Pi: "OK")
 * 5. Pi blockchain settles the transaction (user's wallet debited)
 * 6. Pi SDK fires onReadyForServerCompletion → /api/pi/complete (server records txid)
 * 7. UBAP credits the user's internal balance
 *
 * REQUIREMENTS:
 * ─────────────
 * - Must run inside Pi Browser (mobile app)
 * - Pi.authenticate(["username","payments"]) must be called first (done in pi-auth-context.tsx)
 * - PI_API_KEY env var must be set in Vercel for server-side approval/completion
 *   Get it from: https://develop.pi → Your App → API Keys
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PiPaymentResult {
  paymentId: string;
  txid: string;
  amount: number;
  status: "completed" | "cancelled" | "error";
}

// ─── Server-side SDK (API routes only) ───────────────────────────────────────

export class PiServerSDK {
  private readonly apiKey: string;
  private readonly baseUrl = "https://api.minepi.com/v2";

  constructor() {
    this.apiKey = process.env.PI_API_KEY ?? "";
    console.log("[v0] PiServerSDK initialized. API Key configured:", this.apiKey.length > 0 ? `${this.apiKey.substring(0, 10)}...` : "NOT SET");
  }

  get isConfigured(): boolean {
    const configured = this.apiKey.length > 20; // Pi API keys are typically 64+ chars
    console.log("[v0] PiServerSDK.isConfigured:", configured, "Key length:", this.apiKey.length);
    return configured;
  }

  private async call(path: string, options: RequestInit = {}): Promise<any> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: {
        Authorization: `Key ${this.apiKey}`,
        "Content-Type": "application/json",
        ...(options.headers ?? {}),
      },
    });

    if (!res.ok) {
      const body = await res.text();
      // Parse common Pi API errors into readable codes
      if (body.toLowerCase().includes("wallet")) throw new Error("WALLET_NOT_SETUP");
      if (body.toLowerCase().includes("scope"))  throw new Error("MISSING_PAYMENT_SCOPE");
      throw new Error(`Pi API ${res.status}: ${body}`);
    }

    return res.json();
  }

  async approvePayment(paymentId: string): Promise<any> {
    if (!this.isConfigured) throw new Error("MISSING_API_KEY");
    return this.call(`/payments/${paymentId}/approve`, { method: "POST" });
  }

  async completePayment(paymentId: string, txid: string): Promise<any> {
    if (!this.isConfigured) throw new Error("MISSING_API_KEY");
    return this.call(`/payments/${paymentId}/complete`, {
      method: "POST",
      body: JSON.stringify({ txid }),
    });
  }

  async getPayment(paymentId: string): Promise<any> {
    if (!this.isConfigured) throw new Error("MISSING_API_KEY");
    return this.call(`/payments/${paymentId}`);
  }
}

// ─── Client-side payment initiator ───────────────────────────────────────────

export function initiatePiPayment(
  amount: number,
  memo: string,
  metadata: Record<string, any> = {}
): Promise<PiPaymentResult> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      return reject(new Error("Must be called client-side."));
    }

    const Pi = (window as any).Pi;

    if (!Pi) {
      return reject(
        new Error(
          "NO_PI_BROWSER: Pour deposer de vrais Pi, ouvrez UBAP dans Pi Browser sur votre telephone."
        )
      );
    }

    if (typeof Pi.createPayment !== "function") {
      return reject(
        new Error(
          "OUTDATED_SDK: Mettez a jour Pi Browser vers la derniere version pour utiliser les paiements."
        )
      );
    }

    Pi.createPayment(
      { amount, memo, metadata },
      {
        // Step 1: Payment created — server must approve it
        onReadyForServerApproval: (paymentId: string) => {
          fetch("/api/pi/approve", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId }),
          }).catch(() => {
            // Non-blocking: Pi SDK will retry
          });
        },

        // Step 2: Blockchain confirmed — server must complete it, then we credit balance
        onReadyForServerCompletion: (paymentId: string, txid: string) => {
          fetch("/api/pi/complete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId, txid }),
          })
            .catch(() => { /* Non-blocking */ })
            .finally(() => {
              resolve({ paymentId, txid, amount, status: "completed" });
            });
        },

        // User closed the Pi Wallet dialog without paying
        onCancel: (paymentId: string) => {
          reject(new Error(`CANCELLED:${paymentId}`));
        },

        // Pi SDK internal error
        onError: (error: Error, payment?: any) => {
          const msg = error?.message ?? "";
          if (msg.includes("wallet") || msg.includes("Wallet")) {
            reject(new Error("WALLET_NOT_SETUP:" + msg));
          } else if (msg.includes("scope") || msg.includes("payment")) {
            reject(new Error("SCOPE_ERROR:" + msg));
          } else {
            reject(error);
          }
        },
      }
    );
  });
}
