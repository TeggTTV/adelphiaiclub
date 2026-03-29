"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Menu, X, Moon, Sun, ChevronDown, LogOut } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { notifyAuthChanged, useAuthUser } from "@/hooks/use-auth-user"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const primaryLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
]

const moreLinks = [
  { name: "E-Board", href: "/eboard" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Files", href: "/files" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
]

const mobileLinks = [...primaryLinks, ...moreLinks]

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = React.useState(false)
  const scrollTickingRef = React.useRef(false)
  const isScrolledRef = React.useRef(false)
  const desktopMenuRef = React.useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { user, refresh } = useAuthUser()

  const isMoreActive = moreLinks.some((link) => pathname === link.href)

  React.useEffect(() => {
    const handleScroll = () => {
      if (scrollTickingRef.current) return

      scrollTickingRef.current = true
      window.requestAnimationFrame(() => {
        const y = window.scrollY
        const next = isScrolledRef.current ? y > 8 : y > 20

        if (next !== isScrolledRef.current) {
          isScrolledRef.current = next
          setIsScrolled(next)
        }

        scrollTickingRef.current = false
      })
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (desktopMenuRef.current && !desktopMenuRef.current.contains(event.target as Node)) {
        setIsDesktopMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  React.useEffect(() => {
    setIsDesktopMenuOpen(false)
    setIsMobileMenuOpen(false)
  }, [pathname])

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    }).catch(() => null)

    await refresh()
    notifyAuthChanged()
    setIsMobileMenuOpen(false)
    setIsDesktopMenuOpen(false)
  }

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-[padding,background-color,backdrop-filter,border-color,box-shadow] duration-200",
        isScrolled ? "glass py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/TRANSPARENT ICON.png"
            alt="Adelphi AI Society logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain group-hover:scale-105 transition-transform"
          />
          <span className="font-bold text-lg tracking-tighter">Adelphi AI Society</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {primaryLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-[color:var(--primary)]",
                pathname === link.href ? "text-[color:var(--primary)]" : "text-[color:var(--muted-foreground)]"
              )}
            >
              {link.name}
            </Link>
          ))}

          <div ref={desktopMenuRef} className="relative">
            <button
              onClick={() => setIsDesktopMenuOpen((prev) => !prev)}
              className={cn(
                "inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-[color:var(--primary)]",
                isMoreActive || isDesktopMenuOpen ? "text-[color:var(--primary)]" : "text-[color:var(--muted-foreground)]"
              )}
              aria-expanded={isDesktopMenuOpen}
              aria-haspopup="menu"
              aria-label="Open more navigation links"
            >
              More
              <ChevronDown className={cn("w-4 h-4 transition-transform", isDesktopMenuOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {isDesktopMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 min-w-48 glass rounded-xl p-2 z-50"
                >
                  {moreLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={cn(
                        "block rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-[color:var(--muted)] hover:text-[color:var(--primary)]",
                        pathname === link.href ? "text-[color:var(--primary)]" : "text-[color:var(--muted-foreground)]"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/join"
            className="inline-flex items-center rounded-full px-5 py-2 text-sm font-bold bg-[color:var(--primary)] text-[color:var(--primary-foreground)] shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_10px_24px_rgba(99,102,241,0.35)] hover:opacity-95 hover:-translate-y-0.5 transition-all"
          >
            Join Us
          </Link>

          {user ? (
            <>
              <Link
                href="/account"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[color:var(--primary)]",
                  pathname === "/account" ? "text-[color:var(--primary)]" : "text-[color:var(--muted-foreground)]"
                )}
              >
                Account
              </Link>

              {user.role === "ADMIN" && (
                <Link
                  href="/dashboard"
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-[color:var(--primary)]",
                    pathname === "/dashboard" ? "text-[color:var(--primary)]" : "text-[color:var(--muted-foreground)]"
                  )}
                >
                  Dashboard
                </Link>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1 text-sm font-medium text-[color:var(--muted-foreground)] transition-colors hover:text-red-400"
              >
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/auth/sign-in"
              className={cn(
                "text-sm font-medium transition-colors hover:text-[color:var(--primary)]",
                pathname === "/auth/sign-in" ? "text-[color:var(--primary)]" : "text-[color:var(--muted-foreground)]"
              )}
            >
              Sign In
            </Link>
          )}

          {/* <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative p-2 rounded-full hover:bg-[color:var(--muted)] transition-colors"
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button> */}
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative p-2 rounded-full hover:bg-[color:var(--muted)] transition-colors"
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[color:var(--foreground)]"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass border-t border-[color:var(--border)] py-4 lg:hidden flex flex-col items-center gap-4"
          >
            {mobileLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-[color:var(--primary)]",
                  pathname === link.href ? "text-[color:var(--primary)]" : "text-[color:var(--muted-foreground)]"
                )}
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <>
                <Link
                  href="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--primary)]"
                >
                  Account
                </Link>
                {user.role === "ADMIN" && (
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--primary)]"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 text-lg font-medium text-red-400"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/auth/sign-in"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--primary)]"
              >
                Sign In
              </Link>
            )}

            <Link
              href="/join"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 inline-flex items-center rounded-full px-6 py-2.5 text-base font-bold bg-[color:var(--primary)] text-[color:var(--primary-foreground)] shadow-[0_10px_24px_rgba(99,102,241,0.35)]"
            >
              Join Us
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
