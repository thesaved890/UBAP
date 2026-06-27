import { NextResponse } from "next/server"
import { getOrCreateUser } from "@/lib/user-service"

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const { piUid, username } = body as { piUid?: string; username?: string }

    if (!piUid || !username) {
      return NextResponse.json(
        { error: "piUid and username are required" },
        { status: 400 }
      )
    }

    const user = await getOrCreateUser(piUid, username, (body as { country?: string }).country || "Nigeria")

    return NextResponse.json({ user, mode: process.env.NEXT_PUBLIC_SUPABASE_URL ? "supabase" : "local" })
  } catch (error: any) {
    console.error("[v0] /api/auth/pi-login error:", error)
    return NextResponse.json(
      { error: error?.message ?? "Failed to authenticate Pi user" },
      { status: 500 }
    )
  }
}
