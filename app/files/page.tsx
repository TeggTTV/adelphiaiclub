"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import {
  Database,
  Download,
  File,
  FileArchive,
  FileCode2,
  FileImage,
  FileText,
  Filter,
  Folder,
  Search,
} from "lucide-react"
import { SkeletonGrid, SkeletonList, SkeletonStat } from "@/components/ui/Skeleton"

type SortMode = "newest" | "oldest" | "name" | "largest"

type FileRecord = {
  id: string
  name: string
  category: string
  url: string
  type: string
  size: number | null
  visibility: "Public" | "Members" | string
  meeting: string | null
  tags: string[]
  pinned: boolean
  createdAt: string
  uploadedByName: string
}

function getFileIcon(type: string) {
  const lowered = type.toLowerCase()

  switch (lowered) {
    case "pdf":
      return <FileText className="h-5 w-5 text-red-400" />
    case "doc":
    case "docx":
      return <FileText className="h-5 w-5 text-blue-400" />
    case "ppt":
    case "pptx":
      return <FileText className="h-5 w-5 text-orange-400" />
    case "zip":
      return <FileArchive className="h-5 w-5 text-yellow-400" />
    case "txt":
      return <FileCode2 className="h-5 w-5 text-slate-400" />
    case "png":
    case "jpg":
    case "jpeg":
    case "svg":
      return <FileImage className="h-5 w-5 text-emerald-400" />
    default:
      return <File className="h-5 w-5 text-[color:var(--muted-foreground)]" />
  }
}

