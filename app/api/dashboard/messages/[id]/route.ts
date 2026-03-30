import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getCurrentUser, hasDashboardAccess, isDashboardAdminUser } from "@/lib/auth"
import { jsonError } from "@/lib/api"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser()
  if (!isDashboardAdminUser(user)) {
    return jsonError("Admin access required", 403)
  }

  const dashboardAccess = await hasDashboardAccess()
  if (!dashboardAccess) {
    return jsonError("Dashboard unlock required", 401)
  }

  const { id } = params
  try {
    const updated = await prisma.message.update({
      where: { id },
      data: {
        read: true,
        handledById: user?.id || undefined,
        handledAt: new Date(),
      },
    })

    return NextResponse.json({ message: updated })
  } catch (err) {
    console.error("Unable to mark message as read:", err)
    return jsonError("Unable to update message", 500)
  }
}
