"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { Section } from "@/components/Section"
import { blogPosts } from "@/lib/data"
import { format } from "date-fns"
import { ArrowRight, Calendar, User } from "lucide-react"

export default function BlogPage() {
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
            The <span className="text-gradient">Blog</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[color:var(--muted-foreground)] max-w-3xl mx-auto leading-relaxed"
          >
            Insights, tutorials, and updates from the Adelphi AI Society.
          </motion.p>
        </div>
      </section>

      <Section className="bg-[color:var(--muted)]/30">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="space-y-8">
            {blogPosts.filter(post => post.published).map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-3xl p-8 md:p-10 group hover:border-[color:var(--primary)] transition-colors relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-[color:var(--primary)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-[color:var(--muted-foreground)] mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[color:var(--primary)]" />
                    {format(post.createdAt, "MMMM d, yyyy")}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[color:var(--primary)]" />
                    {post.author}
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold mb-4 group-hover:text-[color:var(--primary)] transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-lg text-[color:var(--muted-foreground)] mb-8 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-[color:var(--background)] border border-[color:var(--border)] text-[color:var(--primary)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-[color:var(--primary)] font-bold hover:underline underline-offset-4"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}
