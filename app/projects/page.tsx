"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import {
  CalendarClock,
  Code,
  ExternalLink,
  FunnelX,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Tag,
  UserRound,
} from "lucide-react"
import PreviewModal from "@/components/PreviewModal"

type SortMode = "featured" | "recent" | "title"

type Project = {
  id: string
  title: string
  description: string
  techStack: string[]
  tags: string[]
  creators: string[]
  contactEmail?: string | null
  status: "PENDING" | "APPROVED" | "REJECTED"
  projectState: "Planning" | "Research" | "In Progress" | "Launched" | string
  difficulty: "Beginner" | "Intermediate" | "Advanced" | string
  featured: boolean
  githubUrl?: string | null
  liveUrl?: string | null
  imageUrl?: string | null
  updatedAt: string
  semester?: string | null
  impact?: string | null
}

const projectStateStyles: Record<string, string> = {
  Planning: "bg-amber-500/15 text-amber-300 border-amber-400/30",
  Research: "bg-cyan-500/15 text-cyan-300 border-cyan-400/30",
  "In Progress": "bg-indigo-500/15 text-indigo-300 border-indigo-400/30",
  Launched: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
}

const difficultyStyles: Record<string, string> = {
  Beginner: "text-emerald-400",
  Intermediate: "text-amber-300",
  Advanced: "text-rose-300",
}

