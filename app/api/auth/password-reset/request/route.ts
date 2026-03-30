import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import prisma from "@/lib/prisma"
import { SITE_URL } from "@/lib/seo"
import { jsonError } from "@/lib/api"
import { randomToken, sha256 } from "@/lib/security"

const PASSWORD_RESET_TTL_MINUTES = Number(process.env.PASSWORD_RESET_TTL_MINUTES || 30)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : ""

    if (!email) {
      return jsonError("Email is required", 400)
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        deletedAt: true,
      },
    })

    if (!user || user.deletedAt) {
      return NextResponse.json({ success: true })
    }

    const rawToken = randomToken(36)
    const tokenHash = sha256(rawToken)
    const expiresAt = new Date(Date.now() + PASSWORD_RESET_TTL_MINUTES * 60 * 1000)

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
      },
    })

    const resetUrl = `${SITE_URL}/auth/reset-password?token=${encodeURIComponent(rawToken)}`
    const resendApiKey = process.env.RESEND_API_KEY

    if (resendApiKey) {
      const resend = new Resend(resendApiKey)
      await resend.emails.send({
        from: "AI Society <onboarding@resend.dev>",
        to: [user.email],
        subject: "Reset your AI Society password",
        text: `Hi ${user.name},\n\nUse this link to reset your password:\n${resetUrl}\n\nThis link expires in ${PASSWORD_RESET_TTL_MINUTES} minutes.`,
      })
    } else {
      console.info("Password reset URL", resetUrl)
    }

    return NextResponse.json({
      success: true,
      ...(process.env.NODE_ENV !== "production" ? { resetUrl } : {}),
    })
  } catch (error) {
    console.error("Password reset request failed", error)
    return jsonError("Unable to process reset request", 500)
  }
}
