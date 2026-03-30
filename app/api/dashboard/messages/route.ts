import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getCurrentUser, hasDashboardAccess, isDashboardAdminUser } from "@/lib/auth"
import { jsonError } from "@/lib/api"

export async function GET() {
  const user = await getCurrentUser()
  if (!isDashboardAdminUser(user)) {
    return jsonError("Admin access required", 403)
  }

  const dashboardAccess = await hasDashboardAccess()
  if (!dashboardAccess) {
    return jsonError("Dashboard unlock required", 401)
  }

  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      handledBy: {
        select: { id: true, name: true, email: true },
      },
    },
  })

  return NextResponse.json({ messages })
}
