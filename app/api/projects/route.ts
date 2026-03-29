import { NextRequest, NextResponse } from "next/server"
import { SubmissionStatus } from "@prisma/client"
import prisma from "@/lib/prisma"
import { getCurrentUser, isDashboardAdminUser } from "@/lib/auth"
import { decryptFromStorage, encryptForStorage } from "@/lib/crypto"
import { jsonError, parseTags } from "@/lib/api"
import { randomToken, slugify } from "@/lib/security"

async function buildUniqueSlug(title: string) {
  const base = slugify(title)
  const fallback = `project-${randomToken(4).toLowerCase()}`
  let candidate = base || fallback

  const existing = await prisma.project.findUnique({
    where: { slug: candidate },
    select: { id: true },
  })

  if (!existing) return candidate

  candidate = `${candidate}-${randomToken(2).toLowerCase()}`
  return candidate
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const scope = searchParams.get("scope")
  const user = await getCurrentUser()

  if (scope === "mine" && !user) {
    return jsonError("Unauthorized", 401)
  }

  if (scope === "all" && !isDashboardAdminUser(user)) {
    return jsonError("Admin access required", 403)
  }

  const where =
    scope === "mine"
      ? { submittedById: user!.id }
      : scope === "all"
        ? {}
        : {
            status: SubmissionStatus.APPROVED,
          }

  const projects = await prisma.project.findMany({
    where,
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      submittedBy: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

  return NextResponse.json({
    projects: projects.map((project) => ({
      id: project.id,
      slug: project.slug,
      title: project.title,
      description:
        scope === "all" || scope === "mine"
          ? project.description || decryptFromStorage(project.encryptedDescription)
          : project.description,
      techStack: project.techStack,
      tags: project.tags,
      creators: project.creators,
      status: project.status,
      projectState: project.projectState,
      difficulty: project.difficulty,
      featured: project.featured,
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      imageUrl: project.imageUrl,
      semester: project.semester,
      impact: project.impact,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      rejectedReason: project.rejectedReason,
      submittedById: project.submittedById,
      submittedByName: project.submittedBy.name,
    })),
  })
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser()
  if (!user) {
    return jsonError("Unauthorized", 401)
  }

  try {
    const body = await request.json()

    const title = typeof body.title === "string" ? body.title.trim() : ""
    const description = typeof body.description === "string" ? body.description.trim() : ""

    if (!title || !description) {
      return jsonError("Title and description are required", 400)
    }

    const slug = await buildUniqueSlug(title)

    const created = await prisma.project.create({
      data: {
        title,
        slug,
        description,
        encryptedDescription: encryptForStorage(description),
        techStack: parseTags(body.techStack),
        tags: parseTags(body.tags),
        creators: parseTags(body.creators).length ? parseTags(body.creators) : [user.name],
        projectState: typeof body.projectState === "string" ? body.projectState : "Planning",
        difficulty: typeof body.difficulty === "string" ? body.difficulty : "Beginner",
        githubUrl: typeof body.githubUrl === "string" ? body.githubUrl : null,
        liveUrl: typeof body.liveUrl === "string" ? body.liveUrl : null,
        imageUrl: typeof body.imageUrl === "string" ? body.imageUrl : null,
        semester: typeof body.semester === "string" ? body.semester : null,
        impact: typeof body.impact === "string" ? body.impact : null,
        submittedById: user.id,
        status: SubmissionStatus.PENDING,
        featured: false,
      },
      include: {
        submittedBy: {
          select: {
            name: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      project: {
        ...created,
        submittedByName: created.submittedBy.name,
      },
    })
  } catch (error) {
    console.error("Create project failed", error)
    return jsonError("Unable to submit project", 500)
  }
}
