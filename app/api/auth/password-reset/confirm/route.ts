import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { jsonError } from "@/lib/api"
import { hashPassword, sha256 } from "@/lib/security"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const token = typeof body.token === "string" ? body.token : ""
    const newPassword = typeof body.newPassword === "string" ? body.newPassword : ""

    if (!token || !newPassword) {
      return jsonError("Token and new password are required", 400)
    }

    if (newPassword.length < 8) {
      return jsonError("Password must be at least 8 characters", 400)
    }

    const tokenHash = sha256(token)
    const resetToken = await prisma.passwordResetToken.findFirst({
      where: {
        tokenHash,
        usedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
      select: {
        id: true,
        userId: true,
      },
    })

    if (!resetToken) {
      return jsonError("Invalid or expired token", 400)
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: resetToken.userId },
        data: {
          passwordHash: await hashPassword(newPassword),
        },
      }),
      prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { usedAt: new Date() },
      }),
      prisma.session.deleteMany({
        where: { userId: resetToken.userId },
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Password reset confirmation failed", error)
    return jsonError("Unable to reset password", 500)
  }
}
