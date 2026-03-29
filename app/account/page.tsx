"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

type AccountUser = {
  id: string
  name: string
  email: string
  role: "MEMBER" | "ADMIN"
  bio?: string | null
  privateNote?: string | null
  createdAt: string
}

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = React.useState<AccountUser | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState("")
  const [message, setMessage] = React.useState("")

  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [bio, setBio] = React.useState("")
  const [privateNote, setPrivateNote] = React.useState("")
  const [currentPassword, setCurrentPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [deletePassword, setDeletePassword] = React.useState("")

  const load = React.useCallback(async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/account", { credentials: "include" })
      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        router.push("/auth/sign-in")
        return
      }

      setUser(data.user)
      setName(data.user.name || "")
      setEmail(data.user.email || "")
      setBio(data.user.bio || "")
      setPrivateNote(data.user.privateNote || "")
    } catch {
      setError("Unable to load account")
    } finally {
      setLoading(false)
    }
  }, [router])

  React.useEffect(() => {
    void load()
  }, [load])

  const save = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaving(true)
    setError("")
    setMessage("")

    try {
      const response = await fetch("/api/auth/account", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          bio,
          privateNote,
          currentPassword,
          newPassword,
        }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        setError(data.error || "Unable to save account")
        return
      }

      setMessage("Account updated successfully.")
      setCurrentPassword("")
      setNewPassword("")
      setUser(data.user)
    } catch {
      setError("Unable to save account")
    } finally {
      setSaving(false)
    }
  }

  const deleteAccount = async () => {
    if (!deletePassword) {
      setError("Enter your password to delete your account")
      return
    }

    const confirmed = window.confirm("Delete account permanently? This cannot be undone.")
    if (!confirmed) return

    setSaving(true)
    setError("")

    try {
      const response = await fetch("/api/auth/account", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ password: deletePassword }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        setError(data.error || "Unable to delete account")
        return
      }

      router.push("/")
      router.refresh()
    } catch {
      setError("Unable to delete account")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-[color:var(--muted-foreground)]">
        Loading account...
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-24">
      <div className="glass rounded-2xl border border-[color:var(--border)] p-8">
        <h1 className="text-3xl font-black tracking-tight">Account Settings</h1>
        <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">
          Signed in as {user?.name} ({user?.role})
        </p>

        <form onSubmit={save} className="mt-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-[color:var(--muted-foreground)]">
                Name
              </label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
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
                className="h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm outline-none transition focus:border-[color:var(--primary)]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="bio" className="text-sm font-semibold text-[color:var(--muted-foreground)]">
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              rows={3}
              className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 py-2 text-sm outline-none transition focus:border-[color:var(--primary)]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="privateNote" className="text-sm font-semibold text-[color:var(--muted-foreground)]">
              Private note (encrypted)
            </label>
            <textarea
              id="privateNote"
              value={privateNote}
              onChange={(event) => setPrivateNote(event.target.value)}
              rows={3}
              className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 py-2 text-sm outline-none transition focus:border-[color:var(--primary)]"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="currentPassword" className="text-sm font-semibold text-[color:var(--muted-foreground)]">
                Current password
              </label>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                className="h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm outline-none transition focus:border-[color:var(--primary)]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="newPassword" className="text-sm font-semibold text-[color:var(--muted-foreground)]">
                New password
              </label>
              <input
                id="newPassword"
                type="password"
                minLength={8}
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                className="h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm outline-none transition focus:border-[color:var(--primary)]"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
          {message && <p className="text-sm text-emerald-300">{message}</p>}

          <button
            type="submit"
            disabled={saving}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[color:var(--primary)] px-6 text-sm font-bold text-[color:var(--primary-foreground)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>

        <div className="mt-10 rounded-xl border border-red-400/30 bg-red-500/10 p-4">
          <h2 className="text-lg font-bold text-red-300">Danger Zone</h2>
          <p className="mt-1 text-sm text-red-200/80">Delete your account permanently.</p>

          <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center">
            <input
              type="password"
              value={deletePassword}
              onChange={(event) => setDeletePassword(event.target.value)}
              placeholder="Confirm password"
              className="h-11 flex-1 rounded-xl border border-red-400/30 bg-[color:var(--background)] px-3 text-sm outline-none"
            />
            <button
              type="button"
              onClick={deleteAccount}
              disabled={saving}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-red-500 px-4 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
