import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getCurrentUser, hasDashboardAccess } from "@/lib/auth"
import { jsonError } from "@/lib/api"

export async function GET() {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return jsonError("Admin access required", 403)
  }

  const unlocked = await hasDashboardAccess()
  if (!unlocked) {
    return jsonError("Dashboard unlock required", 401)
  }

  const users = await prisma.user.findMany({
    where: {
      OR: [{ deletedAt: null }, { deletedAt: { isSet: false } }],
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      bio: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  return NextResponse.json({
    users,
  })
}
