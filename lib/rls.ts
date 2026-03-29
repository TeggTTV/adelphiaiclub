import { UserRole } from "@prisma/client"
import type { AuthUser } from "@/lib/auth"

export function isAdmin(user: AuthUser | null) {
  return user?.role === UserRole.ADMIN
}

export function canAccessOwnerResource(user: AuthUser | null, ownerId: string) {
  if (!user) return false
  if (isAdmin(user)) return true
  return user.id === ownerId
}

export function ownerScopedWhere<T extends string>(user: AuthUser, ownerField: T) {
  if (isAdmin(user)) {
    return {}
  }

  return {
    [ownerField]: user.id,
  } as Record<T, string>
}
