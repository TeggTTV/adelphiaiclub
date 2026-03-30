import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getCurrentUser, hasDashboardAccess, isDashboardAdminUser } from "@/lib/auth"
import { jsonError, requireString } from "@/lib/api"
import { checkRateLimit, ipKey } from "@/lib/rateLimit"

export async function GET() {
  const user = await getCurrentUser()
  if (!isDashboardAdminUser(user)) return jsonError("Admin access required", 403)
  const dashboardAccess = await hasDashboardAccess()
  if (!dashboardAccess) return jsonError("Dashboard unlock required", 401)

  try {
    const members = await prisma.eboardMember.findMany({ orderBy: { order: "asc" } })
    return NextResponse.json({ members })
  } catch (err) {
    console.error("Unable to load eboard members:", err)
    return jsonError("Unable to load eboard members", 500)
  }
}

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!isDashboardAdminUser(user)) return jsonError("Admin access required", 403)
  const dashboardAccess = await hasDashboardAccess()
  if (!dashboardAccess) return jsonError("Dashboard unlock required", 401)

  // rate limit admin creates
  try {
    const ipHeader = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip")
    const key = ipKey(ipHeader, `admin:${user?.id}:eboard:create`)
    const rate = checkRateLimit(key, Number(process.env.ADMIN_RATE_LIMIT || 60), 60 * 1000)
    if (!rate.allowed) return jsonError("Too many requests", 429)
  } catch (e) {}

  try {
    const body = await req.json()
    const name = requireString(body.name, "name")
    const role = String(body.role || "")
    const bio = body.bio ? String(body.bio) : null
    const imageUrl = body.imageUrl ? String(body.imageUrl) : null
    const instagram = body.instagram ? String(body.instagram) : null
    const linkedin = body.linkedin ? String(body.linkedin) : null
    const github = body.github ? String(body.github) : null
    const order = Number.isFinite(Number(body.order)) ? Number(body.order) : 0

    const created = await prisma.eboardMember.create({
      data: { name, role, bio, imageUrl, instagram, linkedin, github, order },
    })

    return NextResponse.json({ member: created })
  } catch (err: any) {
    console.error("Unable to create eboard member:", err)
    return jsonError(err?.message || "Unable to create member", 500)
  }
}
