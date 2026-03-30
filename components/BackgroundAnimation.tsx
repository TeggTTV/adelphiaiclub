"use client"

import * as React from "react"

export function BackgroundAnimation() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-20 -top-20 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-[#60a5fa]/20 via-[#818cf8]/20 to-[#a78bfa]/20 blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute right-[-120px] top-1/4 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-[#34d399]/12 via-[#60a5fa]/10 to-[#93c5fd]/06 blur-3xl animate-blob animation-delay-4000" />
      <div className="absolute left-1/4 bottom-[-120px] h-[360px] w-[360px] rounded-full bg-gradient-to-br from-[#f97316]/12 via-[#f43f5e]/8 to-[#fb7185]/6 blur-3xl animate-blob" />
    </div>
  )
}
