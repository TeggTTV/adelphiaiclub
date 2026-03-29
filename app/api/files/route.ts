import { NextRequest, NextResponse } from "next/server"
import { mkdir, writeFile } from "fs/promises"
import path from "path"
import prisma from "@/lib/prisma"
import { getCurrentUser, hasDashboardAccess } from "@/lib/auth"
import { jsonError, parseTags } from "@/lib/api"
import { randomToken } from "@/lib/security"

export const runtime = "nodejs"

function sanitizeFilename(filename: string) {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

async function saveUploadedFile(file: File) {
  const uploadsDir = path.join(process.cwd(), "public", "uploads")
  await mkdir(uploadsDir, { recursive: true })

  const extension = path.extname(file.name || "").toLowerCase()
  const safeBaseName = sanitizeFilename(path.basename(file.name || "file", extension)) || "file"
  const safeExt = extension && /^[.a-z0-9]+$/.test(extension) ? extension : ""
  const uniqueName = `${Date.now()}-${randomToken(4).toLowerCase()}-${safeBaseName}${safeExt}`
  const absolutePath = path.join(uploadsDir, uniqueName)

  const arrayBuffer = await file.arrayBuffer()
  await writeFile(absolutePath, Buffer.from(arrayBuffer))

  return {
    url: `/uploads/${uniqueName}`,
    size: file.size,
    inferredType: (file.type || path.extname(file.name).replace(".", "") || "file").toLowerCase(),
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const scope = searchParams.get("scope")

  const user = await getCurrentUser()
  const isAdmin = user?.role === "ADMIN"

  if (scope === "all" && !isAdmin) {
    return jsonError("Admin access required", 403)
  }

  const files = await prisma.fileItem.findMany({
    where: scope === "all" ? {} : { visibility: "Public" },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      uploadedBy: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

  return NextResponse.json({
    files: files.map((file) => ({
      id: file.id,
      name: file.name,
      category: file.category,
      url: file.url,
      type: file.type,
      size: file.size,
      visibility: file.visibility,
      meeting: file.meeting,
      tags: file.tags,
      pinned: file.pinned,
      description: file.description,
      createdAt: file.createdAt,
      updatedAt: file.updatedAt,
      uploadedById: file.uploadedById,
      uploadedByName: file.uploadedBy.name,
    })),
  })
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return jsonError("Admin access required", 403)
  }

  const dashboardAccess = await hasDashboardAccess()
  if (!dashboardAccess) {
    return jsonError("Dashboard unlock required", 401)
  }

  try {
    const contentType = request.headers.get("content-type") || ""

    let name = ""
    let category = "General"
    let url = ""
    let type = "file"
    let size: number | null = null
    let visibility = "Public"
    let meeting: string | null = null
    let tags: string[] = []
    let pinned = false
    let description: string | null = null

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData()
      const uploadedFile = formData.get("file")

      if (!(uploadedFile instanceof File) || uploadedFile.size <= 0) {
        return jsonError("A file upload is required", 400)
      }

      const saved = await saveUploadedFile(uploadedFile)

      name = typeof formData.get("name") === "string" ? String(formData.get("name")).trim() : uploadedFile.name
      category = typeof formData.get("category") === "string" ? String(formData.get("category")).trim() || "General" : "General"
      url = saved.url
      type = typeof formData.get("type") === "string" ? String(formData.get("type")).trim().toLowerCase() || saved.inferredType : saved.inferredType
      size = saved.size
      visibility = formData.get("visibility") === "Members" ? "Members" : "Public"
      meeting = typeof formData.get("meeting") === "string" ? String(formData.get("meeting")) : null
      tags = parseTags(formData.get("tags"))
      pinned = String(formData.get("pinned") || "false") === "true"
      description = typeof formData.get("description") === "string" ? String(formData.get("description")) : null
    } else {
      const body = await request.json()

      name = typeof body.name === "string" ? body.name.trim() : ""
      category = typeof body.category === "string" ? body.category.trim() : "General"
      url = typeof body.url === "string" ? body.url.trim() : ""
      type = typeof body.type === "string" ? body.type.trim().toLowerCase() : "file"
      size = typeof body.size === "number" && Number.isFinite(body.size) ? Math.max(0, Math.trunc(body.size)) : null
      visibility = body.visibility === "Members" ? "Members" : "Public"
      meeting = typeof body.meeting === "string" ? body.meeting : null
      tags = parseTags(body.tags)
      pinned = Boolean(body.pinned)
      description = typeof body.description === "string" ? body.description : null
    }

    if (!name || !url) {
      return jsonError("File name and upload URL are required", 400)
    }

    const created = await prisma.fileItem.create({
      data: {
        name,
        category,
        url,
        type,
        size,
        visibility,
        meeting,
        tags,
        pinned,
        description,
        uploadedById: user.id,
      },
      include: {
        uploadedBy: {
          select: {
            name: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      file: {
        ...created,
        uploadedByName: created.uploadedBy.name,
      },
    })
  } catch (error) {
    console.error("Create file failed", error)
    return jsonError("Unable to create file record", 500)
  }
}
