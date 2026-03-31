"use client"

import * as React from "react"

export function SkeletonStat() {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/6 px-6 py-6 backdrop-blur">
      <div className="h-3 w-32 rounded bg-[color:var(--muted-foreground)]/18 animate-pulse" />
      <div className="mt-4 h-12 w-36 rounded bg-[color:var(--muted-foreground)]/18 animate-pulse" />
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)] shadow-lg">
      <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-[color:var(--border)] bg-[color:var(--muted)]">
        <div className="h-full w-full animate-pulse bg-gradient-to-r from-[color:var(--muted-foreground)]/6 to-transparent" />
      </div>

      <div className="flex flex-grow flex-col p-6">
        <div className="h-8 w-3/4 rounded bg-[color:var(--muted-foreground)]/18 animate-pulse mb-4" />
        <div className="space-y-2 mb-4">
          <div className="h-4 w-full rounded bg-[color:var(--muted-foreground)]/12 animate-pulse" />
          <div className="h-4 w-5/6 rounded bg-[color:var(--muted-foreground)]/12 animate-pulse" />
          <div className="h-4 w-2/3 rounded bg-[color:var(--muted-foreground)]/12 animate-pulse" />
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <div className="h-6 w-16 rounded-full bg-[color:var(--muted-foreground)]/10 animate-pulse" />
          <div className="h-6 w-20 rounded-full bg-[color:var(--muted-foreground)]/10 animate-pulse" />
          <div className="h-6 w-12 rounded-full bg-[color:var(--muted-foreground)]/10 animate-pulse" />
        </div>

        <div className="mt-auto flex items-center gap-4">
          <div className="h-10 w-28 rounded bg-[color:var(--muted-foreground)]/12 animate-pulse" />
          <div className="h-10 w-10 rounded-full bg-[color:var(--muted-foreground)]/12 animate-pulse ml-auto" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonListItem() {
  return (
    <li className="px-5 py-5">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded bg-[color:var(--muted-foreground)]/12 animate-pulse" />
        <div className="flex-1">
          <div className="h-5 w-1/2 rounded bg-[color:var(--muted-foreground)]/12 animate-pulse mb-2" />
          <div className="flex gap-3 items-center text-xs">
            <div className="h-3 w-20 rounded bg-[color:var(--muted-foreground)]/10 animate-pulse" />
            <div className="h-3 w-16 rounded bg-[color:var(--muted-foreground)]/10 animate-pulse" />
            <div className="h-3 w-12 rounded bg-[color:var(--muted-foreground)]/10 animate-pulse" />
          </div>
        </div>
        <div className="h-9 w-28 rounded bg-[color:var(--muted-foreground)]/10 animate-pulse" />
      </div>
    </li>
  )
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

export function SkeletonList({ groups = 3, itemsPerGroup = 4 }: { groups?: number; itemsPerGroup?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: groups }).map((_, gi) => (
        <div key={gi} className="overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)] shadow-lg">
          <div className="flex flex-wrap items-center gap-3 border-b border-[color:var(--border)] bg-[color:var(--background)]/60 px-5 py-4">
            <div className="h-5 w-48 rounded bg-[color:var(--muted-foreground)]/12 animate-pulse" />
            <div className="ml-auto h-5 w-10 rounded bg-[color:var(--muted-foreground)]/12 animate-pulse" />
          </div>

          <ul className="divide-y divide-[color:var(--border)]">
            {Array.from({ length: itemsPerGroup }).map((_, li) => (
              <SkeletonListItem key={li} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default SkeletonGrid
