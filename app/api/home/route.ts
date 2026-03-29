import { NextResponse } from "next/server"
import { SubmissionStatus } from "@prisma/client"
import prisma from "@/lib/prisma"
import { decryptFromStorage } from "@/lib/crypto"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const now = new Date()

    const [events, members, projects] = await Promise.all([
      prisma.event.findMany({
        where: {
          date: {
            gte: now,
          },
        },
        orderBy: {
          date: "asc",
        },
        take: 3,
      }),
      prisma.eboardMember.findMany({
        orderBy: {
          order: "asc",
        },
        take: 6,
        select: {
          id: true,
          name: true,
          role: true,
          bio: true,
        },
      }),
      prisma.project.findMany({
        where: {
          status: SubmissionStatus.APPROVED,
        },
        orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
        take: 2,
        select: {
          id: true,
          title: true,
          description: true,
          encryptedDescription: true,
          techStack: true,
          githubUrl: true,
        },
      }),
    ])

    return NextResponse.json({
      events: events.map((event) => ({
        id: event.id,
        title: event.title,
        description: event.description,
        date: event.date.toISOString(),
        location: event.location,
        link: event.link,
      })),
      members,
      projects: projects.map((project) => ({
        id: project.id,
        title: project.title,
        description: project.description || decryptFromStorage(project.encryptedDescription),
        techStack: project.techStack,
        githubUrl: project.githubUrl,
      })),
    })
  } catch (error) {
    console.error("Failed to load landing page data", error)
    return NextResponse.json({ error: "Unable to load landing page data" }, { status: 500 })
  }
}
