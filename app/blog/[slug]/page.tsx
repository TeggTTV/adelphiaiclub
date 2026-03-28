import * as React from "react"
import { notFound } from "next/navigation"
import { blogPosts } from "@/lib/data"
import { format } from "date-fns"
import { Calendar, User, ArrowLeft } from "lucide-react"
import Link from "next/link"

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-primary)_0%,transparent_50%)] opacity-10 blur-[100px]" />
        <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[color:var(--muted-foreground)] hover:text-[color:var(--primary)] transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          
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
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-8 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap gap-2 mb-12">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-[color:var(--muted)] text-[color:var(--primary)]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--muted)]/30 py-16 flex-grow">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="glass rounded-3xl p-8 md:p-12 prose prose-invert max-w-none">
            {/* In a real app, you'd use a markdown renderer here */}
            {post.content.split('\n').map((paragraph, i) => (
              <p key={i} className="text-lg text-[color:var(--muted-foreground)] leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
