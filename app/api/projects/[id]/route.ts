import { NextRequest, NextResponse } from "next/server"
import { SubmissionStatus } from "@prisma/client"
import prisma from "@/lib/prisma"
import { getCurrentUser, isDashboardAdminUser } from "@/lib/auth"
import { canAccessOwnerResource } from "@/lib/rls"
import { parseTags, jsonError } from "@/lib/api"
import { encryptForStorage } from "@/lib/crypto"

type RouteParams = { params: Promise<{ id: string }> }

export async function PATCH(request: NextRequest, context: RouteParams) {
  const user = await getCurrentUser()
  if (!user) {
    return jsonError("Unauthorized", 401)
  }

  const { id } = await context.params

  const existing = await prisma.project.findUnique({
    where: { id },
    select: {
      id: true,
      submittedById: true,
    },
  })

  if (!existing) {
    return jsonError("Project not found", 404)
  }

  if (!canAccessOwnerResource(user, existing.submittedById)) {
    return jsonError("Forbidden", 403)
  }

  try {
    const body = await request.json()
    const isAdmin = isDashboardAdminUser(user)

    const title = typeof body.title === "string" ? body.title.trim() : undefined
    const description = typeof body.description === "string" ? body.description.trim() : undefined
    const contactEmail = typeof body.email === "string" ? (body.email.trim() || undefined) : undefined

    const updated = await prisma.project.update({
      where: { id },
      data: {
        ...(title ? { title } : {}),
        ...(description
          ? {
              description,
              encryptedDescription: encryptForStorage(description),
            }
          : {}),
        ...(contactEmail !== undefined ? { contactEmail } : {}),
        ...(body.techStack !== undefined ? { techStack: parseTags(body.techStack) } : {}),
        ...(body.tags !== undefined ? { tags: parseTags(body.tags) } : {}),
        ...(body.creators !== undefined ? { creators: parseTags(body.creators) } : {}),
        ...(typeof body.projectState === "string" ? { projectState: body.projectState } : {}),
        ...(typeof body.difficulty === "string" ? { difficulty: body.difficulty } : {}),
        ...(typeof body.githubUrl === "string" ? { githubUrl: body.githubUrl } : {}),
        ...(typeof body.liveUrl === "string" ? { liveUrl: body.liveUrl } : {}),
        ...(typeof body.imageUrl === "string" ? { imageUrl: body.imageUrl } : {}),
        ...(typeof body.semester === "string" ? { semester: body.semester } : {}),
        ...(typeof body.impact === "string" ? { impact: body.impact } : {}),
        ...(isAdmin && typeof body.featured === "boolean"
          ? {
              featured: body.featured,
            }
          : {}),
        ...(!isAdmin
          ? {
              status: SubmissionStatus.PENDING,
              featured: false,
              approverId: null,
              approvedAt: null,
              rejectedReason: null,
            }
          : {}),
      },
    })

    return NextResponse.json({ success: true, project: updated })
  } catch (error) {
    console.error("Update project failed", error)
    return jsonError("Unable to update project", 500)
  }
}

export async function DELETE(_: NextRequest, context: RouteParams) {
  const user = await getCurrentUser()
  if (!user) {
    return jsonError("Unauthorized", 401)
  }

  const { id } = await context.params

  const existing = await prisma.project.findUnique({
    where: { id },
    select: {
      id: true,
      submittedById: true,
    },
  })

  if (!existing) {
    return jsonError("Project not found", 404)
  }

  if (!canAccessOwnerResource(user, existing.submittedById)) {
    return jsonError("Forbidden", 403)
  }

  await prisma.project.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
