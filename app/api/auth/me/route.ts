import { NextResponse } from "next/server"
import { getCurrentUser, hasDashboardAccess } from "@/lib/auth"

export async function GET() {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ user: null })
  }

  return NextResponse.json({
    user,
    dashboardAccess: await hasDashboardAccess(),
  })
}
