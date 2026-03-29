"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { UserPlus } from "lucide-react"
import { notifyAuthChanged } from "@/hooks/use-auth-user"

export default function SignUpPage() {
  const router = useRouter()
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        setError(data.error || "Unable to create account")
        return
      }

      notifyAuthChanged()
      router.push("/account")
      router.refresh()
    } catch {
      setError("Unable to create account")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-24">
      <div className="glass w-full max-w-md rounded-2xl border border-[color:var(--border)] p-8">
        <h1 className="text-3xl font-black tracking-tight">Create Account</h1>
        <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">
          Join the site to submit blog posts and projects.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold text-[color:var(--muted-foreground)]">
              Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm outline-none transition focus:border-[color:var(--primary)]"
            />
          </div>

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
              minLength={8}
              className="h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm outline-none transition focus:border-[color:var(--primary)]"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--primary)] px-4 text-sm font-bold text-[color:var(--primary-foreground)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <UserPlus className="h-4 w-4" /> {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="mt-5 text-sm text-[color:var(--muted-foreground)]">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="font-semibold text-[color:var(--primary)] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
