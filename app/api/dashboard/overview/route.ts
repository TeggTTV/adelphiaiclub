import { NextResponse } from "next/server"
import { SubmissionStatus } from "@prisma/client"
import prisma from "@/lib/prisma"
import { getCurrentUser, hasDashboardAccess, isDashboardAdminUser } from "@/lib/auth"
import { jsonError } from "@/lib/api"

export async function GET() {
  const user = await getCurrentUser()
  if (!isDashboardAdminUser(user)) {
    return jsonError("Admin access required", 403)
  }

  const dashboardAccess = await hasDashboardAccess()
  if (!dashboardAccess) {
    return jsonError("Dashboard unlock required", 401)
  }

  const [pendingPosts, pendingProjects, recentFiles, userCount] = await Promise.all([
    prisma.blogPost.findMany({
      where: { status: SubmissionStatus.PENDING },
      orderBy: { createdAt: "desc" },
      take: 20,
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    }),
    prisma.project.findMany({
      where: { status: SubmissionStatus.PENDING },
      orderBy: { createdAt: "desc" },
      take: 20,
      include: {
        submittedBy: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    }),
    prisma.fileItem.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      include: {
        uploadedBy: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    }),
    prisma.user.count({
      where: {
        OR: [{ deletedAt: null }, { deletedAt: { isSet: false } }],
      },
    }),
  ])

  return NextResponse.json({
    userCount,
    pendingPosts: pendingPosts.map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      createdAt: post.createdAt,
      authorName: post.author.name,
      authorEmail: post.author.email,
    })),
    pendingProjects: pendingProjects.map((project) => ({
      id: project.id,
      title: project.title,
      slug: project.slug,
      createdAt: project.createdAt,
      submittedByName: project.submittedBy.name,
      submittedByEmail: project.submittedBy.email,
    })),
    recentFiles: recentFiles.map((file) => ({
      id: file.id,
      name: file.name,
      category: file.category,
      visibility: file.visibility,
      createdAt: file.createdAt,
      uploadedByName: file.uploadedBy.name,
      uploadedByEmail: file.uploadedBy.email,
    })),
  })
}
