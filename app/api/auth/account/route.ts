import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import {
  DASHBOARD_COOKIE_NAME,
  SESSION_COOKIE_NAME,
  clearCookieOptions,
  getCurrentUser,
  revokeAllUserSessions,
} from "@/lib/auth"
import { decryptFromStorage, encryptForStorage } from "@/lib/crypto"
import { jsonError } from "@/lib/api"
import { hashPassword, verifyPassword } from "@/lib/security"

export async function GET() {
  const user = await getCurrentUser()
  if (!user) {
    return jsonError("Unauthorized", 401)
  }

  const profile = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      bio: true,
      encryptedPrivateNote: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  if (!profile) {
    return jsonError("User not found", 404)
  }

  return NextResponse.json({
    user: {
      ...profile,
      privateNote: decryptFromStorage(profile.encryptedPrivateNote),
      encryptedPrivateNote: undefined,
    },
  })
}

export async function PATCH(request: NextRequest) {
  const user = await getCurrentUser()
  if (!user) {
    return jsonError("Unauthorized", 401)
  }

  try {
    const body = await request.json()

    const nextName = typeof body.name === "string" ? body.name.trim() : undefined
    const nextEmail = typeof body.email === "string" ? body.email.trim().toLowerCase() : undefined
    const nextBio = typeof body.bio === "string" ? body.bio.trim() : undefined
    const nextPrivateNote = typeof body.privateNote === "string" ? body.privateNote : undefined
    const currentPassword = typeof body.currentPassword === "string" ? body.currentPassword : undefined
    const nextPassword = typeof body.newPassword === "string" ? body.newPassword : undefined

    const current = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        passwordHash: true,
      },
    })

    if (!current) {
      return jsonError("User not found", 404)
    }

    if (nextEmail && nextEmail !== current.email) {
      const existing = await prisma.user.findUnique({
        where: {
          email: nextEmail,
        },
        select: {
          id: true,
          deletedAt: true,
        },
      })

      if (existing && existing.id !== user.id && !existing.deletedAt) {
        return jsonError("Email is already in use", 409)
      }
    }

    let nextPasswordHash: string | undefined
    if (nextPassword) {
      if (nextPassword.length < 8) {
        return jsonError("New password must be at least 8 characters", 400)
      }

      if (!currentPassword) {
        return jsonError("Current password is required to change password", 400)
      }

      const validCurrentPassword = await verifyPassword(currentPassword, current.passwordHash)
      if (!validCurrentPassword) {
        return jsonError("Current password is incorrect", 401)
      }

      nextPasswordHash = await hashPassword(nextPassword)
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(nextName ? { name: nextName } : {}),
        ...(nextEmail ? { email: nextEmail } : {}),
        ...(typeof nextBio === "string" ? { bio: nextBio || null } : {}),
        ...(typeof nextPrivateNote === "string"
          ? { encryptedPrivateNote: encryptForStorage(nextPrivateNote) }
          : {}),
        ...(nextPasswordHash ? { passwordHash: nextPasswordHash } : {}),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        bio: true,
        encryptedPrivateNote: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json({
      success: true,
      user: {
        ...updated,
        privateNote: decryptFromStorage(updated.encryptedPrivateNote),
        encryptedPrivateNote: undefined,
      },
    })
  } catch (error) {
    console.error("Account update failed", error)
    return jsonError("Unable to update account", 500)
  }
}

export async function DELETE(request: NextRequest) {
  const user = await getCurrentUser()
  if (!user) {
    return jsonError("Unauthorized", 401)
  }

  try {
    const body = await request.json()
    const password = typeof body.password === "string" ? body.password : ""

    if (!password) {
      return jsonError("Password is required to delete account", 400)
    }

    const current = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        passwordHash: true,
      },
    })

    if (!current) {
      return jsonError("User not found", 404)
    }

    const matches = await verifyPassword(password, current.passwordHash)
    if (!matches) {
      return jsonError("Incorrect password", 401)
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: "Deleted User",
        email: `deleted-${user.id}-${Date.now()}@deleted.local`,
        deletedAt: new Date(),
      },
    })

    await revokeAllUserSessions(user.id)

    const response = NextResponse.json({ success: true })
    response.cookies.set(SESSION_COOKIE_NAME, "", clearCookieOptions())
    response.cookies.set(DASHBOARD_COOKIE_NAME, "", clearCookieOptions())

    return response
  } catch (error) {
    console.error("Account deletion failed", error)
    return jsonError("Unable to delete account", 500)
  }
}
