"use client"

import * as React from "react"

export const AUTH_CHANGED_EVENT = "club-auth-changed"

export function notifyAuthChanged() {
  if (typeof window === "undefined") return
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT))
}

type AuthUser = {
  id: string
  email: string
  name: string
  role: "MEMBER" | "ADMIN"
}

type AuthState = {
  loading: boolean
  user: AuthUser | null
  isDashboardAdmin: boolean
  dashboardAccess: boolean
  refresh: () => Promise<void>
}

export function useAuthUser(): AuthState {
  const [loading, setLoading] = React.useState(true)
  const [user, setUser] = React.useState<AuthUser | null>(null)
  const [isDashboardAdmin, setIsDashboardAdmin] = React.useState(false)
  const [dashboardAccess, setDashboardAccess] = React.useState(false)

  const refresh = React.useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/auth/me", {
        credentials: "include",
        cache: "no-store",
      })

      if (!response.ok) {
        setUser(null)
        setIsDashboardAdmin(false)
        setDashboardAccess(false)
        return
      }

      const data = await response.json()
      setUser(data.user || null)
      setIsDashboardAdmin(Boolean(data.isDashboardAdmin))
      setDashboardAccess(Boolean(data.dashboardAccess))
    } catch {
      setUser(null)
      setIsDashboardAdmin(false)
      setDashboardAccess(false)
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    void refresh()
  }, [refresh])

  React.useEffect(() => {
    const onAuthChanged = () => {
      void refresh()
    }

    const onFocus = () => {
      void refresh()
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void refresh()
      }
    }

    window.addEventListener(AUTH_CHANGED_EVENT, onAuthChanged)
    window.addEventListener("focus", onFocus)
    document.addEventListener("visibilitychange", onVisibilityChange)

    return () => {
      window.removeEventListener(AUTH_CHANGED_EVENT, onAuthChanged)
      window.removeEventListener("focus", onFocus)
      document.removeEventListener("visibilitychange", onVisibilityChange)
    }
  }, [refresh])

  return {
    loading,
    user,
    isDashboardAdmin,
    dashboardAccess,
    refresh,
  }
}
