import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getCurrentUser, hasDashboardAccess } from "@/lib/auth"
import { jsonError, parseTags } from "@/lib/api"

type RouteParams = { params: Promise<{ id: string }> }

async function requireAdminDashboard() {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return null
  }

  const dashboardAccess = await hasDashboardAccess()
  if (!dashboardAccess) {
    return null
  }

  return user
}

export async function PATCH(request: NextRequest, context: RouteParams) {
  const user = await requireAdminDashboard()
  if (!user) {
    return jsonError("Admin dashboard access required", 403)
  }

  const { id } = await context.params

  try {
    const body = await request.json()

    const updated = await prisma.fileItem.update({
      where: { id },
      data: {
        ...(typeof body.name === "string" ? { name: body.name.trim() } : {}),
        ...(typeof body.category === "string" ? { category: body.category.trim() } : {}),
        ...(typeof body.url === "string" ? { url: body.url.trim() } : {}),
        ...(typeof body.type === "string" ? { type: body.type.trim().toLowerCase() } : {}),
        ...(typeof body.size === "number" && Number.isFinite(body.size)
          ? { size: Math.max(0, Math.trunc(body.size)) }
          : {}),
        ...(typeof body.visibility === "string" ? { visibility: body.visibility } : {}),
        ...(typeof body.meeting === "string" ? { meeting: body.meeting } : {}),
        ...(typeof body.description === "string" ? { description: body.description } : {}),
        ...(typeof body.pinned === "boolean" ? { pinned: body.pinned } : {}),
        ...(body.tags !== undefined ? { tags: parseTags(body.tags) } : {}),
      },
    })

    return NextResponse.json({ success: true, file: updated })
  } catch (error) {
    console.error("Update file failed", error)
    return jsonError("Unable to update file", 500)
  }
}

export async function DELETE(_: NextRequest, context: RouteParams) {
  const user = await requireAdminDashboard()
  if (!user) {
    return jsonError("Admin dashboard access required", 403)
  }

  const { id } = await context.params
  await prisma.fileItem.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
