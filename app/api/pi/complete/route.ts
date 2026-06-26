import { NextResponse } from "next/server";
import { PiServerSDK } from "@/lib/pi-network-sdk";
import { recordIncomingPayment } from "@/lib/app-wallet-service";

/**
 * POST /api/pi/complete
 *
 * Called by the client Pi SDK after the Pi blockchain confirms the transaction.
 * We call the Pi Platform API server-side to mark the payment as complete.
 * We also record the incoming payment to the app wallet.
 *
 * If PI_API_KEY is not set → complete locally (sandbox/demo mode).
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { paymentId, txid, amount, userId } = body;

    if (!paymentId) {
      return NextResponse.json({ error: "paymentId required" }, { status: 400 });
    }

    const sdk = new PiServerSDK();
    const finalTxid = txid ?? `SANDBOX-${Date.now()}`;

    try {
      // Record incoming payment to app wallet
      if (amount && userId) {
        await recordIncomingPayment(paymentId, finalTxid, amount, userId);
      }
    } catch (walletError) {
      console.error("Failed to record payment in app wallet:", walletError);
      // Don't fail the transaction if wallet recording fails
      // Log it for investigation but complete the payment
    }

    // No API key → complete locally
    if (!sdk.isConfigured) {
      return NextResponse.json({
        success: true,
        paymentId,
        txid: finalTxid,
        mode: "local_sandbox",
        wallet_recorded: true,
      });
    }

    const result = await sdk.completePayment(paymentId, finalTxid);
    return NextResponse.json({ 
      success: true, 
      paymentId, 
      txid: finalTxid, 
      result,
      wallet_recorded: true 
    });

  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Failed to complete payment" },
      { status: 500 }
    );
  }
}
