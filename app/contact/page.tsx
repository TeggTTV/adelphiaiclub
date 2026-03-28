"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Section } from "@/components/Section"
import { Mail, MapPin, Phone, Send } from "lucide-react"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitStatus, setSubmitStatus] = React.useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setSubmitStatus("success")
        ;(e.target as HTMLFormElement).reset()
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

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
            Get in <span className="text-gradient">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[color:var(--muted-foreground)] max-w-3xl mx-auto leading-relaxed"
          >
            Have a question, want to collaborate, or just want to say hi? We'd love to hear from you.
          </motion.p>
        </div>
      </section>

      <Section className="bg-[color:var(--muted)]/30">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            
            <div className="space-y-8">
              <h2 className="text-3xl font-bold tracking-tight mb-6">Contact Information</h2>
              
              <div className="glass rounded-3xl p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-[color:var(--primary)]/10 text-[color:var(--primary)]">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email Us</h3>
                    <a href="mailto:aisociety@adelphi.edu" className="text-[color:var(--muted-foreground)] hover:text-[color:var(--primary)] transition-colors">
                      aisociety@adelphi.edu
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-[color:var(--primary)]/10 text-[color:var(--primary)]">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Visit Us</h3>
                    <p className="text-[color:var(--muted-foreground)]">
                      Adelphi University<br />
                      1 South Ave<br />
                      Garden City, NY 11530
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[color:var(--primary)] rounded-full mix-blend-multiply filter blur-[128px] opacity-10" />
              
              <h2 className="text-3xl font-bold tracking-tight mb-6 relative z-10">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-[color:var(--muted-foreground)]">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    className="w-full px-4 py-3 rounded-xl bg-[color:var(--background)] border border-[color:var(--border)] focus:border-[color:var(--primary)] focus:ring-1 focus:ring-[color:var(--primary)] outline-none transition-all"
                    placeholder="Your Name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-[color:var(--muted-foreground)]">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    className="w-full px-4 py-3 rounded-xl bg-[color:var(--background)] border border-[color:var(--border)] focus:border-[color:var(--primary)] focus:ring-1 focus:ring-[color:var(--primary)] outline-none transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-[color:var(--muted-foreground)]">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    required 
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-[color:var(--background)] border border-[color:var(--border)] focus:border-[color:var(--primary)] focus:ring-1 focus:ring-[color:var(--primary)] outline-none transition-all resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 rounded-xl bg-[color:var(--primary)] text-[color:var(--primary-foreground)] font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"} <Send className="w-5 h-5" />
                </button>

                {submitStatus === "success" && (
                  <p className="text-green-500 text-sm text-center font-medium">Message sent successfully!</p>
                )}
                {submitStatus === "error" && (
                  <p className="text-red-500 text-sm text-center font-medium">Failed to send message. Please try again.</p>
                )}
              </form>
            </div>

          </div>
        </div>
      </Section>
    </div>
  )
}
