"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Section } from "@/components/Section"
import { upcomingEvents } from "@/lib/data"
import { format } from "date-fns"
import { Calendar, MapPin, ExternalLink } from "lucide-react"

export default function EventsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-primary)_0%,transparent_50%)] opacity-10 blur-[100px]" />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-6"
          >
            Upcoming <span className="text-gradient">Events</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[color:var(--muted-foreground)] max-w-3xl mx-auto leading-relaxed"
          >
            Join us for workshops, guest speakers, and hackathons. All Adelphi students are welcome.
          </motion.p>
        </div>
      </section>

      <Section className="bg-[color:var(--muted)]/30">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="space-y-8">
            {upcomingEvents.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-8 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-[color:var(--primary)] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 group-hover:opacity-20 transition-opacity" />
                
                <div className="md:w-1/3 flex flex-col justify-center border-r border-[color:var(--border)] pr-8">
                  {event.type && (
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--primary)] mb-4">
                      {event.type}
                    </div>
                  )}
                  <div className="text-5xl font-black text-[color:var(--primary)] mb-2">
                    {format(event.date, "dd")}
                  </div>
                  <div className="text-xl font-bold uppercase tracking-wider text-[color:var(--muted-foreground)]">
                    {format(event.date, "MMM yyyy")}
                  </div>
                  <div className="text-sm font-medium mt-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {event.time || format(event.date, "h:mm a")}
                  </div>
                </div>

                <div className="md:w-2/3 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
                  <p className="text-lg text-[color:var(--muted-foreground)] mb-6 leading-relaxed">
                    {event.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 mt-auto">
                    <div className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full bg-[color:var(--muted)]">
                      <MapPin className="w-4 h-4 text-[color:var(--primary)]" />
                      {event.location}
                    </div>
                    {/* {event.link && (
                      <a 
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-bold px-6 py-2 rounded-full bg-[color:var(--primary)] text-[color:var(--primary-foreground)] hover:opacity-90 transition-opacity"
                      >
                        RSVP <ExternalLink className="w-4 h-4" />
                      </a>
                    )} */}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}
