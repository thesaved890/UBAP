import { NextResponse } from "next/server"

/**
 * GET /api/pi/status
 *
 * Returns Pi integration configuration status.
 * Used by the deposit page to show setup instructions when needed.
 */
export async function GET() {
  const apiKey = process.env.PI_API_KEY || "ic0tlakkfjllvvjkw1jkvyu5lz2kfgy9zibfe9rtol51wwmakd5qi3wfhngd2kpn"

  if (!apiKey) {
    return NextResponse.json({
      configured: false,
      walletReady: false,
      message: "PI_API_KEY not set in Vercel environment variables.",
    })
  }

  try {
    const res = await fetch("https://api.minepi.com/v2/me", {
      headers: { Authorization: `Key ${apiKey}` },
    })

    const walletReady = res.ok
    const text = await res.text()
    const walletMissing = res.status === 403 || text.toLowerCase().includes("wallet")

    return NextResponse.json({
      configured: true,
      walletReady: !walletMissing && walletReady,
      message: walletMissing
        ? "API key found but app wallet not configured on develop.pi."
        : walletReady
          ? "Pi integration fully configured."
          : `Pi API responded with ${res.status}.`,
    })
  } catch {
    return NextResponse.json({
      configured: !!apiKey,
      walletReady: false,
      message: "Could not reach Pi API.",
    })
  }
}
