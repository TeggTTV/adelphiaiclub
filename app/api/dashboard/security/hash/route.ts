import { NextRequest, NextResponse } from "next/server"
import { DashboardHashAction } from "@prisma/client"
import prisma from "@/lib/prisma"
import { getCurrentUser, hasDashboardAccess, isDashboardAdminUser } from "@/lib/auth"
import { jsonError } from "@/lib/api"
import { hashPassword } from "@/lib/security"

async function assertAdminDashboardAccess() {
  const user = await getCurrentUser()
  if (!user) {
    return { ok: false as const, response: jsonError("Sign in required", 401) }
  }

  if (!isDashboardAdminUser(user)) {
    return { ok: false as const, response: jsonError("Admin access required", 403) }
  }

  const unlocked = await hasDashboardAccess()
  if (!unlocked) {
    return {
      ok: false as const,
      response: jsonError("Dashboard unlock required (Ctrl+Shift+D)", 401),
    }
  }

  return { ok: true as const, user }
}

export async function POST(request: NextRequest) {
  const access = await assertAdminDashboardAccess()
  if (!access.ok) {
    return access.response
  }

  try {
    const body = await request.json()
    const password = typeof body.password === "string" ? body.password : ""

    if (!password || password.length < 8) {
      return jsonError("Password must be at least 8 characters", 400)
    }

    const hash = await hashPassword(password)

    const record = await prisma.dashboardHashRecord.create({
      data: {
        hash,
        action: DashboardHashAction.GENERATED,
        isCurrent: false,
        createdById: access.user.id,
        createdByName: access.user.name,
        createdByEmail: access.user.email,
      },
      select: {
        id: true,
        action: true,
        createdAt: true,
        createdByName: true,
        createdByEmail: true,
      },
    })

    return NextResponse.json({
      success: true,
      hash,
      record,
    })
  } catch (error) {
    console.error("Hash generation failed", error)
    return jsonError("Unable to generate hash", 500)
  }
}
