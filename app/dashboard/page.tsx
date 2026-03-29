"use client"

import * as React from "react"
import Link from "next/link"

type DashboardData = {
  userCount: number
  pendingPosts: Array<{
    id: string
    title: string
    slug: string
    createdAt: string
    authorName: string
    authorEmail: string
  }>
  pendingProjects: Array<{
    id: string
    title: string
    slug: string
    createdAt: string
    submittedByName: string
    submittedByEmail: string
  }>
  recentFiles: Array<{
    id: string
    name: string
    category: string
    visibility: string
    createdAt: string
    uploadedByName: string
    uploadedByEmail: string
  }>
}

type FileRecord = {
  id: string
  name: string
  category: string
  url: string
  type: string
  size: number | null
  visibility: string
  tags: string[]
  meeting: string | null
  pinned: boolean
  uploadedByName: string
}

type DashboardUser = {
  id: string
  name: string
  email: string
  role: "MEMBER" | "ADMIN"
  bio: string | null
  createdAt: string
  updatedAt: string
}

type BlogPostRecord = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  tags: string[]
  createdAt: string
  authorName: string
  updatedAt: string
  status: string
  published: boolean
  content?: string
}

type ProjectRecord = {
  id: string
  title: string
  slug: string
  description: string
  techStack: string[]
  tags: string[]
  creators: string[]
  createdAt: string
  submittedByName: string
  updatedAt: string
  status: string
  featured: boolean
  projectState: string
  difficulty: string
  semester: string | null
  impact: string | null
  githubUrl: string | null
  liveUrl: string | null
}

type PasskeyStatus = {
  configured: boolean
  source: "database" | "env_hash" | "env_plain" | "none"
  updatedAt: string | null
  dashboardUnlocked: boolean
  currentHash: {
    id: string
    action: "GENERATED" | "ACTIVATED"
    createdById: string | null
    createdByName: string
    createdByEmail: string
    createdAt: string
    inUse: boolean
  } | null
  hashLog: Array<{
    id: string
    action: "GENERATED" | "ACTIVATED"
    inUse: boolean
    createdById: string | null
    createdByName: string
    createdByEmail: string
    createdAt: string
  }>
}

const emptyDashboard: DashboardData = {
  userCount: 0,
  pendingPosts: [],
  pendingProjects: [],
  recentFiles: [],
}

const emptyPasskeyStatus: PasskeyStatus = {
  configured: false,
  source: "none",
  updatedAt: null,
  dashboardUnlocked: false,
  currentHash: null,
  hashLog: [],
}

