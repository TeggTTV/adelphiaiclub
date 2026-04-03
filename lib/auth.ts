import { UserRole } from "@prisma/client"
import { cookies } from "next/headers"
import prisma from "@/lib/prisma"
import { randomToken, sha256 } from "@/lib/security"

export const SESSION_COOKIE_NAME = "club_session"

const SESSION_TTL_HOURS = Number(process.env.SESSION_TTL_HOURS || 24 * 14)

type UserSessionRecord = {
  id: string
  email: string
  name: string
  role: UserRole
}

export type AuthUser = UserSessionRecord

function getConfiguredAdminEmails() {
  const raw = process.env.ADMIN_EMAILS || ""
  return raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

export function isConfiguredAdminEmail(email: string | null | undefined) {
  if (!email) return false
  return getConfiguredAdminEmails().includes(email.trim().toLowerCase())
}

export function isDashboardAdminUser(user: AuthUser | null | undefined) {
  if (!user) return false
  // Grant dashboard access based only on configured admin emails.
  // Previously this required the user role to be ADMIN as well —
  // remove that requirement so any account with a configured
  // admin email can access the dashboard.
  return isConfiguredAdminEmail(user.email)
}

function isSecureCookie() {
  return process.env.NODE_ENV === "production"
}

export function sessionCookieOptions(expiresAt: Date) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: isSecureCookie(),
    path: "/",
    expires: expiresAt,
  }
}

export function clearCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: isSecureCookie(),
    path: "/",
    expires: new Date(0),
  }
}

export async function createSession(userId: string, context?: { userAgent?: string | null; ipAddress?: string | null }) {
  const token = randomToken()
  const tokenHash = sha256(token)
  const expiresAt = new Date(Date.now() + SESSION_TTL_HOURS * 60 * 60 * 1000)

  await prisma.session.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
      userAgent: context?.userAgent || null,
      ipAddress: context?.ipAddress || null,
    },
  })

  return { token, expiresAt }
}

export async function revokeSessionByToken(token: string) {
  await prisma.session
    .deleteMany({
      where: {
        tokenHash: sha256(token),
      },
    })
    .catch(() => null)
}

export async function revokeAllUserSessions(userId: string) {
  await prisma.session.deleteMany({ where: { userId } })
}

export async function getUserFromSessionToken(token: string): Promise<AuthUser | null> {
  const session = await prisma.session.findFirst({
    where: {
      tokenHash: sha256(token),
      expiresAt: {
        gt: new Date(),
      },
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          deletedAt: true,
        },
      },
    },
  })

  if (!session || session.user.deletedAt) {
    return null
  }

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    role: session.user.role,
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value
  if (!sessionToken) {
    return null
  }

  return getUserFromSessionToken(sessionToken)
}

export async function requireUser() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("UNAUTHORIZED")
  }

  return user
}

export async function isAdminUser() {
  const user = await getCurrentUser()
  return isDashboardAdminUser(user)
}

export async function hasDashboardAccess() {
  const user = await getCurrentUser()
  return isDashboardAdminUser(user)
}

export function sanitizeUser<T extends { passwordHash?: string; deletedAt?: Date | null }>(user: T) {
  const { passwordHash: _ignored, ...safe } = user
  return safe
}
