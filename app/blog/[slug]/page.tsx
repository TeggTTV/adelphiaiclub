import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, User } from "lucide-react"
import prisma from "@/lib/prisma"
import { SubmissionStatus } from "@prisma/client"
import { SITE_NAME, SITE_URL, createPageMetadata, getCanonicalUrl } from "@/lib/seo"

function buildToc(content: string) {
  const toc: Array<{ id: string; text: string; level: number }> = []
  const regex = /^(#{2,3})\s+(.*)$/gm
  let match: RegExpExecArray | null

  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")

    toc.push({ id, text, level })
  }

  return toc
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params

  const post = await prisma.blogPost.findFirst({
    where: {
      slug,
      status: SubmissionStatus.APPROVED,
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  })

  if (!post) {
    return createPageMetadata({
      title: "Blog Post Not Found",
      description: "The blog post you requested could not be found.",
      path: "/blog",
    })
  }

  const canonical = getCanonicalUrl(`/blog/${post.slug}`)

  return {
    ...createPageMetadata({
      title: post.title,
      description: post.excerpt || "Club blog post",
      path: `/blog/${post.slug}`,
      keywords: post.tags,
    }),
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt || "Club blog post",
      url: canonical,
      siteName: SITE_NAME,
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${post.title} | ${SITE_NAME}`,
        },
      ],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const post = await prisma.blogPost.findFirst({
    where: {
      slug,
      status: SubmissionStatus.APPROVED,
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  })

  if (!post) {
    notFound()
  }

  const toc = buildToc(post.content)

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || "Club blog post",
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/TRANSPARENT%20LOGO.png`,
      },
    },
    mainEntityOfPage: getCanonicalUrl(`/blog/${post.slug}`),
    image: [`${SITE_URL}/og-image.png`],
    keywords: post.tags.join(", "),
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-24 lg:flex-row">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <article className="w-full lg:w-3/4">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--primary)]"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        <div className="mb-8">
          <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-[color:var(--muted-foreground)]">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-[color:var(--primary)]" />
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4 text-[color:var(--primary)]" />
              {post.author.name}
            </span>
          </div>

          <h1 className="text-4xl font-black tracking-tight md:text-6xl">{post.title}</h1>

          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-[color:var(--border)] bg-[color:var(--muted)] px-3 py-1 text-xs text-[color:var(--primary)]">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl border border-[color:var(--border)] p-8 md:p-10">
          {post.content.split("\n").map((paragraph, index) => {
            const trimmed = paragraph.trim()
            if (!trimmed) return <div key={index} className="h-4" />

            if (trimmed.startsWith("## ")) {
              const text = trimmed.slice(3)
              const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
              return (
                <h2 key={index} id={id} className="mt-8 text-2xl font-black">
                  {text}
                </h2>
              )
            }

            if (trimmed.startsWith("### ")) {
              const text = trimmed.slice(4)
              const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
              return (
                <h3 key={index} id={id} className="mt-6 text-xl font-bold">
                  {text}
                </h3>
              )
            }

            return (
              <p key={index} className="mt-4 text-lg leading-relaxed text-[color:var(--muted-foreground)]">
                {trimmed}
              </p>
            )
          })}
        </div>
      </article>

      {toc.length > 0 && (
        <aside className="hidden lg:block lg:w-1/4">
          <div className="sticky top-24 rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-4">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.15em] text-[color:var(--muted-foreground)]">
              Table of Contents
            </h2>
            <nav className="space-y-1">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block rounded-md px-2 py-1 text-sm transition hover:text-[color:var(--primary)] ${
                    item.level === 3 ? "pl-6 text-[color:var(--muted-foreground)]" : "font-semibold"
                  }`}
                >
                  {item.text}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      )}
    </div>
  )
}