export default function ProjectsPage() {
  const [projects, setProjects] = React.useState<Project[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState("")
  const [previewProject, setPreviewProject] = React.useState<Project | null>(null)

  const [query, setQuery] = React.useState("")
  const [activeCreator, setActiveCreator] = React.useState("All creators")
  const [activeState, setActiveState] = React.useState<"All" | string>("All")
  const [activeDifficulty, setActiveDifficulty] = React.useState<"All" | string>("All")
  const [sortMode, setSortMode] = React.useState<SortMode>("featured")
  const [featuredOnly, setFeaturedOnly] = React.useState(false)
  const [activeTech, setActiveTech] = React.useState<string[]>([])

  React.useEffect(() => {
    fetch("/api/projects", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => setProjects(data.projects || []))
      .catch(() => setError("Unable to load projects"))
      .finally(() => setLoading(false))
  }, [])

  const creators = React.useMemo(
    () => ["All creators", ...new Set(projects.flatMap((project) => project.creators))],
    [projects]
  )

  const technologies = React.useMemo(
    () => [...new Set(projects.flatMap((project) => project.techStack))].sort((a, b) => a.localeCompare(b)),
    [projects]
  )

  const filteredProjects = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return projects
      .filter((project) => {
        if (featuredOnly && !project.featured) return false
        if (activeCreator !== "All creators" && !project.creators.includes(activeCreator)) return false
        if (activeState !== "All" && project.projectState !== activeState) return false
        if (activeDifficulty !== "All" && project.difficulty !== activeDifficulty) return false
        if (activeTech.length > 0 && !activeTech.every((tech) => project.techStack.includes(tech))) return false

        if (!normalizedQuery) return true

        const searchText = [
          project.title,
          project.description,
          project.impact || "",
          project.semester || "",
          ...project.tags,
          ...project.creators,
          ...project.techStack,
        ]
          .join(" ")
          .toLowerCase()

        return searchText.includes(normalizedQuery)
      })
      .sort((a, b) => {
        if (sortMode === "title") {
          return a.title.localeCompare(b.title)
        }

        if (sortMode === "recent") {
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        }

        if (a.featured !== b.featured) {
          return a.featured ? -1 : 1
        }

        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      })
  }, [activeCreator, activeDifficulty, activeState, activeTech, featuredOnly, projects, query, sortMode])

  const activeFilterCount =
    (activeCreator !== "All creators" ? 1 : 0) +
    (activeState !== "All" ? 1 : 0) +
    (activeDifficulty !== "All" ? 1 : 0) +
    (featuredOnly ? 1 : 0) +
    activeTech.length +
    (query.trim() ? 1 : 0)

  const featuredCount = projects.filter((project) => project.featured).length
  const featuredProject = projects.find((p) => p.featured)

  const toggleTech = (tech: string) => {
    setActiveTech((current) =>
      current.includes(tech) ? current.filter((item) => item !== tech) : [...current, tech]
    )
  }

  const clearFilters = () => {
    setQuery("")
    setActiveCreator("All creators")
    setActiveState("All")
    setActiveDifficulty("All")
    setSortMode("featured")
    setFeaturedOnly(false)
    setActiveTech([])
  }

  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(10,10,10,0.96),rgba(18,18,34,0.96),rgba(8,8,14,0.96))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(56,189,248,0.20),transparent_45%),radial-gradient(circle_at_82%_18%,rgba(129,140,248,0.20),transparent_42%),radial-gradient(circle_at_48%_85%,rgba(16,185,129,0.12),transparent_40%)]" />

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/90 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Project Forge
            </span>
            <h1 className="mt-6 text-5xl font-black tracking-tight text-white md:text-7xl">
              Build Fast. Learn Loud. <span className="text-cyan-200">Ship Together.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-200/85 md:text-xl">
              Explore approved builds from AI Society members.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3"
          >
            <div className="rounded-2xl border border-white/15 bg-white/8 px-5 py-4 text-left backdrop-blur">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Total Projects</p>
              <p className="mt-1 text-3xl font-extrabold text-white">{projects.length}</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/8 px-5 py-4 text-left backdrop-blur">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Featured Builds</p>
              <p className="mt-1 text-3xl font-extrabold text-white">{featuredCount}</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/8 px-5 py-4 text-left backdrop-blur">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Active Creators</p>
              <p className="mt-1 text-3xl font-extrabold text-white">{Math.max(0, creators.length - 1)}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {featuredProject && (
        <article className="group relative mb-14 mx-auto max-w-7xl px-4 py-8">
          <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-[color:var(--primary)] via-cyan-500 to-emerald-500 opacity-20 blur transition-opacity duration-500 group-hover:opacity-40" />
          <div className="relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)] p-8 md:p-10">
            <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--primary)] px-3 py-1 font-bold text-[color:var(--primary-foreground)]">
                <Sparkles className="h-3.5 w-3.5" /> Featured
              </span>
              <span className="rounded-full border border-[color:var(--border)] px-3 py-1 text-[color:var(--muted-foreground)]">
                <span className="inline-flex items-center gap-1">
                  <CalendarClock className="h-3.5 w-3.5" />
                  {new Date(featuredProject.updatedAt).toLocaleDateString()}
                </span>
              </span>
            </div>

            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              <Link href={`/projects/${featuredProject.slug}`} className="transition-colors hover:text-[color:var(--primary)]">
                {featuredProject.title}
              </Link>
            </h2>
            <p className="mt-4 max-w-3xl text-[color:var(--muted-foreground)]">{featuredProject.description}</p>
            <Link href={`/projects/${featuredProject.slug}`} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[color:var(--primary)] px-5 py-2.5 text-sm font-bold text-[color:var(--primary-foreground)]">
              View Project
            </Link>
            {featuredProject.contactEmail && (
              <p className="mt-3 text-sm text-[color:var(--muted-foreground)]">Contact: <a href={`mailto:${featuredProject.contactEmail}`} className="font-semibold text-[color:var(--primary)]">{featuredProject.contactEmail}</a></p>
            )}
          </div>
        </article>
      )}

      <section className="bg-[color:var(--muted)]/25 py-16">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">Project Explorer</h2>
            <Link
              href="/projects/submit"
              className="inline-flex h-10 items-center rounded-full bg-[color:var(--primary)] px-5 text-sm font-bold text-[color:var(--primary-foreground)]"
            >
              Submit Project
            </Link>
          </div>

          <div className="mb-8 rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)]/90 p-5 shadow-xl backdrop-blur">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <div className="relative min-w-[220px] flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search projects, creators, or tags"
                  className="h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] pl-10 pr-3 text-sm outline-none transition focus:border-[color:var(--primary)]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={activeCreator}
                  onChange={(event) => setActiveCreator(event.target.value)}
                  className="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm"
                >
                  {creators.map((creator) => (
                    <option key={creator} value={creator}>
                      {creator}
                    </option>
                  ))}
                </select>

                <select
                  value={activeState}
                  onChange={(event) => setActiveState(event.target.value)}
                  className="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm"
                >
                  <option value="All">All states</option>
                  <option value="Planning">Planning</option>
                  <option value="Research">Research</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Launched">Launched</option>
                </select>

                <select
                  value={activeDifficulty}
                  onChange={(event) => setActiveDifficulty(event.target.value)}
                  className="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm"
                >
                  <option value="All">All levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>

                <select
                  value={sortMode}
                  onChange={(event) => setSortMode(event.target.value as SortMode)}
                  className="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm"
                >
                  <option value="featured">Sort: Featured first</option>
                  <option value="recent">Sort: Most recent</option>
                  <option value="title">Sort: Title A-Z</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setFeaturedOnly((value) => !value)}
                className={cn(
                  "inline-flex h-9 items-center gap-2 rounded-full border px-3 text-xs font-semibold transition",
                  featuredOnly
                    ? "border-[color:var(--primary)] bg-[color:var(--primary)]/15 text-[color:var(--primary)]"
                    : "border-[color:var(--border)] bg-[color:var(--background)]"
                )}
              >
                <Star className="h-3.5 w-3.5" />
                Featured only
              </button>

              <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-3 py-1.5 text-xs text-[color:var(--muted-foreground)]">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                {activeFilterCount} active filters
              </div>

              <button
                type="button"
                onClick={clearFilters}
                className="ml-auto inline-flex h-9 items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-xs font-semibold transition hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
              >
                <FunnelX className="h-3.5 w-3.5" />
                Clear filters
              </button>
            </div>

            <div className="mt-4 border-t border-[color:var(--border)] pt-4">
              <p className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[color:var(--muted-foreground)]">
                <Tag className="h-3.5 w-3.5" />
                Filter by technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => {
                  const active = activeTech.includes(tech)

                  return (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => toggleTech(tech)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                        active
                          ? "border-[color:var(--primary)] bg-[color:var(--primary)]/15 text-[color:var(--primary)]"
                          : "border-[color:var(--border)] bg-[color:var(--background)] text-[color:var(--muted-foreground)] hover:border-[color:var(--primary)]"
                      )}
                    >
                      {tech}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {loading && <p className="text-[color:var(--muted-foreground)]">Loading projects...</p>}
          {error && <p className="mb-4 text-red-400">{error}</p>}

          {filteredProjects.length === 0 && !loading ? (
            <div className="glass rounded-3xl border-dashed p-10 text-center">
              <p className="text-xl font-bold">No projects match your filters.</p>
              <p className="mt-2 text-[color:var(--muted-foreground)]">Try removing one or two filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setPreviewProject(project)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setPreviewProject(project)
                  }}
                  className="cursor-pointer group flex h-full flex-col overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)] shadow-lg transition hover:-translate-y-1 hover:border-[color:var(--primary)]"
                >
                  <div className="relative flex h-40 items-center justify-center overflow-hidden border-b border-[color:var(--border)] bg-[linear-gradient(135deg,rgba(99,102,241,0.07),rgba(6,182,212,0.08),rgba(16,185,129,0.08))]">
                    <div className="absolute left-4 top-4 flex items-center gap-2">
                      <span
                        className={cn(
                          "rounded-full border px-2.5 py-1 text-xs font-bold",
                          projectStateStyles[project.projectState] || "bg-slate-500/15 text-slate-300 border-slate-400/30"
                        )}
                      >
                        {project.projectState}
                      </span>
                      {project.featured && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/30 bg-amber-500/15 px-2.5 py-1 text-xs font-bold text-amber-300">
                          <Star className="h-3 w-3" /> Featured
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-grow flex-col p-6">
                    <h2 className="mb-3 text-2xl font-bold leading-tight">{project.title}</h2>
                    <p className="mb-4 line-clamp-3 text-[color:var(--muted-foreground)] leading-relaxed">{project.description}</p>

                    <p className="mb-4 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)]/60 p-3 text-sm text-[color:var(--muted-foreground)]">
                      {project.impact || "No impact note yet."}
                    </p>

                    <div className="mb-4 flex items-center gap-2 text-xs text-[color:var(--muted-foreground)]">
                      <CalendarClock className="h-3.5 w-3.5" />
                      Updated {new Date(project.updatedAt).toLocaleDateString()}
                    </div>

                    <div className="mb-4 flex items-center gap-2 text-xs">
                      <span className="inline-flex items-center gap-1 rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-2.5 py-1 font-semibold">
                        <Sparkles className="h-3.5 w-3.5" />
                        {project.difficulty}
                      </span>
                    </div>

                    <div className="mb-5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-2.5 py-1 text-xs font-medium text-[color:var(--muted-foreground)]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="mb-5 flex flex-wrap items-center gap-2">
                      <UserRound className="h-3.5 w-3.5 text-[color:var(--muted-foreground)]" />
                      {project.creators.map((creator) => (
                        <button
                          key={creator}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveCreator(creator)
                          }}
                          className="rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-2.5 py-1 text-xs font-semibold transition hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
                        >
                          {creator}
                        </button>
                      ))}
                    </div>

                    {project.contactEmail && (
                      <div className="mb-4 text-sm text-[color:var(--muted-foreground)]">
                        Contact: <a href={`mailto:${project.contactEmail}`} className="font-semibold text-[color:var(--primary)]">{project.contactEmail}</a>
                      </div>
                    )}

                    <div className="mb-6 flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <button
                          key={tech}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleTech(tech)
                          }}
                          className={cn(
                            "rounded-full border px-3 py-1 text-xs font-semibold transition",
                            activeTech.includes(tech)
                              ? "border-[color:var(--primary)] bg-[color:var(--primary)]/15 text-[color:var(--primary)]"
                              : "border-[color:var(--border)] bg-[color:var(--background)] text-[color:var(--primary)]"
                          )}
                        >
                          {tech}
                        </button>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center gap-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 text-sm font-bold transition-colors hover:text-[color:var(--primary)]"
                        >
                          <Code className="h-4 w-4" /> Source Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="ml-auto flex items-center gap-2 text-sm font-bold transition-colors hover:text-[color:var(--primary)]"
                        >
                          Live Demo <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {previewProject && (
                <PreviewModal
                  title={previewProject.title}
                  subtitle={previewProject.creators?.join(', ')}
                  onClose={() => setPreviewProject(null)}
                >
                  <div className="space-y-4">
                    {previewProject.imageUrl && (
                      <img src={previewProject.imageUrl} alt={previewProject.title} className="w-full rounded-md object-cover" />
                    )}
                    <p className="text-sm text-[color:var(--muted-foreground)]">{previewProject.description}</p>
                    {previewProject.impact && (
                      <div className="rounded-lg border border-[color:var(--border)] bg-[color:var(--background)] p-3 text-sm">{previewProject.impact}</div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {previewProject.techStack.map((t) => (
                        <span key={t} className="rounded-full bg-[color:var(--background)]/60 px-3 py-1 text-xs font-semibold">{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      {previewProject.githubUrl && (
                        <a href={previewProject.githubUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] px-4 py-2 text-sm font-semibold">Source</a>
                      )}
                      {previewProject.liveUrl && (
                        <a href={previewProject.liveUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] px-4 py-2 text-sm font-semibold">Live Demo</a>
                      )}
                      {previewProject.contactEmail && (
                        <a className="ml-auto text-sm font-semibold text-[color:var(--primary)]" href={`mailto:${previewProject.contactEmail}`} onClick={(e) => e.stopPropagation()}>{previewProject.contactEmail}</a>
                      )}
                    </div>
                  </div>
                </PreviewModal>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
