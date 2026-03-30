import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import {
  DASHBOARD_COOKIE_NAME,
  createDashboardAccessValue,
  getCurrentUser,
  isDashboardAdminUser,
  sessionCookieOptions,
} from "@/lib/auth"
import { jsonError } from "@/lib/api"
import { verifyPassword } from "@/lib/security"

async function getDashboardPasskeySource() {
  // Prefer explicit DashboardHashRecord entries (newer flow)
  const currentHashRecord = await prisma.dashboardHashRecord.findFirst({
    where: { isCurrent: true },
    orderBy: { createdAt: "desc" },
    select: { hash: true },
  })

  if (currentHashRecord?.hash) {
    return { source: "db_record" as const, value: currentHashRecord.hash }
  }

  // Backcompat: fall back to appSetting named `dashboardPasskeyHash`
  const dbSetting = await prisma.appSetting.findUnique({ where: { key: "dashboardPasskeyHash" }, select: { value: true } })

  if (dbSetting?.value) {
    return { source: "database" as const, value: dbSetting.value }
  }

  if (process.env.ADMIN_DASHBOARD_KEY_HASH) {
    return {
      source: "env_hash" as const,
      value: process.env.ADMIN_DASHBOARD_KEY_HASH,
    }
  }

  if (process.env.ADMIN_DASHBOARD_KEY) {
    return {
      source: "env_plain" as const,
      value: process.env.ADMIN_DASHBOARD_KEY,
    }
  }

  return {
    source: "none" as const,
    value: "",
  }
}

async function verifyAdminPasskey(passkey: string) {
  const config = await getDashboardPasskeySource()

  if (config.source === "database") {
    return verifyPassword(passkey, config.value)
  }

  if (config.source === "db_record") {
    return verifyPassword(passkey, config.value)
  }

  if (config.source === "env_hash") {
    return verifyPassword(passkey, config.value)
  }

  if (config.source === "env_plain") {
    return passkey === config.value
  }

  return false
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser()
  if (!user || !isDashboardAdminUser(user)) {
    return jsonError("Admin access required", 403)
  }

  try {
    const body = await request.json()
    const passkey = typeof body.passkey === "string" ? body.passkey : ""

    const config = await getDashboardPasskeySource()

    if (config.source === "none") {
      return jsonError("Dashboard passkey is not configured", 400)
    }

    if (!passkey) {
      return jsonError("Passkey is required", 400)
    }

    const matches = await verifyAdminPasskey(passkey)
    if (!matches) {
      return jsonError("Invalid dashboard passkey", 401)
    }

    const access = createDashboardAccessValue(user.id)
    const response = NextResponse.json({ success: true })

    response.cookies.set(DASHBOARD_COOKIE_NAME, access.value, sessionCookieOptions(access.expiresAt))

    return response
  } catch (error) {
    console.error("Dashboard unlock failed", error)
    return jsonError("Unable to unlock dashboard", 500)
  }
}
