import { NextResponse } from "next/server"
import { getCurrentUser, isDashboardAdminUser } from "@/lib/auth"
import { jsonError } from "@/lib/api"

export async function POST() {
  const user = await getCurrentUser()
  if (!user || !isDashboardAdminUser(user)) {
    return jsonError("Admin access required", 403)
  }

  return NextResponse.json({ success: true })
}
