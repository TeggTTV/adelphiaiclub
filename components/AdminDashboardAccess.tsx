"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import { Shield, KeyRound, X } from "lucide-react"
import { useAuthUser } from "@/hooks/use-auth-user"

export function AdminDashboardAccess() {
  const router = useRouter()
  const { user, refresh } = useAuthUser()

  const [open, setOpen] = React.useState(false)
  const [passkey, setPasskey] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState("")

  React.useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "d") {
        event.preventDefault()
        setOpen(true)
      }
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")

    if (!user) {
      setError("Please sign in first.")
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch("/api/auth/admin/unlock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ passkey }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        setError(data.error || "Unable to unlock dashboard")
        return
      }

      await refresh()
      setOpen(false)
      setPasskey("")
      router.push("/dashboard")
    } catch {
      setError("Unable to unlock dashboard")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.94, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 10, opacity: 0 }}
            className="glass w-full max-w-md rounded-2xl border border-[color:var(--border)] p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-full border border-[color:var(--border)] bg-[color:var(--muted)] p-2.5">
                  <Shield className="h-5 w-5 text-[color:var(--primary)]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Unlock Creator Dashboard</h2>
                  <p className="text-sm text-[color:var(--muted-foreground)]">Shortcut: Ctrl + Shift + D</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 text-[color:var(--muted-foreground)] hover:bg-[color:var(--muted)]"
                aria-label="Close admin access modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="admin-passkey" className="text-sm font-semibold text-[color:var(--muted-foreground)]">
                  Dashboard passkey
                </label>
                <div className="relative">
                  <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
                  <input
                    id="admin-passkey"
                    type="password"
                    value={passkey}
                    onChange={(event) => setPasskey(event.target.value)}
                    required
                    className="h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] pl-10 pr-3 text-sm outline-none transition focus:border-[color:var(--primary)]"
                    placeholder="Enter admin dashboard key"
                  />
                </div>
              </div>

              {error && <p className="text-sm font-medium text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[color:var(--primary)] px-4 text-sm font-bold text-[color:var(--primary-foreground)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Unlocking..." : "Unlock Dashboard"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
