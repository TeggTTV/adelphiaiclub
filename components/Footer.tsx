import Link from "next/link"
import Image from "next/image"
import { Github, Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-[color:var(--background)] py-12">
      <div className="container mx-auto px-4 md:px-6 grid gap-8 lg:grid-cols-4">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <Link href="/" className="flex items-center gap-2 group w-fit">
            <Image
              src="/TRANSPARENT ICON.png"
              alt="Adelphi AI Society logo"
              width={28}
              height={28}
              className="h-7 w-7 object-contain group-hover:scale-105 transition-transform"
            />
            <span className="font-bold text-lg tracking-tighter">Adelphi AI Society</span>
          </Link>
          <p className="text-[color:var(--muted-foreground)] text-sm max-w-sm">
            Innovate, Create, Explore. Join our community in the exploration of Artificial Intelligence as a way to amplify innovation, creativity, and growth.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-sm uppercase tracking-wider text-[color:var(--primary)]">Quick Links</h3>
          <nav className="flex flex-col gap-2 text-sm text-[color:var(--muted-foreground)]">
            <Link href="/about" className="hover:text-[color:var(--primary)] transition-colors">About Us</Link>
            <Link href="/events" className="hover:text-[color:var(--primary)] transition-colors">Events</Link>
            <Link href="/projects" className="hover:text-[color:var(--primary)] transition-colors">Projects</Link>
            <Link href="/blog" className="hover:text-[color:var(--primary)] transition-colors">Blog</Link>
            <Link href="/faq" className="hover:text-[color:var(--primary)] transition-colors">FAQ</Link>
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-sm uppercase tracking-wider text-[color:var(--primary)]">Connect</h3>
          <div className="flex items-center gap-4 text-[color:var(--muted-foreground)]">
            <a href="https://instagram.com/adelphiaisociety_" target="_blank" rel="noopener noreferrer" className="hover:text-[color:var(--primary)] transition-colors">
              <Instagram className="w-5 h-5" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="https://github.com/adelphiaisociety" target="_blank" rel="noopener noreferrer" className="hover:text-[color:var(--primary)] transition-colors">
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="mailto:aisociety@adelphi.edu" className="hover:text-[color:var(--primary)] transition-colors">
              <Mail className="w-5 h-5" />
              <span className="sr-only">Email</span>
            </a>
          </div>
          <p className="text-xs text-[color:var(--muted-foreground)] mt-4">
            &copy; {new Date().getFullYear()} Adelphi AI Society. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
