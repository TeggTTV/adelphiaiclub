import { DashboardHashAction } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getCurrentUser, hasDashboardAccess, isDashboardAdminUser } from "@/lib/auth"
import { jsonError } from "@/lib/api"
import { hashPassword } from "@/lib/security"

const DASHBOARD_PASSKEY_KEY = "dashboardPasskeyHash"

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

function getEnvSource() {
  if (process.env.ADMIN_DASHBOARD_KEY_HASH) {
    return "env_hash"
  }

  if (process.env.ADMIN_DASHBOARD_KEY) {
    return "env_plain"
  }

  return "none"
}

async function getPasskeyStatus() {
  const [setting, currentRecord, latestRecords] = await Promise.all([
    prisma.appSetting.findUnique({
      where: { key: DASHBOARD_PASSKEY_KEY },
      select: {
        value: true,
        updatedAt: true,
      },
    }),
    prisma.dashboardHashRecord.findFirst({
      where: {
        isCurrent: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        action: true,
        isCurrent: true,
        createdById: true,
        createdByName: true,
        createdByEmail: true,
        createdAt: true,
      },
    }),
    prisma.dashboardHashRecord.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
      select: {
        id: true,
        action: true,
        isCurrent: true,
        createdById: true,
        createdByName: true,
        createdByEmail: true,
        createdAt: true,
      },
    }),
  ])

  const source = setting?.value ? "database" : getEnvSource()
  const configured = source !== "none"

  return {
    configured,
    source,
    updatedAt: setting?.updatedAt || null,
    dashboardUnlocked: true,
    currentHash: currentRecord
      ? {
          id: currentRecord.id,
          action: currentRecord.action,
          createdById: currentRecord.createdById,
          createdByName: currentRecord.createdByName,
          createdByEmail: currentRecord.createdByEmail,
          createdAt: currentRecord.createdAt,
          inUse: source === "database" && currentRecord.isCurrent,
        }
      : null,
    hashLog: latestRecords.map((record) => ({
      id: record.id,
      action: record.action,
      inUse: source === "database" && record.isCurrent,
      createdById: record.createdById,
      createdByName: record.createdByName,
      createdByEmail: record.createdByEmail,
      createdAt: record.createdAt,
    })),
  }
}

export async function GET() {
  const access = await assertAdminDashboardAccess()
  if (!access.ok) {
    return access.response
  }

  return NextResponse.json(await getPasskeyStatus())
}

export async function POST(request: NextRequest) {
  const access = await assertAdminDashboardAccess()
  if (!access.ok) {
    return access.response
  }

  try {
    const body = await request.json()
    const newPasskey = typeof body.newPasskey === "string" ? body.newPasskey : ""

    if (!newPasskey || newPasskey.length < 10) {
      return jsonError("New passkey must be at least 10 characters", 400)
    }

    const hash = await hashPassword(newPasskey)

    await prisma.$transaction([
      prisma.dashboardHashRecord.updateMany({
        where: { isCurrent: true },
        data: { isCurrent: false },
      }),
      prisma.dashboardHashRecord.create({
        data: {
          hash,
          action: DashboardHashAction.ACTIVATED,
          isCurrent: true,
          createdById: access.user.id,
          createdByName: access.user.name,
          createdByEmail: access.user.email,
        },
      }),
      prisma.appSetting.upsert({
        where: { key: DASHBOARD_PASSKEY_KEY },
        update: { value: hash },
        create: {
          key: DASHBOARD_PASSKEY_KEY,
          value: hash,
        },
      }),
    ])

    return NextResponse.json({
      success: true,
      ...(await getPasskeyStatus()),
    })
  } catch (error) {
    console.error("Passkey update failed", error)
    return jsonError("Unable to update dashboard passkey", 500)
  }
}

export async function DELETE() {
  const access = await assertAdminDashboardAccess()
  if (!access.ok) {
    return access.response
  }

  await prisma.$transaction([
    prisma.dashboardHashRecord.updateMany({
      where: { isCurrent: true },
      data: { isCurrent: false },
    }),
    prisma.appSetting.deleteMany({
      where: { key: DASHBOARD_PASSKEY_KEY },
    }),
  ])

  return NextResponse.json({
    success: true,
    ...(await getPasskeyStatus()),
  })
}
