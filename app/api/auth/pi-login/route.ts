import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const { piUid, username, accessToken } = body as { piUid?: string; username?: string; accessToken?: string }

    let finalPiUid = piUid
    let finalUsername = username

    if (accessToken) {
      try {
        const verifyRes = await fetch("https://api.minepi.com/v2/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        if (verifyRes.ok) {
          const meData = await verifyRes.json()
          if (meData.uid) {
            finalPiUid = meData.uid
            if (meData.username) {
              finalUsername = meData.username
            }
            console.log("[pi-login] Securely verified user via Pi API /me:", finalUsername)
          }
        } else {
          console.warn("[pi-login] Failed to verify access token against Pi Platform API, status:", verifyRes.status)
        }
      } catch (verifyError) {
        console.error("[pi-login] Error verifying access token with Pi /me API:", verifyError)
      }
    }

    if (!finalPiUid || !finalUsername) {
      return NextResponse.json(
        { error: "piUid and username are required" },
        { status: 400 }
      )
    }

    // Lazy-load user-service to avoid importing Supabase client at build-time
    const { getOrCreateUser } = await import("@/lib/user-service")
    const user = await getOrCreateUser(finalPiUid, finalUsername, (body as { country?: string }).country || "Nigeria")

    return NextResponse.json({ user, mode: process.env.NEXT_PUBLIC_SUPABASE_URL ? "supabase" : "local" })
  } catch (error: any) {
    console.error("[v0] /api/auth/pi-login error:", error)
    return NextResponse.json(
      { error: error?.message ?? "Failed to authenticate Pi user" },
      { status: 500 }
    )
  }
}
