import { NextResponse } from "next/server"
import { getCurrentUser, isDashboardAdminUser } from "@/lib/auth"

export async function GET() {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ user: null })
  }

  const isDashboardAdmin = isDashboardAdminUser(user)

  return NextResponse.json({
    user,
    isDashboardAdmin,
    dashboardAccess: isDashboardAdmin,
  })
}
