"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Section } from "@/components/Section"
import { Project, projects } from "@/lib/data"
import { cn } from "@/lib/utils"
import {
  CalendarClock,
  Code,
  ExternalLink,
  FileCode2,
  FunnelX,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Tag,
  UserRound,
} from "lucide-react"

type SortMode = "featured" | "recent" | "title"

const statusStyles: Record<Project["status"], string> = {
  Planning: "bg-amber-500/15 text-amber-300 border-amber-400/30",
  Research: "bg-cyan-500/15 text-cyan-300 border-cyan-400/30",
  "In Progress": "bg-indigo-500/15 text-indigo-300 border-indigo-400/30",
  Launched: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
}

const difficultyStyles: Record<Project["difficulty"], string> = {
  Beginner: "text-emerald-400",
  Intermediate: "text-amber-300",
  Advanced: "text-rose-300",
}

export default function ProjectsPage() {
  const [query, setQuery] = React.useState("")
  const [activeCreator, setActiveCreator] = React.useState("All creators")
  const [activeStatus, setActiveStatus] = React.useState<"All" | Project["status"]>("All")
  const [activeDifficulty, setActiveDifficulty] = React.useState<"All" | Project["difficulty"]>("All")
  const [sortMode, setSortMode] = React.useState<SortMode>("featured")
  const [featuredOnly, setFeaturedOnly] = React.useState(false)
  const [activeTech, setActiveTech] = React.useState<string[]>([])

  const creators = React.useMemo(
    () => ["All creators", ...new Set(projects.flatMap((project) => project.creators))],
    []
  )
  const technologies = React.useMemo(
    () => [...new Set(projects.flatMap((project) => project.techStack))].sort((a, b) => a.localeCompare(b)),
    []
  )

  const filteredProjects = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return projects
      .filter((project) => {
        if (featuredOnly && !project.featured) return false
        if (activeCreator !== "All creators" && !project.creators.includes(activeCreator)) return false
        if (activeStatus !== "All" && project.status !== activeStatus) return false
        if (activeDifficulty !== "All" && project.difficulty !== activeDifficulty) return false
        if (activeTech.length > 0 && !activeTech.every((tech) => project.techStack.includes(tech))) return false

        if (!normalizedQuery) return true

        const searchText = [
          project.title,
          project.description,
          project.impact,
          project.semester,
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
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        }

        if (a.featured !== b.featured) {
          return a.featured ? -1 : 1
        }

        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      })
  }, [activeCreator, activeDifficulty, activeStatus, activeTech, featuredOnly, query, sortMode])

  const activeFilterCount =
    (activeCreator !== "All creators" ? 1 : 0) +
    (activeStatus !== "All" ? 1 : 0) +
    (activeDifficulty !== "All" ? 1 : 0) +
    (featuredOnly ? 1 : 0) +
    activeTech.length +
    (query.trim() ? 1 : 0)

  const featuredCount = projects.filter((project) => project.featured).length

  const toggleTech = (tech: string) => {
    setActiveTech((current) =>
      current.includes(tech) ? current.filter((item) => item !== tech) : [...current, tech]
    )
  }

  const clearFilters = () => {
    setQuery("")
    setActiveCreator("All creators")
    setActiveStatus("All")
    setActiveDifficulty("All")
    setSortMode("featured")
    setFeaturedOnly(false)
    setActiveTech([])
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(10,10,10,0.96),rgba(18,18,34,0.96),rgba(8,8,14,0.96))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(56,189,248,0.20),transparent_45%),radial-gradient(circle_at_82%_18%,rgba(129,140,248,0.20),transparent_42%),radial-gradient(circle_at_48%_85%,rgba(16,185,129,0.12),transparent_40%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:32px_32px]" />

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/90 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Project Forge
            </span>
            <h1 className="mt-6 text-5xl font-black tracking-tight text-white md:text-7xl">
              Build Fast. Learn Loud. <span className="text-cyan-200">Ship Together.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-200/85 md:text-xl">
              Explore what our creators are making across research, apps, and campus tools. Filter by people,
              technologies, and project maturity to discover your next collaboration.
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
              <p className="mt-1 text-3xl font-extrabold text-white">{creators.length - 1}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Section className="bg-[color:var(--muted)]/25">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="sticky top-20 z-20 mb-8 rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)]/90 p-5 shadow-xl backdrop-blur">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <div className="relative min-w-[220px] flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search projects, creators, tags, or impact"
                  className="h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] pl-10 pr-3 text-sm outline-none transition focus:border-[color:var(--primary)]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={activeCreator}
                  onChange={(event) => setActiveCreator(event.target.value)}
                  className="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm outline-none transition focus:border-[color:var(--primary)]"
                >
                  {creators.map((creator) => (
                    <option key={creator} value={creator}>
                      {creator}
                    </option>
                  ))}
                </select>

                <select
                  value={activeStatus}
                  onChange={(event) => setActiveStatus(event.target.value as "All" | Project["status"])}
                  className="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm outline-none transition focus:border-[color:var(--primary)]"
                >
                  <option value="All">All statuses</option>
                  <option value="Planning">Planning</option>
                  <option value="Research">Research</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Launched">Launched</option>
                </select>

                <select
                  value={activeDifficulty}
                  onChange={(event) => setActiveDifficulty(event.target.value as "All" | Project["difficulty"])}
                  className="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm outline-none transition focus:border-[color:var(--primary)]"
                >
                  <option value="All">All levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>

                <select
                  value={sortMode}
                  onChange={(event) => setSortMode(event.target.value as SortMode)}
                  className="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-sm outline-none transition focus:border-[color:var(--primary)]"
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

          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">Project Explorer</h2>
              <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">
                Showing {filteredProjects.length} of {projects.length} projects
              </p>
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="glass rounded-3xl border-dashed p-10 text-center">
              <p className="text-xl font-bold">No projects match your filters.</p>
              <p className="mt-2 text-[color:var(--muted-foreground)]">
                Try removing one or two filters to broaden the results.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 inline-flex h-10 items-center justify-center rounded-full border border-[color:var(--primary)] bg-[color:var(--primary)]/10 px-5 text-sm font-bold text-[color:var(--primary)]"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)] shadow-lg transition hover:-translate-y-1 hover:border-[color:var(--primary)]"
              >
                <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-[color:var(--border)] bg-[linear-gradient(135deg,rgba(99,102,241,0.07),rgba(6,182,212,0.08),rgba(16,185,129,0.08))]">
                  <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 [background:radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.2),transparent_40%)]" />
                  <FileCode2 className="h-16 w-16 text-[color:var(--muted-foreground)] transition duration-500 group-hover:scale-110 group-hover:text-[color:var(--primary)]" />

                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className={cn("rounded-full border px-2.5 py-1 text-xs font-bold", statusStyles[project.status])}>
                      {project.status}
                    </span>
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/30 bg-amber-500/15 px-2.5 py-1 text-xs font-bold text-amber-300">
                        <Star className="h-3 w-3" />
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-grow flex-col p-6">
                  <h2 className="mb-3 text-2xl font-bold leading-tight">{project.title}</h2>
                  <p className="mb-4 line-clamp-3 text-[color:var(--muted-foreground)] leading-relaxed">
                    {project.description}
                  </p>

                  <p className="mb-5 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)]/60 p-3 text-sm text-[color:var(--muted-foreground)]">
                    {project.impact}
                  </p>

                  <div className="mb-4 flex items-center gap-2 text-xs text-[color:var(--muted-foreground)]">
                    <CalendarClock className="h-3.5 w-3.5" />
                    Updated {new Date(project.lastUpdated).toLocaleDateString()} • {project.semester}
                  </div>

                  <div className="mb-4 flex items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-2.5 py-1 font-semibold">
                      <Sparkles className="h-3.5 w-3.5" />
                      {project.difficulty}
                    </span>
                    <span className={cn("font-semibold", difficultyStyles[project.difficulty])}>{project.difficulty} track</span>
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

                  <div className="mb-6 flex flex-wrap items-center gap-2">
                    <UserRound className="h-3.5 w-3.5 text-[color:var(--muted-foreground)]" />
                    {project.creators.map((creator) => (
                      <button
                        key={creator}
                        type="button"
                        onClick={() => setActiveCreator(creator)}
                        className="rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-2.5 py-1 text-xs font-semibold transition hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
                      >
                        {creator}
                      </button>
                    ))}
                  </div>
                  
                  <div className="mb-8 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => toggleTech(tech)}
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
                        className="ml-auto flex items-center gap-2 text-sm font-bold transition-colors hover:text-[color:var(--primary)]"
                      >
                        Live Demo <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            </div>
          )}
        </div>
      </Section>
    </div>
  )
}
