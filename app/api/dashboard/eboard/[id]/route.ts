import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getCurrentUser, hasDashboardAccess, isDashboardAdminUser } from "@/lib/auth"
import { jsonError, requireString } from "@/lib/api"
import { checkRateLimit, ipKey } from "@/lib/rateLimit"

export async function PATCH(req: Request, context: any) {
  const user = await getCurrentUser()
  if (!isDashboardAdminUser(user)) return jsonError("Admin access required", 403)
  const dashboardAccess = await hasDashboardAccess()
  if (!dashboardAccess) return jsonError("Dashboard unlock required", 401)

  const { id } = (context && context.params) ? context.params : { id: undefined }
  if (!id) return jsonError("Missing id", 400)

  try {
    const ipHeader = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip")
    const key = ipKey(ipHeader, `admin:${user?.id}:eboard:update`)
    const rate = checkRateLimit(key, Number(process.env.ADMIN_RATE_LIMIT || 60), 60 * 1000)
    if (!rate.allowed) return jsonError("Too many requests", 429)
  } catch (e) {}

  try {
    const body = await req.json()
    const data: any = {}
    if (body.name !== undefined) data.name = requireString(body.name, "name")
    if (body.role !== undefined) data.role = String(body.role)
    if (body.bio !== undefined) data.bio = body.bio ? String(body.bio) : null
    if (body.imageUrl !== undefined) data.imageUrl = body.imageUrl ? String(body.imageUrl) : null
    if (body.instagram !== undefined) data.instagram = body.instagram ? String(body.instagram) : null
    if (body.linkedin !== undefined) data.linkedin = body.linkedin ? String(body.linkedin) : null
    if (body.github !== undefined) data.github = body.github ? String(body.github) : null
    if (body.order !== undefined) data.order = Number.isFinite(Number(body.order)) ? Number(body.order) : 0

    const updated = await prisma.eboardMember.update({ where: { id }, data })
    return NextResponse.json({ member: updated })
  } catch (err) {
    console.error("Unable to update member:", err)
    return jsonError("Unable to update member", 500)
  }
}

export async function DELETE(req: Request, context: any) {
  const user = await getCurrentUser()
  if (!isDashboardAdminUser(user)) return jsonError("Admin access required", 403)
  const dashboardAccess = await hasDashboardAccess()
  if (!dashboardAccess) return jsonError("Dashboard unlock required", 401)

  const { id } = (context && context.params) ? context.params : { id: undefined }
  if (!id) return jsonError("Missing id", 400)

  try {
    const ipHeader = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip")
    const key = ipKey(ipHeader, `admin:${user?.id}:eboard:delete`)
    const rate = checkRateLimit(key, Number(process.env.ADMIN_RATE_LIMIT || 60), 60 * 1000)
    if (!rate.allowed) return jsonError("Too many requests", 429)
  } catch (e) {}

  try {
    await prisma.eboardMember.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Unable to delete member:", err)
    return jsonError("Unable to delete member", 500)
  }
}
