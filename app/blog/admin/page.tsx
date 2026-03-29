import Link from "next/link"

export default function BlogAdminPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-black tracking-tight">Creator Dashboard Moved</h1>
      <p className="mt-3 text-[color:var(--muted-foreground)]">
        Blog moderation now lives in the central dashboard.
      </p>
      <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">
        Use Ctrl + Shift + D to unlock admin access, then open the dashboard.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/dashboard"
          className="inline-flex h-11 items-center rounded-full bg-[color:var(--primary)] px-6 text-sm font-bold text-[color:var(--primary-foreground)]"
        >
          Open Dashboard
        </Link>
        <Link
          href="/blog"
          className="inline-flex h-11 items-center rounded-full border border-[color:var(--border)] px-6 text-sm font-bold"
        >
          Back to Blog
        </Link>
      </div>
    </div>
  )
}
