"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Section } from "@/components/Section"
import { ArchiveFile, fileCategories } from "@/lib/data"
import { cn } from "@/lib/utils"
import {
  CalendarClock,
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
  ShieldCheck,
  ShieldEllipsis,
  Sparkles,
  Tag,
  UserRound,
} from "lucide-react"

type SortMode = "newest" | "oldest" | "name" | "largest"

function getFileIcon(type: string) {
  switch (type) {
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

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes"
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export default function FilesPage() {
  const [query, setQuery] = React.useState("")
  const [categoryFilter, setCategoryFilter] = React.useState("All categories")
  const [typeFilter, setTypeFilter] = React.useState("All types")
  const [uploaderFilter, setUploaderFilter] = React.useState("All uploaders")
  const [visibilityFilter, setVisibilityFilter] = React.useState<"All" | ArchiveFile["visibility"]>("All")
  const [sortMode, setSortMode] = React.useState<SortMode>("newest")
  const [activeTags, setActiveTags] = React.useState<string[]>([])

  const allFiles = React.useMemo(
    () =>
      fileCategories.flatMap((category) =>
        category.files.map((file) => ({
          ...file,
          categoryId: category.id,
          categoryName: category.name,
        }))
      ),
    []
  )

  const uploaders = React.useMemo(
    () => ["All uploaders", ...new Set(allFiles.map((file) => file.uploadedBy))],
    [allFiles]
  )

  const fileTypes = React.useMemo(
    () => ["All types", ...new Set(allFiles.map((file) => file.type.toLowerCase()))],
    [allFiles]
  )

  const categoryOptions = React.useMemo(
    () => ["All categories", ...fileCategories.map((category) => category.name)],
    []
  )

  const allTags = React.useMemo(
    () => [...new Set(allFiles.flatMap((file) => file.tags))].sort((a, b) => a.localeCompare(b)),
    [allFiles]
  )

  const filteredFiles = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return allFiles
      .filter((file) => {
        if (categoryFilter !== "All categories" && file.categoryName !== categoryFilter) return false
        if (typeFilter !== "All types" && file.type.toLowerCase() !== typeFilter.toLowerCase()) return false
        if (uploaderFilter !== "All uploaders" && file.uploadedBy !== uploaderFilter) return false
        if (visibilityFilter !== "All" && file.visibility !== visibilityFilter) return false
        if (activeTags.length > 0 && !activeTags.every((tag) => file.tags.includes(tag))) return false

        if (!normalizedQuery) return true

        const searchText = [
          file.name,
          file.meeting,
          file.uploadedBy,
          file.categoryName,
          file.visibility,
          ...file.tags,
        ]
          .join(" ")
          .toLowerCase()

        return searchText.includes(normalizedQuery)
      })
      .sort((a, b) => {
        if (sortMode === "name") return a.name.localeCompare(b.name)
        if (sortMode === "largest") return b.size - a.size
        if (sortMode === "oldest") {
          return new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime()
        }

        return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      })
  }, [activeTags, allFiles, categoryFilter, query, sortMode, typeFilter, uploaderFilter, visibilityFilter])

  const groupedFiles = React.useMemo(() => {
    return fileCategories
      .map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description,
        files: filteredFiles.filter((file) => file.categoryId === category.id),
      }))
      .filter((category) => category.files.length > 0)
  }, [filteredFiles])

  const archiveSize = allFiles.reduce((total, file) => total + file.size, 0)
  const publicCount = allFiles.filter((file) => file.visibility === "Public").length
  const pinnedCount = allFiles.filter((file) => file.pinned).length
  const activeFilterCount =
    (query.trim() ? 1 : 0) +
    (categoryFilter !== "All categories" ? 1 : 0) +
    (typeFilter !== "All types" ? 1 : 0) +
    (uploaderFilter !== "All uploaders" ? 1 : 0) +
    (visibilityFilter !== "All" ? 1 : 0) +
    activeTags.length

  const toggleTag = (tag: string) => {
    setActiveTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]
    )
  }

  const clearFilters = () => {
    setQuery("")
    setCategoryFilter("All categories")
    setTypeFilter("All types")
    setUploaderFilter("All uploaders")
    setVisibilityFilter("All")
    setSortMode("newest")
    setActiveTags([])
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(122deg,rgba(10,10,10,0.98),rgba(18,24,44,0.97),rgba(8,12,22,0.98))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_24%,rgba(56,189,248,0.24),transparent_44%),radial-gradient(circle_at_84%_18%,rgba(99,102,241,0.24),transparent_45%),radial-gradient(circle_at_50%_84%,rgba(16,185,129,0.14),transparent_40%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:30px_30px]" />

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
              A searchable archive of notes, slides, resources, and assets uploaded after meetings, workshops, and events.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-300">Total Files</p>
              <p className="mt-1 text-3xl font-extrabold text-white">{allFiles.length}</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-300">Archive Size</p>
              <p className="mt-1 text-3xl font-extrabold text-white">{formatBytes(archiveSize)}</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-300">Public Docs</p>
              <p className="mt-1 text-3xl font-extrabold text-white">{publicCount}</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-300">Pinned Items</p>
              <p className="mt-1 text-3xl font-extrabold text-white">{pinnedCount}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Section className="flex-grow bg-[color:var(--muted)]/25">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="sticky top-20 z-20 mb-8 rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)]/92 p-5 shadow-xl backdrop-blur">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <div className="relative min-w-[220px] flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by file name, meeting, uploader, tags"
                  className="h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] pl-10 pr-3 text-sm outline-none transition focus:border-[color:var(--primary)]"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm outline-none transition focus:border-[color:var(--primary)]"
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
                className="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm uppercase outline-none transition focus:border-[color:var(--primary)]"
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
                className="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm outline-none transition focus:border-[color:var(--primary)]"
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
                onChange={(event) => setVisibilityFilter(event.target.value as "All" | ArchiveFile["visibility"])}
                className="h-10 rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-xs font-semibold uppercase tracking-[0.12em] outline-none transition focus:border-[color:var(--primary)]"
              >
                <option value="All">All visibility</option>
                <option value="Public">Public</option>
                <option value="Members">Members</option>
              </select>

              <select
                value={sortMode}
                onChange={(event) => setSortMode(event.target.value as SortMode)}
                className="h-10 rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-xs font-semibold uppercase tracking-[0.12em] outline-none transition focus:border-[color:var(--primary)]"
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

            <div className="mt-4 border-t border-[color:var(--border)] pt-4">
              <p className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[color:var(--muted-foreground)]">
                <Tag className="h-3.5 w-3.5" />
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => {
                  const active = activeTags.includes(tag)
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                        active
                          ? "border-[color:var(--primary)] bg-[color:var(--primary)]/15 text-[color:var(--primary)]"
                          : "border-[color:var(--border)] bg-[color:var(--background)] text-[color:var(--muted-foreground)] hover:border-[color:var(--primary)]"
                      )}
                    >
                      #{tag}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">Archive Explorer</h2>
              <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">Showing {filteredFiles.length} of {allFiles.length} files</p>
            </div>
          </div>

          {groupedFiles.length === 0 ? (
            <div className="glass rounded-3xl border-dashed p-10 text-center">
              <p className="text-xl font-bold">No files found for this search.</p>
              <p className="mt-2 text-[color:var(--muted-foreground)]">Try removing one or more filters or using broader keywords.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 inline-flex h-10 items-center justify-center rounded-full border border-[color:var(--primary)] bg-[color:var(--primary)]/10 px-5 text-sm font-bold text-[color:var(--primary)]"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {groupedFiles.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)] shadow-lg"
                >
                  <div className="flex flex-wrap items-center gap-3 border-b border-[color:var(--border)] bg-[color:var(--background)]/60 px-5 py-4">
                    <Folder className="h-5 w-5 text-[color:var(--primary)]" />
                    <h3 className="text-xl font-bold">{category.name}</h3>
                    <span className="rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-2.5 py-1 text-xs font-semibold text-[color:var(--muted-foreground)]">
                      {category.files.length} files
                    </span>
                    <p className="w-full text-sm text-[color:var(--muted-foreground)]">{category.description}</p>
                  </div>

                  <ul className="divide-y divide-[color:var(--border)]">
                    {category.files.map((file) => (
                      <li key={file.id} className="px-5 py-4 transition hover:bg-[color:var(--muted)]/30">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                              {getFileIcon(file.type)}
                              <h4 className="truncate text-base font-bold">{file.name}</h4>
                              {file.pinned && (
                                <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/30 bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-amber-300">
                                  <Sparkles className="h-3 w-3" />
                                  Pinned
                                </span>
                              )}
                            </div>

                            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[color:var(--muted-foreground)]">
                              <span className="inline-flex items-center gap-1 rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-2 py-1 uppercase">
                                {file.type}
                              </span>
                              <span className="inline-flex items-center gap-1 rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-2 py-1">
                                <CalendarClock className="h-3.5 w-3.5" />
                                {new Date(file.uploadedAt).toLocaleDateString()}
                              </span>
                              <span className="inline-flex items-center gap-1 rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-2 py-1">
                                <UserRound className="h-3.5 w-3.5" />
                                {file.uploadedBy}
                              </span>
                              <span className="inline-flex items-center gap-1 rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-2 py-1">
                                {file.visibility === "Public" ? (
                                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                                ) : (
                                  <ShieldEllipsis className="h-3.5 w-3.5 text-amber-300" />
                                )}
                                {file.visibility}
                              </span>
                              <span className="inline-flex items-center rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-2 py-1">
                                {formatBytes(file.size)}
                              </span>
                            </div>

                            <p className="mt-2 text-xs text-[color:var(--muted-foreground)]">Meeting: {file.meeting}</p>

                            <div className="mt-2 flex flex-wrap gap-2">
                              {file.tags.map((tag) => (
                                <button
                                  key={tag}
                                  type="button"
                                  onClick={() => toggleTag(tag)}
                                  className={cn(
                                    "rounded-full border px-2.5 py-1 text-[11px] font-semibold transition",
                                    activeTags.includes(tag)
                                      ? "border-[color:var(--primary)] bg-[color:var(--primary)]/15 text-[color:var(--primary)]"
                                      : "border-[color:var(--border)] bg-[color:var(--background)] text-[color:var(--muted-foreground)] hover:border-[color:var(--primary)]"
                                  )}
                                >
                                  #{tag}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex shrink-0 items-center gap-2">
                            <a
                              href={file.url}
                              download
                              className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[color:var(--primary)] bg-[color:var(--primary)]/10 px-4 text-xs font-bold uppercase tracking-[0.12em] text-[color:var(--primary)] transition hover:bg-[color:var(--primary)] hover:text-[color:var(--primary-foreground)]"
                              title="Download file"
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
      </Section>
    </div>
  )
}
