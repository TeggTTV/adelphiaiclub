import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getCurrentUser, hasDashboardAccess, isDashboardAdminUser } from "@/lib/auth"
import { jsonError } from "@/lib/api"
import { checkRateLimit, ipKey } from "@/lib/rateLimit"

export async function PATCH(req: Request, context: any) {
  const user = await getCurrentUser()
  if (!isDashboardAdminUser(user)) {
    return jsonError("Admin access required", 403)
  }

  const dashboardAccess = await hasDashboardAccess()
  if (!dashboardAccess) {
    return jsonError("Dashboard unlock required", 401)
  }

  const { id } = (context && context.params) ? context.params : { id: undefined }
  // Rate limit admin operations to avoid abuse: 60 updates per minute per admin
  try {
    const ipHeader = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || req.headers.get("cf-connecting-ip")
    const key = ipKey(ipHeader, `admin:${user?.id}:messages`)
    const rate = checkRateLimit(key, Number(process.env.ADMIN_RATE_LIMIT || 60), 60 * 1000)
    if (!rate.allowed) {
      return jsonError("Too many requests", 429)
    }
  } catch (e) {
    // ignore rate limiter failures
  }
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
