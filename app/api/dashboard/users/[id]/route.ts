import { NextRequest, NextResponse } from "next/server"
import { UserRole } from "@prisma/client"
import prisma from "@/lib/prisma"
import {
  getCurrentUser,
  hasDashboardAccess,
  isConfiguredAdminEmail,
  isDashboardAdminUser,
  revokeAllUserSessions,
} from "@/lib/auth"
import { jsonError } from "@/lib/api"

type RouteParams = { params: Promise<{ id: string }> }

async function requireAdminDashboardAccess() {
  const user = await getCurrentUser()
  if (!isDashboardAdminUser(user)) {
    return null
  }

  const unlocked = await hasDashboardAccess()
  if (!unlocked) {
    return null
  }

  return user
}

async function activeAdminCount() {
  const admins = await prisma.user.findMany({
    where: {
      role: UserRole.ADMIN,
      OR: [{ deletedAt: null }, { deletedAt: { isSet: false } }],
    },
    select: {
      email: true,
    },
  })

  return admins.filter((admin) => isConfiguredAdminEmail(admin.email)).length
}

export async function PATCH(request: NextRequest, context: RouteParams) {
  const actor = await requireAdminDashboardAccess()
  if (!actor) {
    return jsonError("Admin dashboard access required", 403)
  }

  const { id } = await context.params

  try {
    const body = await request.json()
    const nextRole = body.role === "ADMIN" ? UserRole.ADMIN : body.role === "MEMBER" ? UserRole.MEMBER : null

    if (!nextRole) {
      return jsonError("Valid role is required", 400)
    }

    const target = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        deletedAt: true,
      },
    })

    if (!target || target.deletedAt) {
      return jsonError("User not found", 404)
    }

    if (target.id === actor.id && nextRole !== UserRole.ADMIN) {
      return jsonError("You cannot demote your own admin role", 400)
    }

    const targetIsConfiguredAdmin = isConfiguredAdminEmail(target.email)
    if (nextRole === UserRole.ADMIN && !targetIsConfiguredAdmin) {
      return jsonError("Only emails listed in ADMIN_EMAILS can be assigned ADMIN", 400)
    }

    if (nextRole === UserRole.MEMBER && targetIsConfiguredAdmin) {
      return jsonError("Configured admin accounts cannot be demoted", 400)
    }

    if (target.role === UserRole.ADMIN && nextRole === UserRole.MEMBER) {
      const admins = await activeAdminCount()
      if (admins <= 1) {
        return jsonError("At least one admin is required", 400)
      }
    }

    const updated = await prisma.user.update({
      where: { id: target.id },
      data: { role: nextRole },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json({
      success: true,
      user: updated,
    })
  } catch (error) {
    console.error("User role update failed", error)
    return jsonError("Unable to update user role", 500)
  }
}

export async function DELETE(_: NextRequest, context: RouteParams) {
  const actor = await requireAdminDashboardAccess()
  if (!actor) {
    return jsonError("Admin dashboard access required", 403)
  }

  const { id } = await context.params

  const target = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      role: true,
      deletedAt: true,
    },
  })

  if (!target || target.deletedAt) {
    return jsonError("User not found", 404)
  }

  if (target.id === actor.id) {
    return jsonError("You cannot delete your own account from dashboard", 400)
  }

  if (target.role === UserRole.ADMIN && isConfiguredAdminEmail(target.email)) {
    const admins = await activeAdminCount()
    if (admins <= 1) {
      return jsonError("At least one admin is required", 400)
    }
  }

  await prisma.user.update({
    where: { id: target.id },
    data: {
      name: "Deleted User",
      email: `deleted-${target.id}-${Date.now()}@deleted.local`,
      deletedAt: new Date(),
    },
  })

  await revokeAllUserSessions(target.id)

  return NextResponse.json({ success: true })
}
