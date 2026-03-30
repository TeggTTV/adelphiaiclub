import { NextRequest, NextResponse } from "next/server"
import { SubmissionStatus } from "@prisma/client"
import prisma from "@/lib/prisma"
import { getCurrentUser, isDashboardAdminUser } from "@/lib/auth"
import { canAccessOwnerResource } from "@/lib/rls"
import { encryptForStorage } from "@/lib/crypto"
import { jsonError, parseTags } from "@/lib/api"

type RouteParams = { params: Promise<{ id: string }> }

export async function PATCH(request: NextRequest, context: RouteParams) {
  const user = await getCurrentUser()
  if (!user) {
    return jsonError("Unauthorized", 401)
  }

  const { id } = await context.params

  const existing = await prisma.blogPost.findUnique({
    where: { id },
    select: {
      id: true,
      authorId: true,
    },
  })

  if (!existing) {
    return jsonError("Post not found", 404)
  }

  if (!canAccessOwnerResource(user, existing.authorId)) {
    return jsonError("Forbidden", 403)
  }

  try {
    const body = await request.json()
    const isAdmin = isDashboardAdminUser(user)

    const title = typeof body.title === "string" ? body.title.trim() : undefined
    const content = typeof body.content === "string" ? body.content.trim() : undefined
    const excerpt = typeof body.excerpt === "string" ? body.excerpt.trim() : undefined
    const tags = body.tags !== undefined ? parseTags(body.tags) : undefined
    const contactEmail = typeof body.email === "string" ? (body.email.trim() || undefined) : undefined

    const updated = await prisma.blogPost.update({
      where: { id },
      data: {
        ...(title ? { title } : {}),
        ...(content ? { content, encryptedContent: encryptForStorage(content) } : {}),
        ...(excerpt !== undefined ? { excerpt } : {}),
        ...(tags ? { tags } : {}),
        ...(contactEmail !== undefined ? { contactEmail } : {}),
        ...(!isAdmin
          ? {
              status: SubmissionStatus.PENDING,
              published: false,
              approverId: null,
              approvedAt: null,
              rejectedReason: null,
            }
          : {}),
      },
    })

    return NextResponse.json({ success: true, post: updated })
  } catch (error) {
    console.error("Update post failed", error)
    return jsonError("Unable to update post", 500)
  }
}

export async function DELETE(_: NextRequest, context: RouteParams) {
  const user = await getCurrentUser()
  if (!user) {
    return jsonError("Unauthorized", 401)
  }

  const { id } = await context.params

  const existing = await prisma.blogPost.findUnique({
    where: { id },
    select: {
      id: true,
      authorId: true,
    },
  })

  if (!existing) {
    return jsonError("Post not found", 404)
  }

  if (!canAccessOwnerResource(user, existing.authorId)) {
    return jsonError("Forbidden", 403)
  }

  await prisma.blogPost.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
