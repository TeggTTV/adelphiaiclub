import { NextRequest, NextResponse } from "next/server"
import {
  DASHBOARD_COOKIE_NAME,
  SESSION_COOKIE_NAME,
  clearCookieOptions,
  revokeSessionByToken,
} from "@/lib/auth"

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true })

  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value
  if (sessionCookie) {
    await revokeSessionByToken(sessionCookie)
  }

  response.cookies.set(SESSION_COOKIE_NAME, "", clearCookieOptions())
  response.cookies.set(DASHBOARD_COOKIE_NAME, "", clearCookieOptions())

  return response
}
