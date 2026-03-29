"use client"

import * as React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function ResetPasswordPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center px-4 py-24 text-[color:var(--muted-foreground)]">
          Loading reset form...
        </div>
      }
    >
      <ResetPasswordContent />
    </React.Suspense>
  )
}

function ResetPasswordContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const requestReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage("")
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/password-reset/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        setError(data.error || "Unable to request reset")
        return
      }

      if (data.resetUrl) {
        setMessage(`Reset link (dev): ${data.resetUrl}`)
      } else {
        setMessage("If that email exists, a reset link has been sent.")
      }
    } catch {
      setError("Unable to request reset")
    } finally {
      setLoading(false)
    }
  }

  const confirmReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!token) return

    setMessage("")
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/password-reset/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword: password }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        setError(data.error || "Unable to reset password")
        return
      }

      setMessage("Password reset successfully. You can now sign in.")
    } catch {
      setError("Unable to reset password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-24">
      <div className="glass w-full max-w-md rounded-2xl border border-[color:var(--border)] p-8">
        <h1 className="text-3xl font-black tracking-tight">Password Reset</h1>

        {token ? (
          <>
            <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">Enter a new password for your account.</p>
            <form onSubmit={confirmReset} className="mt-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="newPassword" className="text-sm font-semibold text-[color:var(--muted-foreground)]">
                  New password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  minLength={8}
                  required
                  className="h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm outline-none transition focus:border-[color:var(--primary)]"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[color:var(--primary)] px-4 text-sm font-bold text-[color:var(--primary-foreground)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Saving..." : "Set New Password"}
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">Request a password reset link.</p>
            <form onSubmit={requestReset} className="mt-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-[color:var(--muted-foreground)]">
                  Account email
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

              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[color:var(--primary)] px-4 text-sm font-bold text-[color:var(--primary-foreground)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </>
        )}

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
        {message && <p className="mt-4 text-sm text-emerald-300">{message}</p>}

        <p className="mt-5 text-sm text-[color:var(--muted-foreground)]">
          Return to{" "}
          <Link href="/auth/sign-in" className="font-semibold text-[color:var(--primary)] hover:underline">
            sign in
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
