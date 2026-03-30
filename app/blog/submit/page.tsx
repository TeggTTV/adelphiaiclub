"use client"

import * as React from "react"
import Link from "next/link"
import { X } from "lucide-react"

type AuthPayload = {
  user: {
    id: string
    name: string
  } | null
}

export default function SubmitBlogPage() {
  const [auth, setAuth] = React.useState<AuthPayload>({ user: null })
  const [title, setTitle] = React.useState("")
  const [excerpt, setExcerpt] = React.useState("")
  const [tags, setTags] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [content, setContent] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => setAuth(data))
      .catch(() => setAuth({ user: null }))
  }, [])

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage("")
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/blog/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          excerpt,
          tags,
          email,
          content,
        }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        setError(data.error || "Unable to submit post")
        return
      }

      setTitle("")
      setExcerpt("")
      setTags("")
      setEmail("")
      setContent("")
      setMessage("Submission sent. An admin will review your post.")
    } catch {
      setError("Unable to submit post")
    } finally {
      setLoading(false)
    }
  }

  if (!auth.user) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-24 text-center">
        <h1 className="text-4xl font-black">Submit a Blog Post</h1>
        <p className="mt-3 text-[color:var(--muted-foreground)]">You need an account to submit posts.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/auth/sign-in"
            className="inline-flex h-11 items-center rounded-full bg-[color:var(--primary)] px-6 text-sm font-bold text-[color:var(--primary-foreground)]"
          >
            Sign In
          </Link>
          <Link
            href="/blog"
            className="inline-flex h-11 items-center gap-1 rounded-full border border-[color:var(--border)] px-5 text-sm font-semibold"
          >
            <X className="h-4 w-4" /> Close
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-24">
      <div className="glass rounded-2xl border border-[color:var(--border)] p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-4xl font-black tracking-tight">Submit a Blog Post</h1>
            <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">
              Your article will be visible after admin approval.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex h-10 items-center gap-1 rounded-full border border-[color:var(--border)] px-4 text-sm font-semibold"
          >
            <X className="h-4 w-4" /> Close
          </Link>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            placeholder="Title"
            className="h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm"
          />
          <input
            value={excerpt}
            onChange={(event) => setExcerpt(event.target.value)}
            placeholder="Short excerpt"
            className="h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm"
          />
          <input
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            placeholder="Tags (comma separated)"
            className="h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm"
          />
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Optional contact email"
            className="h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm"
          />
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={14}
            required
            placeholder="Write your article (Markdown supported as plain text)"
            className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 py-2 text-sm"
          />

          {error && <p className="text-sm text-red-400">{error}</p>}
          {message && <p className="text-sm text-emerald-300">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-11 items-center rounded-xl bg-[color:var(--primary)] px-6 text-sm font-bold text-[color:var(--primary-foreground)] disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit for Review"}
          </button>
        </form>
      </div>
    </div>
  )
}
