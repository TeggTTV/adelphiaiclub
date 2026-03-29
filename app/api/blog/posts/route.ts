import { NextRequest, NextResponse } from "next/server"
import { SubmissionStatus } from "@prisma/client"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"
import { decryptFromStorage, encryptForStorage } from "@/lib/crypto"
import { jsonError, parseTags } from "@/lib/api"
import { randomToken, slugify } from "@/lib/security"

async function buildUniqueSlug(title: string) {
  const base = slugify(title)
  const fallback = `post-${randomToken(4).toLowerCase()}`
  let candidate = base || fallback

  const existing = await prisma.blogPost.findUnique({
    where: { slug: candidate },
    select: { id: true },
  })

  if (!existing) {
    return candidate
  }

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

  if (scope === "all" && user?.role !== "ADMIN") {
    return jsonError("Admin access required", 403)
  }

  const where =
    scope === "mine"
      ? { authorId: user!.id }
      : scope === "all"
        ? {}
        : {
            status: SubmissionStatus.APPROVED,
            published: true,
          }

  const posts = await prisma.blogPost.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

  return NextResponse.json({
    posts: posts.map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      tags: post.tags,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      status: post.status,
      published: post.published,
      rejectedReason: post.rejectedReason,
      authorId: post.authorId,
      authorName: post.author.name,
      content:
        scope === "all" || scope === "mine"
          ? post.content || decryptFromStorage(post.encryptedContent)
          : undefined,
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
    const content = typeof body.content === "string" ? body.content.trim() : ""
    const excerpt = typeof body.excerpt === "string" ? body.excerpt.trim() : ""
    const tags = parseTags(body.tags)

    if (!title || !content) {
      return jsonError("Title and content are required", 400)
    }

    const slug = await buildUniqueSlug(title)
    const finalExcerpt = excerpt || `${content.slice(0, 180)}${content.length > 180 ? "..." : ""}`

    const created = await prisma.blogPost.create({
      data: {
        title,
        slug,
        content,
        encryptedContent: encryptForStorage(content),
        excerpt: finalExcerpt,
        tags,
        authorId: user.id,
        status: SubmissionStatus.PENDING,
        published: false,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      post: {
        ...created,
        authorName: created.author.name,
      },
    })
  } catch (error) {
    console.error("Create blog post failed", error)
    return jsonError("Unable to create post", 500)
  }
}
