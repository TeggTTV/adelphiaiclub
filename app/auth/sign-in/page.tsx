"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogIn } from "lucide-react"
import { notifyAuthChanged } from "@/hooks/use-auth-user"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        setError(data.error || "Unable to sign in")
        return
      }

      notifyAuthChanged()
      router.push("/account")
      router.refresh()
    } catch {
      setError("Unable to sign in")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-24">
      <div className="glass w-full max-w-md rounded-2xl border border-[color:var(--border)] p-8">
        <h1 className="text-3xl font-black tracking-tight">Sign In</h1>
        <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">
          Access your Adelphi AI Society account.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-[color:var(--muted-foreground)]">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm outline-none transition focus:border-[color:var(--primary)]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-semibold text-[color:var(--muted-foreground)]">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm outline-none transition focus:border-[color:var(--primary)]"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--primary)] px-4 text-sm font-bold text-[color:var(--primary-foreground)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogIn className="h-4 w-4" /> {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-5 flex items-center justify-between text-sm text-[color:var(--muted-foreground)]">
          <Link href="/auth/reset-password" className="hover:text-[color:var(--primary)]">
            Forgot password?
          </Link>
          <Link href="/auth/sign-up" className="font-semibold text-[color:var(--primary)] hover:underline">
            Create account
          </Link>
        </div>
      </div>
    </div>
  )
}
