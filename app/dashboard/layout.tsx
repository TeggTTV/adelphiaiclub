import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { getCurrentUser, isDashboardAdminUser } from "@/lib/auth"

type DashboardLayoutProps = {
  children: ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/sign-in?next=/dashboard")
  }

  if (!isDashboardAdminUser(user)) {
    redirect("/")
  }

  return <>{children}</>
}