function formatBytes(bytes: number | null, decimals = 2) {
  if (!bytes || bytes <= 0) return "0 Bytes"

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export default function FilesPage() {
  const [files, setFiles] = React.useState<FileRecord[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState("")

  const [query, setQuery] = React.useState("")
  const [categoryFilter, setCategoryFilter] = React.useState("All categories")
  const [typeFilter, setTypeFilter] = React.useState("All types")
  const [uploaderFilter, setUploaderFilter] = React.useState("All uploaders")
  const [visibilityFilter, setVisibilityFilter] = React.useState<"All" | "Public" | "Members">("All")
  const [sortMode, setSortMode] = React.useState<SortMode>("newest")

  React.useEffect(() => {
    fetch("/api/files", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => setFiles(data.files || []))
      .catch(() => setError("Unable to load files"))
      .finally(() => setLoading(false))
  }, [])

  const uploaders = React.useMemo(
    () => ["All uploaders", ...new Set(files.map((file) => file.uploadedByName))],
    [files]
  )

  const fileTypes = React.useMemo(
    () => ["All types", ...new Set(files.map((file) => file.type.toLowerCase()))],
    [files]
  )

  const categoryOptions = React.useMemo(
    () => ["All categories", ...new Set(files.map((file) => file.category))],
    [files]
  )

  const filteredFiles = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return files
      .filter((file) => {
        if (categoryFilter !== "All categories" && file.category !== categoryFilter) return false
        if (typeFilter !== "All types" && file.type.toLowerCase() !== typeFilter.toLowerCase()) return false
        if (uploaderFilter !== "All uploaders" && file.uploadedByName !== uploaderFilter) return false
        if (visibilityFilter !== "All" && file.visibility !== visibilityFilter) return false

        if (!normalizedQuery) return true

        const searchText = [
          file.name,
          file.meeting || "",
          file.uploadedByName,
          file.category,
          file.visibility,
          ...file.tags,
        ]
          .join(" ")
          .toLowerCase()

        return searchText.includes(normalizedQuery)
      })
      .sort((a, b) => {
        if (sortMode === "name") return a.name.localeCompare(b.name)
        if (sortMode === "largest") return (b.size || 0) - (a.size || 0)
        if (sortMode === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
  }, [categoryFilter, files, query, sortMode, typeFilter, uploaderFilter, visibilityFilter])

  const groupedFiles = React.useMemo(() => {
    const groups = new Map<string, FileRecord[]>()

    for (const file of filteredFiles) {
      if (!groups.has(file.category)) {
        groups.set(file.category, [])
      }

      groups.get(file.category)!.push(file)
    }

    return Array.from(groups.entries()).map(([category, categoryFiles]) => ({
      category,
      files: categoryFiles,
    }))
  }, [filteredFiles])

  const archiveSize = files.reduce((total, file) => total + (file.size || 0), 0)
  const publicCount = files.filter((file) => file.visibility === "Public").length
  const pinnedCount = files.filter((file) => file.pinned).length
  const activeFilterCount =
    (query.trim() ? 1 : 0) +
    (categoryFilter !== "All categories" ? 1 : 0) +
    (typeFilter !== "All types" ? 1 : 0) +
    (uploaderFilter !== "All uploaders" ? 1 : 0) +
    (visibilityFilter !== "All" ? 1 : 0)

  const clearFilters = () => {
    setQuery("")
    setCategoryFilter("All categories")
    setTypeFilter("All types")
    setUploaderFilter("All uploaders")
    setVisibilityFilter("All")
    setSortMode("newest")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(122deg,rgba(10,10,10,0.98),rgba(18,24,44,0.97),rgba(8,12,22,0.98))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_24%,rgba(56,189,248,0.24),transparent_44%),radial-gradient(circle_at_84%_18%,rgba(99,102,241,0.24),transparent_45%),radial-gradient(circle_at_50%_84%,rgba(16,185,129,0.14),transparent_40%)]" />

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-5xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100 backdrop-blur">
              <Database className="h-3.5 w-3.5" />
              Meeting Archive
            </span>
            <h1 className="mt-6 text-5xl font-black tracking-tight text-white md:text-7xl">
              Club Files <span className="text-cyan-200">Database</span>
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-200/85 md:text-xl">
              Admin-managed resources for meetings, workshops, and events.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            <StatCard label="Total Files" value={String(files.length)} />
            <StatCard label="Archive Size" value={formatBytes(archiveSize)} />
            <StatCard label="Public Docs" value={String(publicCount)} />
            <StatCard label="Pinned Items" value={String(pinnedCount)} />
          </motion.div>
        </div>
      </section>

      <section className="flex-grow bg-[color:var(--muted)]/25 py-16">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">Archive Explorer</h2>
            <Link
              href="/dashboard"
              className="inline-flex h-10 items-center rounded-full border border-[color:var(--border)] px-4 text-sm font-bold"
            >
              Admin Dashboard
            </Link>
          </div>

          <div className="mb-8 rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)]/92 p-5 shadow-xl backdrop-blur">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <div className="relative min-w-[220px] flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by file name, meeting, or uploader"
                  className="h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] pl-10 pr-3 text-sm outline-none transition focus:border-[color:var(--primary)]"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm"
              >
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value)}
                className="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm uppercase"
              >
                {fileTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <select
                value={uploaderFilter}
                onChange={(event) => setUploaderFilter(event.target.value)}
                className="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm"
              >
                {uploaders.map((uploader) => (
                  <option key={uploader} value={uploader}>
                    {uploader}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={visibilityFilter}
                onChange={(event) => setVisibilityFilter(event.target.value as "All" | "Public" | "Members")}
                className="h-10 rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-xs font-semibold uppercase tracking-[0.12em]"
              >
                <option value="All">All visibility</option>
                <option value="Public">Public</option>
                <option value="Members">Members</option>
              </select>

              <select
                value={sortMode}
                onChange={(event) => setSortMode(event.target.value as SortMode)}
                className="h-10 rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-xs font-semibold uppercase tracking-[0.12em]"
              >
                <option value="newest">Sort: Newest</option>
                <option value="oldest">Sort: Oldest</option>
                <option value="name">Sort: Name</option>
                <option value="largest">Sort: Size</option>
              </select>

              <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-3 py-2 text-xs text-[color:var(--muted-foreground)]">
                <Filter className="h-3.5 w-3.5" />
                {activeFilterCount} active filters
              </div>

              <button
                type="button"
                onClick={clearFilters}
                className="ml-auto h-10 rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-4 text-xs font-bold uppercase tracking-[0.12em] transition hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
              >
                Reset
              </button>
            </div>
          </div>

          {loading && (
            <>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <SkeletonStat />
                <SkeletonStat />
                <SkeletonStat />
                <SkeletonStat />
              </div>

              <div className="mt-8">
                <SkeletonList groups={3} itemsPerGroup={4} />
              </div>
            </>
          )}
          {error && <p className="mb-4 text-red-400">{error}</p>}

          {groupedFiles.length === 0 && !loading ? (
            <div className="glass rounded-3xl border-dashed p-10 text-center">
              <p className="text-xl font-bold">No files found for this search.</p>
              <p className="mt-2 text-[color:var(--muted-foreground)]">Try removing one or more filters.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {groupedFiles.map((group, index) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)] shadow-lg"
                >
                  <div className="flex flex-wrap items-center gap-3 border-b border-[color:var(--border)] bg-[color:var(--background)]/60 px-5 py-4">
                    <Folder className="h-5 w-5 text-[color:var(--primary)]" />
                    <h3 className="text-xl font-bold">{group.category}</h3>
                    <span className="rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-2.5 py-1 text-xs font-semibold text-[color:var(--muted-foreground)]">
                      {group.files.length} files
                    </span>
                  </div>

                  <ul className="divide-y divide-[color:var(--border)]">
                    {group.files.map((file) => (
                      <li key={file.id} className="px-5 py-4 transition hover:bg-[color:var(--muted)]/30">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                              {getFileIcon(file.type)}
                              <h4 className="truncate text-base font-bold">{file.name}</h4>
                              {file.pinned && (
                                <span className="inline-flex items-center rounded-full border border-amber-300/35 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-amber-300">
                                  Pinned
                                </span>
                              )}
                            </div>

                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[color:var(--muted-foreground)]">
                              <span className="inline-flex items-center rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-2 py-0.5 uppercase">
                                {file.type}
                              </span>
                              <span>{new Date(file.createdAt).toLocaleDateString()}</span>
                              <span
                                className={cn(
                                  "inline-flex items-center rounded-full border px-2 py-0.5",
                                  file.visibility === "Public"
                                    ? "border-emerald-400/35 bg-emerald-500/10 text-emerald-300"
                                    : "border-amber-300/35 bg-amber-500/10 text-amber-300"
                                )}
                              >
                                {file.visibility}
                              </span>
                              <span className="inline-flex items-center rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-2 py-0.5">
                                {formatBytes(file.size)}
                              </span>
                              <span>By {file.uploadedByName}</span>
                              {file.meeting && <span>{file.meeting}</span>}
                            </div>
                          </div>

                          <div className="flex shrink-0 items-center gap-2">
                            <a
                              href={file.url}
                              download
                              className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[color:var(--primary)] bg-[color:var(--primary)]/10 px-4 text-xs font-bold uppercase tracking-[0.12em] text-[color:var(--primary)] transition hover:bg-[color:var(--primary)] hover:text-[color:var(--primary-foreground)]"
                            >
                              <Download className="h-3.5 w-3.5" />
                              Download
                            </a>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur">
      <p className="text-xs uppercase tracking-[0.14em] text-slate-300">{label}</p>
      <p className="mt-1 text-3xl font-extrabold text-white">{value}</p>
    </div>
  )
}
