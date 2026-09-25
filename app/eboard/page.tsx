"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { Section } from "@/components/Section"
import { eboardMembers } from "@/lib/data"
import { ExternalLink, Globe, Instagram, Linkedin } from "lucide-react"

type MemberHandle = {
  label: string
  handle?: string
  url: string
}

type EboardMember = (typeof eboardMembers)[number]

function getMemberHandles(member: EboardMember): MemberHandle[] {
  if (!member.handles || !Array.isArray(member.handles)) return []
  return member.handles.filter((link) => Boolean(link.url && link.url.trim() !== "" && link.url !== "#"))
}

function renderHandleIcon(label: string, url: string) {
  const l = label.toLowerCase()
  const u = url.toLowerCase()
  if (l.includes("linkedin") || u.includes("linkedin.com")) {
    return <Linkedin className="w-4 h-4 shrink-0 text-[#0a66c2]" />
  }
  if (l.includes("instagram") || u.includes("instagram.com")) {
    return <Instagram className="w-4 h-4 shrink-0 text-pink-500" />
  }
  return <Globe className="w-4 h-4 shrink-0 text-[color:var(--primary)]" />
}

export default function EboardPage() {
  const sortedMembers = React.useMemo(
    () => [...eboardMembers].sort((a, b) => a.order - b.order) as EboardMember[],
    []
  )

  const [selectedId, setSelectedId] = React.useState(sortedMembers[0]?.id ?? "")

  const selectedMember =
    sortedMembers.find((member) => member.id === selectedId) ?? sortedMembers[0]

  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-24 md:py-32 relative overflow-hidden border-b border-[color:var(--border)]/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.35)_0%,transparent_55%)] opacity-40 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.28)_0%,transparent_58%)]" />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-6"
          >
            Executive <span className="text-gradient">Board</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[color:var(--muted-foreground)] max-w-3xl mx-auto leading-relaxed"
          >
            Meet the passionate students leading the AI Society. Dedicated to  a vibrant community and advancing AI initiatives on campus.
          </motion.p>
        </div>
      </section>

      <Section className="bg-[color:var(--muted)]/30">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 lg:gap-10 items-start">
            <motion.aside
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-4 md:p-5"
            >
              <h2 className="text-lg font-bold mb-4">Members</h2>
              <div className="space-y-3">
                {sortedMembers.map((member) => {
                  const active = selectedMember?.id === member.id

                  return (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => setSelectedId(member.id)}
                      className={`w-full cursor-pointer rounded-2xl border p-4 text-left transition-all duration-200 ${
                        active
                          ? "border-[color:var(--primary)] bg-[color:var(--primary)]/12 shadow-sm"
                          : "border-[color:var(--border)] hover:border-[color:var(--primary)]/50 hover:bg-[color:var(--muted)]/60"
                      }`}
                    >
                      <div className="font-bold leading-tight truncate">{member.name}</div>
                      <div className="text-xs uppercase tracking-wider text-[color:var(--primary)] truncate mt-1">
                        {member.role}
                      </div>
                    </button>
                  )
                })}
              </div>
            </motion.aside>

            <AnimatePresence mode="wait">
              {selectedMember && (
                <motion.article
                  key={selectedMember.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden"
                >
                  <div className="flex flex-col">
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[color:var(--primary)]/10 text-[color:var(--primary)] border border-[color:var(--primary)]/20 w-fit mb-3">
                      {selectedMember.role}
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black tracking-tight mb-4">{selectedMember.name}</h3>
                    <p className="text-[color:var(--muted-foreground)] leading-relaxed text-base md:text-lg mb-8 max-w-3xl">
                      {selectedMember.bio}
                    </p>

                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-[color:var(--primary)] mb-3">
                        Profiles &amp; Links
                      </h4>

                        {(() => {
                          const memberHandles = getMemberHandles(selectedMember)
                          if (memberHandles.length === 0) {
                            return (
                              <div className="rounded-2xl border border-dashed border-[color:var(--border)] p-5 text-sm text-[color:var(--muted-foreground)] bg-[color:var(--muted)]/20">
                                Professional profiles and social links are being collected.
                              </div>
                            )
                          }

                          return (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {memberHandles.map((link) => (
                                <a
                                  key={`${selectedMember.id}-${link.url}-${link.label}`}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="cursor-pointer rounded-2xl border border-[color:var(--border)] bg-[color:var(--muted)]/45 px-4 py-3 hover:border-[color:var(--primary)]/70 hover:bg-[color:var(--primary)]/10 transition-colors group/link"
                                >
                                  <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2 min-w-0">
                                      {renderHandleIcon(link.label, link.url)}
                                      <span className="font-semibold text-sm truncate">{link.label}</span>
                                    </div>
                                    <ExternalLink className="w-4 h-4 opacity-70 group-hover/link:opacity-100 shrink-0 transition-opacity" />
                                  </div>
                                  {link.handle ? (
                                    <p className="text-xs text-[color:var(--muted-foreground)] mt-1 truncate font-mono">
                                      {link.handle}
                                    </p>
                                  ) : null}
                                </a>
                              ))}
                            </div>
                          )
                        })()}
                      </div>
                    </div>
                  </motion.article>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Section>
    </div>
  )
}
