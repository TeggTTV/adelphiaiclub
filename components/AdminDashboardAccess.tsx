"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { useAuthUser } from "@/hooks/use-auth-user"

export function AdminDashboardAccess() {
  const router = useRouter()
  const pathname = usePathname()
  const { isDashboardAdmin } = useAuthUser()
  const isDashboardRoute = pathname.startsWith("/dashboard")

  React.useEffect(() => {
    if (isDashboardRoute) {
      return
    }

    const handler = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "d") {
        event.preventDefault()
        if (isDashboardAdmin) {
          router.push("/dashboard")
        }
      }
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [isDashboardRoute, isDashboardAdmin, router])

  return null
}
