import { NextResponse } from "next/server";
import { PiServerSDK } from "@/lib/pi-network-sdk";
import { logAuditEvent } from "@/lib/audit-service";

/**
 * POST /api/pi/approve
 *
 * Called by the client Pi SDK when the user has confirmed their payment
 * in Pi Wallet. We call the Pi Platform API server-side to approve it.
 *
 * If PI_API_KEY is not set → we approve locally in sandbox mode.
 * This lets real users with Pi Browser test the full flow even before
 * PI_API_KEY is configured in Vercel.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { paymentId } = body;

    if (!paymentId) {
      return NextResponse.json({ error: "paymentId required" }, { status: 400 });
    }

    console.log("[v0] Approve route called with paymentId:", paymentId);
    const sdk = new PiServerSDK();

    // No API key → approve locally (sandbox/demo)
    if (!sdk.isConfigured) {
      console.log("[v0] API Key not configured, approving in sandbox mode");
      await logAuditEvent("pi_payment_approved", "Payment approved in sandbox mode", { paymentId, mode: "sandbox" });
      return NextResponse.json({
        success: true,
        paymentId,
        mode: "sandbox",
        note: "PI_API_KEY not set — approved locally. Add PI_API_KEY in Vercel for production.",
      });
    }

    console.log("[v0] Calling Pi API to approve payment");
    const result = await sdk.approvePayment(paymentId);
    await logAuditEvent("pi_payment_approved", "Payment approved with Pi API", { paymentId, mode: "pi_api" });
    console.log("[v0] Payment approved successfully");
    return NextResponse.json({ success: true, paymentId, result });

  } catch (err: any) {
    const code = err?.message?.split(":")[0] ?? "ERROR";
    console.error("[v0] Approve error:", code, err?.message);

    const messages: Record<string, string> = {
      WALLET_NOT_SETUP:
        "App wallet not configured. Go to https://develop.pi → Your App → App Wallet → Setup Wallet.",
      MISSING_API_KEY:
        "PI_API_KEY not set. Add it in Vercel → Settings → Environment Variables.",
      MISSING_PAYMENT_SCOPE:
        "Payment scope missing. User must re-authenticate with 'payments' scope.",
    };

    return NextResponse.json(
      { error: messages[code] ?? err?.message ?? "Failed to approve payment", code },
      { status: 500 }
    );
  }
}
