import { NextRequest, NextResponse } from "next/server"
import { UserRole } from "@prisma/client"
import prisma from "@/lib/prisma"
import { createSession, sessionCookieOptions, SESSION_COOKIE_NAME } from "@/lib/auth"
import { encryptForStorage } from "@/lib/crypto"
import { jsonError } from "@/lib/api"
import { hashPassword } from "@/lib/security"

function getAdminEmails() {
  const raw = process.env.ADMIN_EMAILS || ""
  return raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const name = typeof body.name === "string" ? body.name.trim() : ""
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : ""
    const password = typeof body.password === "string" ? body.password : ""

    if (!name || !email || !password) {
      return jsonError("Name, email, and password are required", 400)
    }

    if (password.length < 8) {
      return jsonError("Password must be at least 8 characters", 400)
    }

    const existing = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        deletedAt: true,
      },
    })

    if (existing && !existing.deletedAt) {
      return jsonError("An account with this email already exists", 409)
    }

    const role = getAdminEmails().includes(email) ? UserRole.ADMIN : UserRole.MEMBER

    const user = await prisma.user.create({
      data: {
        name,
        email,
        role,
        passwordHash: await hashPassword(password),
        encryptedPrivateNote: encryptForStorage(`Welcome ${name}`),
        deletedAt: null,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    })

    const session = await createSession(user.id, {
      ipAddress: request.headers.get("x-forwarded-for"),
      userAgent: request.headers.get("user-agent"),
    })

    const response = NextResponse.json({
      success: true,
      user,
    })

    response.cookies.set(SESSION_COOKIE_NAME, session.token, sessionCookieOptions(session.expiresAt))
    return response
  } catch (error) {
    console.error("Register failed", error)
    return jsonError("Unable to create account", 500)
  }
}