export default function DashboardPage() {
  const [data, setData] = React.useState<DashboardData>(emptyDashboard)
  const [files, setFiles] = React.useState<FileRecord[]>([])
  const [users, setUsers] = React.useState<DashboardUser[]>([])
  const [pendingBlogQueue, setPendingBlogQueue] = React.useState<BlogPostRecord[]>([])
  const [pendingProjectQueue, setPendingProjectQueue] = React.useState<ProjectRecord[]>([])
  const [approvedPosts, setApprovedPosts] = React.useState<BlogPostRecord[]>([])
  const [approvedProjects, setApprovedProjects] = React.useState<ProjectRecord[]>([])
  const [previewPost, setPreviewPost] = React.useState<BlogPostRecord | null>(null)
  const [previewProject, setPreviewProject] = React.useState<ProjectRecord | null>(null)
  const [passkeyStatus, setPasskeyStatus] = React.useState<PasskeyStatus>(emptyPasskeyStatus)

  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState("")
  const [message, setMessage] = React.useState("")

  const [newFileName, setNewFileName] = React.useState("")
  const [newFileCategory, setNewFileCategory] = React.useState("Meeting Notes")
  const [newFileType, setNewFileType] = React.useState("pdf")
  const [newFileVisibility, setNewFileVisibility] = React.useState("Public")
  const [newFileTags, setNewFileTags] = React.useState("")
  const [newFileUpload, setNewFileUpload] = React.useState<File | null>(null)

  const [newPasskey, setNewPasskey] = React.useState("")
  const [confirmPasskey, setConfirmPasskey] = React.useState("")
  const [savingPasskey, setSavingPasskey] = React.useState(false)
  const [hashInput, setHashInput] = React.useState("")
  const [generatedHash, setGeneratedHash] = React.useState("")
  const [generatingHash, setGeneratingHash] = React.useState(false)

  const [updatingUsers, setUpdatingUsers] = React.useState<Record<string, boolean>>({})
  const [updatingApproved, setUpdatingApproved] = React.useState<Record<string, boolean>>({})
  const [checkingUnlock, setCheckingUnlock] = React.useState(true)
  const [dashboardUnlocked, setDashboardUnlocked] = React.useState(false)
  const [unlockPasskey, setUnlockPasskey] = React.useState("")
  const [unlocking, setUnlocking] = React.useState(false)
  const [unlockError, setUnlockError] = React.useState("")

  const checkUnlockAccess = React.useCallback(async () => {
    setCheckingUnlock(true)

    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
        cache: "no-store",
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        setDashboardUnlocked(false)
        setUnlockError(payload.error || "Unable to verify dashboard access")
        return
      }

      setDashboardUnlocked(Boolean(payload.dashboardAccess))
    } catch {
      setDashboardUnlocked(false)
      setUnlockError("Unable to verify dashboard access")
    } finally {
      setCheckingUnlock(false)
    }
  }, [])

  const load = React.useCallback(async () => {
    setLoading(true)
    setError("")

    try {
      const [overviewResponse, filesResponse, usersResponse, passkeyResponse, blogResponse, projectResponse] = await Promise.all([
        fetch("/api/dashboard/overview", { credentials: "include" }),
        fetch("/api/files?scope=all", { credentials: "include" }),
        fetch("/api/dashboard/users", { credentials: "include" }),
        fetch("/api/dashboard/security/passkey", { credentials: "include" }),
        fetch("/api/blog/posts?scope=all", { credentials: "include" }),
        fetch("/api/projects?scope=all", { credentials: "include" }),
      ])

      const overviewData = await overviewResponse.json().catch(() => ({}))
      const filesData = await filesResponse.json().catch(() => ({}))
      const usersData = await usersResponse.json().catch(() => ({}))
      const passkeyData = await passkeyResponse.json().catch(() => ({}))
      const blogData = await blogResponse.json().catch(() => ({}))
      const projectData = await projectResponse.json().catch(() => ({}))

      if (!overviewResponse.ok) {
        if (overviewResponse.status === 401) {
          setDashboardUnlocked(false)
          setUnlockError(overviewData.error || "Dashboard unlock required")
          return
        }

        setError(overviewData.error || "Unable to load dashboard")
        return
      }

      if (!filesResponse.ok) {
        setError(filesData.error || "Unable to load files")
      }

      if (!usersResponse.ok) {
        setError(usersData.error || "Unable to load users")
      }

      if (!passkeyResponse.ok) {
        setError(passkeyData.error || "Unable to load passkey settings")
      }

      if (!blogResponse.ok) {
        setError(blogData.error || "Unable to load blog submissions")
      }

      if (!projectResponse.ok) {
        setError(projectData.error || "Unable to load projects")
      }

      const allBlogPosts = Array.isArray(blogData.posts) ? (blogData.posts as BlogPostRecord[]) : []
      const allProjects = Array.isArray(projectData.projects) ? (projectData.projects as ProjectRecord[]) : []

      const pendingBlogPosts = allBlogPosts.filter((post) => post.status === "PENDING")
      const approvedBlogPosts = allBlogPosts.filter((post) => post.status === "APPROVED")
      const pendingProjectRows = allProjects.filter((project) => project.status === "PENDING")
      const approvedProjectRows = allProjects.filter((project) => project.status === "APPROVED")

      setData(overviewData)
      setFiles(filesData.files || [])
      setUsers(usersData.users || [])
      setPendingBlogQueue(pendingBlogPosts)
      setPendingProjectQueue(pendingProjectRows)
      setApprovedPosts(approvedBlogPosts)
      setApprovedProjects(approvedProjectRows)
      setPasskeyStatus({
        configured: Boolean(passkeyData.configured),
        source: passkeyData.source || "none",
        updatedAt: passkeyData.updatedAt || null,
        dashboardUnlocked: Boolean(passkeyData.dashboardUnlocked),
        currentHash: passkeyData.currentHash || null,
        hashLog: passkeyData.hashLog || [],
      })
    } catch {
      setError("Unable to load dashboard")
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    void checkUnlockAccess()
  }, [checkUnlockAccess])

  React.useEffect(() => {
    if (!dashboardUnlocked) {
      return
    }

    void load()
  }, [dashboardUnlocked, load])

  const unlockDashboard = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setUnlockError("")
    setUnlocking(true)

    try {
      const response = await fetch("/api/auth/admin/unlock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ passkey: unlockPasskey }),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        setUnlockError(payload.error || "Unable to unlock dashboard")
        return
      }

      setDashboardUnlocked(true)
      setUnlockPasskey("")
    } catch {
      setUnlockError("Unable to unlock dashboard")
    } finally {
      setUnlocking(false)
    }
  }

  const reviewPost = async (id: string, action: "approve" | "reject") => {
    setMessage("")
    setError("")

    const response = await fetch(`/api/blog/posts/${id}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ action }),
    })

    const payload = await response.json().catch(() => ({}))
    if (!response.ok) {
      setError(payload.error || "Unable to review post")
      return
    }

    setMessage(`Post ${action}d`)
    await load()
  }

  const reviewProject = async (id: string, action: "approve" | "reject") => {
    setMessage("")
    setError("")

    const response = await fetch(`/api/projects/${id}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ action }),
    })

    const payload = await response.json().catch(() => ({}))
    if (!response.ok) {
      setError(payload.error || "Unable to review project")
      return
    }

    setMessage(`Project ${action}d`)
    await load()
  }

  const createFile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage("")
    setError("")

    if (!newFileUpload) {
      setError("Please select a file from your computer")
      return
    }

    const formData = new FormData()
    formData.append("file", newFileUpload)
    formData.append("name", newFileName || newFileUpload.name)
    formData.append("category", newFileCategory)
    formData.append("type", newFileType)
    formData.append("visibility", newFileVisibility)
    formData.append("tags", newFileTags)

    const response = await fetch("/api/files", {
      method: "POST",
      credentials: "include",
      body: formData,
    })

    const payload = await response.json().catch(() => ({}))
    if (!response.ok) {
      setError(payload.error || "Unable to upload file")
      return
    }

    setMessage("File uploaded")
    setNewFileName("")
    setNewFileTags("")
    setNewFileUpload(null)
    await load()
  }

  const deleteFile = async (id: string) => {
    const confirmed = window.confirm("Delete this file record?")
    if (!confirmed) return

    const response = await fetch(`/api/files/${id}`, {
      method: "DELETE",
      credentials: "include",
    })

    const payload = await response.json().catch(() => ({}))
    if (!response.ok) {
      setError(payload.error || "Unable to delete file")
      return
    }

    setMessage("File deleted")
    await load()
  }

  const savePasskey = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage("")
    setError("")

    if (!newPasskey || newPasskey.length < 10) {
      setError("Passkey must be at least 10 characters")
      return
    }

    if (newPasskey !== confirmPasskey) {
      setError("Passkey confirmation does not match")
      return
    }

    setSavingPasskey(true)

    try {
      const response = await fetch("/api/dashboard/security/passkey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ newPasskey }),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        setError(payload.error || "Unable to update dashboard passkey")
        return
      }

      setNewPasskey("")
      setConfirmPasskey("")
      setMessage("Dashboard passkey hash updated")
      await load()
    } catch {
      setError("Unable to update dashboard passkey")
    } finally {
      setSavingPasskey(false)
    }
  }

  const rejectApprovedPost = async (id: string) => {
    const confirmed = window.confirm("Move this approved post to rejected?")
    if (!confirmed) return

    setMessage("")
    setError("")
    setUpdatingApproved((state) => ({ ...state, [id]: true }))

    try {
      const response = await fetch(`/api/blog/posts/${id}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ action: "reject", reason: "Removed from approved content by admin" }),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        setError(payload.error || "Unable to update approved post")
        return
      }

      setMessage("Approved post moved to rejected")
      await load()
    } catch {
      setError("Unable to update approved post")
    } finally {
      setUpdatingApproved((state) => ({ ...state, [id]: false }))
    }
  }

  const deletePost = async (id: string) => {
    const confirmed = window.confirm("Delete this approved blog post?")
    if (!confirmed) return

    setMessage("")
    setError("")
    setUpdatingApproved((state) => ({ ...state, [id]: true }))

    try {
      const response = await fetch(`/api/blog/posts/${id}`, {
        method: "DELETE",
        credentials: "include",
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        setError(payload.error || "Unable to delete post")
        return
      }

      setMessage("Approved post deleted")
      await load()
    } catch {
      setError("Unable to delete post")
    } finally {
      setUpdatingApproved((state) => ({ ...state, [id]: false }))
    }
  }

  const rejectApprovedProject = async (id: string) => {
    const confirmed = window.confirm("Move this approved project to rejected?")
    if (!confirmed) return

    setMessage("")
    setError("")
    setUpdatingApproved((state) => ({ ...state, [id]: true }))

    try {
      const response = await fetch(`/api/projects/${id}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ action: "reject", reason: "Removed from approved content by admin" }),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        setError(payload.error || "Unable to update approved project")
        return
      }

      setMessage("Approved project moved to rejected")
      await load()
    } catch {
      setError("Unable to update approved project")
    } finally {
      setUpdatingApproved((state) => ({ ...state, [id]: false }))
    }
  }

  const toggleFeaturedProject = async (id: string, featured: boolean) => {
    setMessage("")
    setError("")
    setUpdatingApproved((state) => ({ ...state, [id]: true }))

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ featured }),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        setError(payload.error || "Unable to update featured state")
        return
      }

      setMessage(featured ? "Project featured" : "Project unfeatured")
      await load()
    } catch {
      setError("Unable to update featured state")
    } finally {
      setUpdatingApproved((state) => ({ ...state, [id]: false }))
    }
  }

  const deleteProject = async (id: string) => {
    const confirmed = window.confirm("Delete this approved project?")
    if (!confirmed) return

    setMessage("")
    setError("")
    setUpdatingApproved((state) => ({ ...state, [id]: true }))

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        credentials: "include",
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        setError(payload.error || "Unable to delete project")
        return
      }

      setMessage("Approved project deleted")
      await load()
    } catch {
      setError("Unable to delete project")
    } finally {
      setUpdatingApproved((state) => ({ ...state, [id]: false }))
    }
  }

  const clearDatabasePasskey = async () => {
    const confirmed = window.confirm("Clear database-managed passkey hash and fall back to .env?")
    if (!confirmed) return

    const response = await fetch("/api/dashboard/security/passkey", {
      method: "DELETE",
      credentials: "include",
    })

    const payload = await response.json().catch(() => ({}))
    if (!response.ok) {
      setError(payload.error || "Unable to clear database passkey")
      return
    }

    setMessage("Database passkey hash cleared")
    await load()
  }

  const generateHash = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage("")
    setError("")

    if (!hashInput || hashInput.length < 8) {
      setError("Password must be at least 8 characters to hash")
      return
    }

    setGeneratingHash(true)

    try {
      const response = await fetch("/api/dashboard/security/hash", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ password: hashInput }),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        setError(payload.error || "Unable to generate hash")
        return
      }

      setGeneratedHash(payload.hash || "")
      setMessage("Hash generated and logged")
      await load()
    } catch {
      setError("Unable to generate hash")
    } finally {
      setGeneratingHash(false)
    }
  }

  const copyGeneratedHash = async () => {
    if (!generatedHash) return

    try {
      await navigator.clipboard.writeText(generatedHash)
      setMessage("Hash copied to clipboard")
    } catch {
      setError("Unable to copy hash")
    }
  }

  const updateUserRole = async (targetUserId: string, role: "MEMBER" | "ADMIN") => {
    setMessage("")
    setError("")
    setUpdatingUsers((state) => ({ ...state, [targetUserId]: true }))

    try {
      const response = await fetch(`/api/dashboard/users/${targetUserId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ role }),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        setError(payload.error || "Unable to update user role")
        return
      }

      setMessage("User role updated")
      await load()
    } catch {
      setError("Unable to update user role")
    } finally {
      setUpdatingUsers((state) => ({ ...state, [targetUserId]: false }))
    }
  }

  const deleteUser = async (targetUserId: string) => {
    const confirmed = window.confirm("Delete this user account?")
    if (!confirmed) return

    setMessage("")
    setError("")
    setUpdatingUsers((state) => ({ ...state, [targetUserId]: true }))

    try {
      const response = await fetch(`/api/dashboard/users/${targetUserId}`, {
        method: "DELETE",
        credentials: "include",
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        setError(payload.error || "Unable to delete user")
        return
      }

      setMessage("User deleted")
      await load()
    } catch {
      setError("Unable to delete user")
    } finally {
      setUpdatingUsers((state) => ({ ...state, [targetUserId]: false }))
    }
  }

  if (checkingUnlock) {
    return <div className="flex min-h-screen items-center justify-center">Checking dashboard access...</div>
  }

  if (!dashboardUnlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-24">
        <div className="glass w-full max-w-md rounded-2xl border border-[color:var(--border)] p-6">
          <h1 className="text-2xl font-black tracking-tight">Unlock Creator Dashboard</h1>
          <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">
            Enter the dashboard passkey hash to access admin tools.
          </p>

          <form onSubmit={unlockDashboard} className="mt-5 space-y-3">
            <input
              type="password"
              value={unlockPasskey}
              onChange={(event) => setUnlockPasskey(event.target.value)}
              placeholder="Dashboard passkey"
              className="h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm"
              required
            />
            {unlockError ? <p className="text-sm text-red-400">{unlockError}</p> : null}
            <button
              type="submit"
              disabled={unlocking}
              className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[color:var(--primary)] px-4 text-sm font-bold text-[color:var(--primary-foreground)] disabled:opacity-60"
            >
              {unlocking ? "Unlocking..." : "Unlock Dashboard"}
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading dashboard...</div>
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-24">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Creator Dashboard</h1>
          <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">
            Approve submissions, manage admin security, upload files, and manage users.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/blog/submit"
            className="inline-flex h-10 items-center rounded-full border border-[color:var(--border)] px-4 text-sm font-bold"
          >
            New Blog Submission
          </Link>
          <Link
            href="/projects/submit"
            className="inline-flex h-10 items-center rounded-full border border-[color:var(--border)] px-4 text-sm font-bold"
          >
            New Project Submission
          </Link>
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
      {message && <p className="mb-4 text-sm text-emerald-300">{message}</p>}

      <div className="mb-8 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Members" value={String(data.userCount)} />
        <StatCard label="Pending Blog Posts" value={String(pendingBlogQueue.length)} />
        <StatCard label="Pending Projects" value={String(pendingProjectQueue.length)} />
        <StatCard label="Approved Blogs" value={String(approvedPosts.length)} />
        <StatCard label="Approved Projects" value={String(approvedProjects.length)} />
        <StatCard label="Files" value={String(files.length)} />
      </div>

      <section className="mb-10 grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-2xl border border-[color:var(--border)] p-5">
          <h2 className="mb-2 text-xl font-bold">Admin Passkey Hash Management</h2>
          <p className="mb-1 text-sm text-[color:var(--muted-foreground)]">
            Current source: <span className="font-semibold">{passkeyStatus.source}</span>
            {passkeyStatus.updatedAt ? ` (updated ${new Date(passkeyStatus.updatedAt).toLocaleString()})` : ""}
          </p>
          <p className="mb-1 text-sm text-[color:var(--muted-foreground)]">
            Dashboard session: {" "}
            <span className={passkeyStatus.dashboardUnlocked ? "font-semibold text-emerald-300" : "font-semibold text-rose-300"}>
              {passkeyStatus.dashboardUnlocked ? "Unlocked" : "Locked"}
            </span>
          </p>
          <p className="mb-4 text-sm text-[color:var(--muted-foreground)]">
            Current hash: {" "}
            {passkeyStatus.currentHash ? (
              <>
                <span className="font-semibold text-[color:var(--foreground)]">{passkeyStatus.currentHash.inUse ? "In use" : "Not in use"}</span>
                {` (set by ${passkeyStatus.currentHash.createdByName} on ${new Date(passkeyStatus.currentHash.createdAt).toLocaleString()})`}
              </>
            ) : (
              <span className="font-semibold">None</span>
            )}
          </p>

          <form onSubmit={savePasskey} className="space-y-3">
            <input
              type="password"
              value={newPasskey}
              onChange={(event) => setNewPasskey(event.target.value)}
              placeholder="New dashboard passkey"
              minLength={10}
              required
              className="h-10 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm"
            />
            <input
              type="password"
              value={confirmPasskey}
              onChange={(event) => setConfirmPasskey(event.target.value)}
              placeholder="Confirm new passkey"
              minLength={10}
              required
              className="h-10 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm"
            />
            <div className="flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={savingPasskey}
                className="inline-flex h-10 items-center justify-center rounded-xl bg-[color:var(--primary)] px-4 text-sm font-bold text-[color:var(--primary-foreground)] disabled:opacity-60"
              >
                {savingPasskey ? "Saving..." : "Save Hashed Passkey"}
              </button>
              <button
                type="button"
                onClick={clearDatabasePasskey}
                className="inline-flex h-10 items-center justify-center rounded-xl border border-[color:var(--border)] px-4 text-sm font-semibold"
              >
                Clear DB Override
              </button>
            </div>
          </form>

          <div className="mt-5 border-t border-[color:var(--border)] pt-4">
            <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.08em] text-[color:var(--muted-foreground)]">
              Password Hash Generator
            </h3>
            <form onSubmit={generateHash} className="space-y-3">
              <input
                type="password"
                value={hashInput}
                onChange={(event) => setHashInput(event.target.value)}
                placeholder="Password to hash"
                minLength={8}
                required
                className="h-10 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm"
              />
              <div className="flex flex-wrap gap-2">
                <button
                  type="submit"
                  disabled={generatingHash}
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-4 text-sm font-semibold disabled:opacity-60"
                >
                  {generatingHash ? "Generating..." : "Generate Hash"}
                </button>
                <button
                  type="button"
                  onClick={copyGeneratedHash}
                  disabled={!generatedHash}
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-[color:var(--border)] px-4 text-sm font-semibold disabled:opacity-60"
                >
                  Copy Hash
                </button>
              </div>
              <textarea
                value={generatedHash}
                readOnly
                placeholder="Generated hash will appear here"
                rows={3}
                className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 py-2 text-xs"
              />
            </form>

            <div className="mt-4">
              <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.1em] text-[color:var(--muted-foreground)]">
                Hash Audit Log
              </h4>
              <div className="max-h-44 overflow-auto rounded-xl border border-[color:var(--border)] bg-[color:var(--background)]/60">
                {passkeyStatus.hashLog.length === 0 ? (
                  <p className="px-3 py-3 text-xs text-[color:var(--muted-foreground)]">No hash records yet.</p>
                ) : (
                  <ul className="divide-y divide-[color:var(--border)]">
                    {passkeyStatus.hashLog.map((record) => (
                      <li key={record.id} className="px-3 py-2 text-xs">
                        <p className="font-semibold">
                          {record.action} {record.inUse ? "(current)" : "(archived)"}
                        </p>
                        <p className="text-[color:var(--muted-foreground)]">
                          {record.createdByName} ({record.createdByEmail}) - {new Date(record.createdAt).toLocaleString()}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl border border-[color:var(--border)] p-5">
          <h2 className="mb-4 text-xl font-bold">Add File From Computer</h2>
          <form onSubmit={createFile} className="space-y-3">
            <input
              type="file"
              onChange={(event) => setNewFileUpload(event.target.files?.[0] || null)}
              required
              className="block w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 py-2 text-sm"
            />
            <input
              value={newFileName}
              onChange={(event) => setNewFileName(event.target.value)}
              placeholder="Display name (optional)"
              className="h-10 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                value={newFileCategory}
                onChange={(event) => setNewFileCategory(event.target.value)}
                placeholder="Category"
                className="h-10 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm"
              />
              <input
                value={newFileType}
                onChange={(event) => setNewFileType(event.target.value)}
                placeholder="Type"
                className="h-10 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm"
              />
            </div>
            <input
              value={newFileTags}
              onChange={(event) => setNewFileTags(event.target.value)}
              placeholder="Tags (comma separated)"
              className="h-10 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm"
            />
            <select
              value={newFileVisibility}
              onChange={(event) => setNewFileVisibility(event.target.value)}
              className="h-10 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm"
            >
              <option value="Public">Public</option>
              <option value="Members">Members</option>
            </select>
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-xl bg-[color:var(--primary)] px-4 text-sm font-bold text-[color:var(--primary-foreground)]"
            >
              Upload File
            </button>
          </form>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold">User Management</h2>
        <div className="glass overflow-hidden rounded-2xl border border-[color:var(--border)]">
          {users.length === 0 ? (
            <p className="p-5 text-sm text-[color:var(--muted-foreground)]">No users found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-[color:var(--border)] bg-[color:var(--muted)]/40">
                  <tr>
                    <th className="px-4 py-3 font-bold">Name</th>
                    <th className="px-4 py-3 font-bold">Email</th>
                    <th className="px-4 py-3 font-bold">Role</th>
                    <th className="px-4 py-3 font-bold">Created</th>
                    <th className="px-4 py-3 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    const busy = Boolean(updatingUsers[user.id])
                    return (
                      <tr key={user.id} className="border-b border-[color:var(--border)] last:border-b-0">
                        <td className="px-4 py-3 font-semibold">{user.name}</td>
                        <td className="px-4 py-3 text-[color:var(--muted-foreground)]">{user.email}</td>
                        <td className="px-4 py-3">
                          <select
                            value={user.role}
                            disabled={busy}
                            onChange={(event) => updateUserRole(user.id, event.target.value as "MEMBER" | "ADMIN")}
                            className="h-9 rounded-lg border border-[color:var(--border)] bg-[color:var(--background)] px-2 text-xs font-semibold"
                          >
                            <option value="MEMBER">MEMBER</option>
                            <option value="ADMIN">ADMIN</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 text-[color:var(--muted-foreground)]">{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => deleteUser(user.id)}
                            className="rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white disabled:opacity-60"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold">Pending Blog Approvals</h2>
        <div className="glass overflow-hidden rounded-2xl border border-[color:var(--border)]">
          {pendingBlogQueue.length === 0 ? (
            <p className="p-5 text-sm text-[color:var(--muted-foreground)]">No blog posts waiting for review.</p>
          ) : (
            <ul className="divide-y divide-[color:var(--border)]">
              {pendingBlogQueue.map((post) => (
                <li key={post.id} className="flex flex-wrap items-center gap-3 p-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{post.title}</p>
                    <p className="text-xs text-[color:var(--muted-foreground)]">
                      By {post.authorName} • Submitted {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPreviewPost(post)}
                    className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs font-bold"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    onClick={() => reviewPost(post.id, "approve")}
                    className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => reviewPost(post.id, "reject")}
                    className="rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white"
                  >
                    Reject
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold">Pending Project Approvals</h2>
        <div className="glass overflow-hidden rounded-2xl border border-[color:var(--border)]">
          {pendingProjectQueue.length === 0 ? (
            <p className="p-5 text-sm text-[color:var(--muted-foreground)]">No projects waiting for review.</p>
          ) : (
            <ul className="divide-y divide-[color:var(--border)]">
              {pendingProjectQueue.map((project) => (
                <li key={project.id} className="flex flex-wrap items-center gap-3 p-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{project.title}</p>
                    <p className="text-xs text-[color:var(--muted-foreground)]">
                      By {project.submittedByName} • Submitted {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPreviewProject(project)}
                    className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs font-bold"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    onClick={() => reviewProject(project.id, "approve")}
                    className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => reviewProject(project.id, "reject")}
                    className="rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white"
                  >
                    Reject
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold">Approved Blogs</h2>
        <div className="glass overflow-hidden rounded-2xl border border-[color:var(--border)]">
          {approvedPosts.length === 0 ? (
            <p className="p-5 text-sm text-[color:var(--muted-foreground)]">No approved blog posts yet.</p>
          ) : (
            <ul className="divide-y divide-[color:var(--border)]">
              {approvedPosts.map((post) => {
                const busy = Boolean(updatingApproved[post.id])

                return (
                  <li key={post.id} className="flex flex-wrap items-center gap-3 p-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold">{post.title}</p>
                      <p className="text-xs text-[color:var(--muted-foreground)]">
                        By {post.authorName} • Updated {new Date(post.updatedAt).toLocaleDateString()} • {post.published ? "Published" : "Unpublished"}
                      </p>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs font-bold"
                    >
                      View
                    </Link>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => rejectApprovedPost(post.id)}
                      className="rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white disabled:opacity-60"
                    >
                      Move to Rejected
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => deletePost(post.id)}
                      className="rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white disabled:opacity-60"
                    >
                      Delete
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold">Approved Projects</h2>
        <div className="glass overflow-hidden rounded-2xl border border-[color:var(--border)]">
          {approvedProjects.length === 0 ? (
            <p className="p-5 text-sm text-[color:var(--muted-foreground)]">No approved projects yet.</p>
          ) : (
            <ul className="divide-y divide-[color:var(--border)]">
              {approvedProjects.map((project) => {
                const busy = Boolean(updatingApproved[project.id])

                return (
                  <li key={project.id} className="flex flex-wrap items-center gap-3 p-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold">{project.title}</p>
                      <p className="text-xs text-[color:var(--muted-foreground)]">
                        By {project.submittedByName} • Updated {new Date(project.updatedAt).toLocaleDateString()} • {project.featured ? "Featured" : "Standard"}
                      </p>
                    </div>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => toggleFeaturedProject(project.id, !project.featured)}
                      className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs font-bold disabled:opacity-60"
                    >
                      {project.featured ? "Remove Featured" : "Set Featured"}
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => rejectApprovedProject(project.id)}
                      className="rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white disabled:opacity-60"
                    >
                      Move to Rejected
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => deleteProject(project.id)}
                      className="rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white disabled:opacity-60"
                    >
                      Delete
                    </button>
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs font-bold"
                      >
                        GitHub
                      </a>
                    ) : null}
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs font-bold"
                      >
                        Live Demo
                      </a>
                    ) : null}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold">Files</h2>
        <div className="glass rounded-2xl border border-[color:var(--border)] p-5">
          <div className="max-h-[420px] overflow-auto">
            {files.length === 0 ? (
              <p className="text-sm text-[color:var(--muted-foreground)]">No files found.</p>
            ) : (
              <ul className="space-y-3">
                {files.map((file) => (
                  <li key={file.id} className="rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">{file.name}</p>
                        <p className="truncate text-xs text-[color:var(--muted-foreground)]">
                          {file.category} • {file.visibility} • {file.uploadedByName}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteFile(file.id)}
                        className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {previewPost ? (
        <PreviewModal title={previewPost.title} subtitle={`By ${previewPost.authorName}`} onClose={() => setPreviewPost(null)}>
          <p className="text-xs text-[color:var(--muted-foreground)]">
            Submitted {new Date(previewPost.createdAt).toLocaleString()} • Status {previewPost.status}
          </p>
          {previewPost.tags.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {previewPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-2 py-1 text-[11px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
          {previewPost.excerpt ? <p className="mt-4 text-sm font-semibold">{previewPost.excerpt}</p> : null}
          <div className="mt-4 max-h-[420px] overflow-auto rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] p-4">
            <p className="whitespace-pre-wrap text-sm leading-relaxed">{previewPost.content || "No content provided."}</p>
          </div>
        </PreviewModal>
      ) : null}

      {previewProject ? (
        <PreviewModal
          title={previewProject.title}
          subtitle={`By ${previewProject.submittedByName}`}
          onClose={() => setPreviewProject(null)}
        >
          <p className="text-xs text-[color:var(--muted-foreground)]">
            Submitted {new Date(previewProject.createdAt).toLocaleString()} • {previewProject.projectState} • {previewProject.difficulty}
          </p>
          <div className="mt-4 max-h-[420px] overflow-auto rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] p-4">
            <p className="whitespace-pre-wrap text-sm leading-relaxed">{previewProject.description || "No description provided."}</p>
          </div>
          {previewProject.techStack.length > 0 ? (
            <div className="mt-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.08em] text-[color:var(--muted-foreground)]">Tech Stack</p>
              <p className="text-sm">{previewProject.techStack.join(", ")}</p>
            </div>
          ) : null}
          {previewProject.creators.length > 0 ? (
            <div className="mt-3">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.08em] text-[color:var(--muted-foreground)]">Creators</p>
              <p className="text-sm">{previewProject.creators.join(", ")}</p>
            </div>
          ) : null}
          {previewProject.tags.length > 0 ? (
            <div className="mt-3">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.08em] text-[color:var(--muted-foreground)]">Tags</p>
              <p className="text-sm">{previewProject.tags.join(", ")}</p>
            </div>
          ) : null}
        </PreviewModal>
      ) : null}
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-2xl border border-[color:var(--border)] p-4">
      <p className="text-xs uppercase tracking-[0.15em] text-[color:var(--muted-foreground)]">{label}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
    </div>
  )
}

function PreviewModal({
  title,
  subtitle,
  onClose,
  children,
}: {
  title: string
  subtitle?: string
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        className="glass w-full max-w-3xl rounded-2xl border border-[color:var(--border)] p-5"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold">{title}</h3>
            {subtitle ? <p className="text-sm text-[color:var(--muted-foreground)]">{subtitle}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs font-bold"
          >
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
