"use client"

import * as React from "react"
import Link from "next/link"

export default function SubmitProjectPage() {
  const [authenticated, setAuthenticated] = React.useState(false)
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [techStack, setTechStack] = React.useState("")
  const [tags, setTags] = React.useState("")
  const [creators, setCreators] = React.useState("")
  const [projectState, setProjectState] = React.useState("Planning")
  const [difficulty, setDifficulty] = React.useState("Beginner")
  const [githubUrl, setGithubUrl] = React.useState("")
  const [liveUrl, setLiveUrl] = React.useState("")
  const [semester, setSemester] = React.useState("")
  const [impact, setImpact] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => setAuthenticated(Boolean(data.user)))
      .catch(() => setAuthenticated(false))
  }, [])

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage("")
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          description,
          techStack,
          tags,
          creators,
          projectState,
          difficulty,
          githubUrl,
          liveUrl,
          semester,
          impact,
        }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        setError(data.error || "Unable to submit project")
        return
      }

      setTitle("")
      setDescription("")
      setTechStack("")
      setTags("")
      setCreators("")
      setGithubUrl("")
      setLiveUrl("")
      setSemester("")
      setImpact("")
      setMessage("Project submitted. Admin review is required before publishing.")
    } catch {
      setError("Unable to submit project")
    } finally {
      setLoading(false)
    }
  }

  if (!authenticated) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-24 text-center">
        <h1 className="text-4xl font-black">Submit a Project</h1>
        <p className="mt-3 text-[color:var(--muted-foreground)]">You need an account to submit projects.</p>
        <Link
          href="/auth/sign-in"
          className="mt-6 inline-flex h-11 items-center rounded-full bg-[color:var(--primary)] px-6 text-sm font-bold text-[color:var(--primary-foreground)]"
        >
          Sign In
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-24">
      <div className="glass rounded-2xl border border-[color:var(--border)] p-8">
        <h1 className="text-4xl font-black tracking-tight">Submit a Project</h1>
        <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">Projects are published after admin approval.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            placeholder="Project title"
            className="h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm"
          />

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={6}
            required
            placeholder="Project description"
            className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 py-2 text-sm"
          />

          <div className="grid gap-3 md:grid-cols-2">
            <input
              value={techStack}
              onChange={(event) => setTechStack(event.target.value)}
              placeholder="Tech stack (comma separated)"
              className="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm"
            />
            <input
              value={tags}
              onChange={(event) => setTags(event.target.value)}
              placeholder="Tags (comma separated)"
              className="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm"
            />
            <input
              value={creators}
              onChange={(event) => setCreators(event.target.value)}
              placeholder="Creators (comma separated)"
              className="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm"
            />
            <input
              value={semester}
              onChange={(event) => setSemester(event.target.value)}
              placeholder="Semester"
              className="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm"
            />
            <input
              value={impact}
              onChange={(event) => setImpact(event.target.value)}
              placeholder="Impact statement"
              className="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm md:col-span-2"
            />
            <input
              value={githubUrl}
              onChange={(event) => setGithubUrl(event.target.value)}
              placeholder="GitHub URL"
              className="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm"
            />
            <input
              value={liveUrl}
              onChange={(event) => setLiveUrl(event.target.value)}
              placeholder="Live demo URL"
              className="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm"
            />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <select
              value={projectState}
              onChange={(event) => setProjectState(event.target.value)}
              className="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm"
            >
              <option value="Planning">Planning</option>
              <option value="Research">Research</option>
              <option value="In Progress">In Progress</option>
              <option value="Launched">Launched</option>
            </select>

            <select
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value)}
              className="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

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
