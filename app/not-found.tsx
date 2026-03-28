"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { Terminal, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary)_0%,transparent_50%)] opacity-10 blur-[100px]" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-3xl p-12 md:p-20 text-center relative z-10 max-w-2xl mx-4 flex flex-col items-center gap-6"
      >
        <div className="w-24 h-24 rounded-full bg-[color:var(--muted)] flex items-center justify-center border-4 border-[color:var(--border)] mb-4">
          <Terminal className="w-12 h-12 text-[color:var(--primary)] animate-pulse" />
        </div>
        
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-gradient">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-bold">
          System Error: Page Not Found
        </h2>
        
        <p className="text-[color:var(--muted-foreground)] text-lg leading-relaxed max-w-md">
          The requested resource could not be located on this server. It may have been moved, deleted, or never existed.
        </p>
        
        <div className="mt-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[color:var(--primary)] text-[color:var(--primary-foreground)] font-bold text-lg hover:opacity-90 transition-opacity"
          >
            <Home className="w-5 h-5" /> Return to Base
          </Link>
        </div>
      </motion.div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[color:var(--primary)] rounded-full animate-ping opacity-50" />
      <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-[color:var(--primary)] rounded-full animate-ping opacity-30 animation-delay-2000" />
    </div>
  )
}
