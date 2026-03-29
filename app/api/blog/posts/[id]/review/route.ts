import { NextRequest, NextResponse } from "next/server"
import { SubmissionStatus } from "@prisma/client"
import prisma from "@/lib/prisma"
import { getCurrentUser, hasDashboardAccess, isDashboardAdminUser } from "@/lib/auth"
import { jsonError } from "@/lib/api"

type RouteParams = { params: Promise<{ id: string }> }

export async function POST(request: NextRequest, context: RouteParams) {
  const user = await getCurrentUser()
  if (!user || !isDashboardAdminUser(user)) {
    return jsonError("Admin access required", 403)
  }

  const dashboardAccess = await hasDashboardAccess()
  if (!dashboardAccess) {
    return jsonError("Dashboard unlock required", 401)
  }

  const { id } = await context.params

  try {
    const body = await request.json()
    const action = body.action === "approve" ? "approve" : "reject"
    const reason = typeof body.reason === "string" ? body.reason.trim() : null

    const updated = await prisma.blogPost.update({
      where: { id },
      data:
        action === "approve"
          ? {
              status: SubmissionStatus.APPROVED,
              published: true,
              approverId: user.id,
              approvedAt: new Date(),
              rejectedReason: null,
            }
          : {
              status: SubmissionStatus.REJECTED,
              published: false,
              approverId: user.id,
              rejectedReason: reason,
            },
    })

    return NextResponse.json({ success: true, post: updated })
  } catch (error) {
    console.error("Review post failed", error)
    return jsonError("Unable to review post", 500)
  }
}
