import { NextRequest, NextResponse } from "next/server"
import { UserRole } from "@prisma/client"
import prisma from "@/lib/prisma"
import { createSession, isConfiguredAdminEmail, sessionCookieOptions, SESSION_COOKIE_NAME } from "@/lib/auth"
import { jsonError } from "@/lib/api"
import { verifyPassword } from "@/lib/security"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : ""
    const password = typeof body.password === "string" ? body.password : ""

    if (!email || !password) {
      return jsonError("Email and password are required", 400)
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        passwordHash: true,
        deletedAt: true,
      },
    })

    if (!user || user.deletedAt) {
      return jsonError("Invalid email or password", 401)
    }

    const passwordMatches = await verifyPassword(password, user.passwordHash)
    if (!passwordMatches) {
      return jsonError("Invalid email or password", 401)
    }

    const shouldBeAdmin = isConfiguredAdminEmail(user.email)
    let effectiveRole = shouldBeAdmin ? UserRole.ADMIN : UserRole.MEMBER

    if (shouldBeAdmin && user.role !== UserRole.ADMIN) {
      await prisma.user.update({
        where: { id: user.id },
        data: { role: UserRole.ADMIN },
      })
      effectiveRole = UserRole.ADMIN
    }

    if (!shouldBeAdmin && user.role === UserRole.ADMIN) {
      await prisma.user.update({
        where: { id: user.id },
        data: { role: UserRole.MEMBER },
      })
      effectiveRole = UserRole.MEMBER
    }

    const session = await createSession(user.id, {
      ipAddress: request.headers.get("x-forwarded-for"),
      userAgent: request.headers.get("user-agent"),
    })

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: effectiveRole,
      },
    })

    response.cookies.set(SESSION_COOKIE_NAME, session.token, sessionCookieOptions(session.expiresAt))
    return response
  } catch (error) {
    console.error("Login failed", error)
    return jsonError("Unable to sign in", 500)
  }
}
