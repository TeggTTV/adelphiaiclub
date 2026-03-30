"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { Section } from "@/components/Section"
import { eboardMembers } from "@/lib/data"
import { ExternalLink, Globe, Instagram } from "lucide-react"

function isInstagramUrl(url: string) {
  return url.includes("instagram.com")
}

function getHandleFromUrl(url: string) {
  try {
    const parsed = new URL(url)
    const path = parsed.pathname.replaceAll("/", "").trim()
    return path ? `@${path}` : parsed.hostname
  } catch {
    return url
  }
}

type MemberHandle = {
  label: string
  handle: string
  url: string
}

type EboardMember = (typeof eboardMembers)[number] & {
  handles?: MemberHandle[]
}

function getMemberHandles(member: EboardMember) {
  if (member.handles && member.handles.length > 0) return member.handles
  if (!member.instagram) return []

  return [
    {
      label: isInstagramUrl(member.instagram) ? "Instagram" : "Website",
      handle: getHandleFromUrl(member.instagram),
      url: member.instagram,
    },
  ]
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
                      className={`w-full cursor-pointer rounded-2xl border p-3 text-left transition-all duration-200 ${
                        active
                          ? "border-[color:var(--primary)] bg-[color:var(--primary)]/12"
                          : "border-[color:var(--border)] hover:border-[color:var(--primary)]/50 hover:bg-[color:var(--muted)]/60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-[color:var(--border)]">
                          <Image
                            src={member.imageUrl ?? "/images/eboard/cindy.svg"}
                            alt={`${member.name} profile photo`}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold leading-tight truncate">{member.name}</div>
                          <div className="text-xs uppercase tracking-wider text-[color:var(--primary)] truncate">{member.role}</div>
                        </div>
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
                  className="glass rounded-3xl overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] min-h-[420px]">
                    <div className="relative min-h-[320px] md:min-h-full bg-[color:var(--muted)]/40">
                      <Image
                        src={selectedMember.imageUrl ?? "/images/eboard/cindy.svg"}
                        alt={`${selectedMember.name} portrait`}
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-black/45 backdrop-blur-sm border border-white/10 px-4 py-3">
                        <p className="text-xs uppercase tracking-wider text-indigo-200">Current Role</p>
                        <p className="font-bold text-white">{selectedMember.role}</p>
                      </div>
                    </div>

                    <div className="p-6 md:p-8 flex flex-col">
                      <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-3">{selectedMember.name}</h3>
                      <p className="text-[color:var(--muted-foreground)] leading-relaxed text-base md:text-lg mb-8">
                        {selectedMember.bio}
                      </p>

                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-[color:var(--primary)] mb-3">
                          Handles
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {getMemberHandles(selectedMember).map((link) => (
                            <a
                              key={`${selectedMember.id}-${link.url}`}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="cursor-pointer rounded-xl border border-[color:var(--border)] bg-[color:var(--muted)]/45 px-4 py-3 hover:border-[color:var(--primary)]/70 hover:bg-[color:var(--primary)]/10 transition-colors"
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2 min-w-0">
                                  {isInstagramUrl(link.url) ? (
                                    <Instagram className="w-4 h-4 shrink-0" />
                                  ) : (
                                    <Globe className="w-4 h-4 shrink-0" />
                                  )}
                                  <span className="font-semibold text-sm truncate">{link.label}</span>
                                </div>
                                <ExternalLink className="w-4 h-4 opacity-70 shrink-0" />
                              </div>
                              <p className="text-xs text-[color:var(--muted-foreground)] mt-1 truncate">{link.handle}</p>
                            </a>
                          ))}
                        </div>
                      </div>
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
