"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { Section } from "@/components/Section"
import { ChevronDown } from "lucide-react"
import { cn } from "@/components/Navbar"

const faqs = [
  {
    question: "Do I need to be a Computer Science major to join?",
    answer: "Not at all! The AI Society is open to all majors. We believe AI intersects with every field, from business and healthcare to arts and humanities. We provide beginner-friendly resources to help anyone get started."
  },
  {
    question: "Do I need prior coding experience?",
    answer: "No prior experience is required. We host introductory workshops that teach the basics of programming and machine learning from scratch."
  },
  {
    question: "How often do you meet?",
    answer: "We typically hold general meetings bi-weekly, with project groups and specialized workshops meeting on alternating weeks. Check our Events page for the latest schedule."
  },
  {
    question: "Is there a membership fee?",
    answer: "No, membership is completely free for all currently enrolled Adelphi University students."
  },
  {
    question: "How can I get involved in a project?",
    answer: "At the beginning of each semester, we host a project pitch session where members can propose ideas or join existing teams. You can also reach out to the E-Board at any time to get connected with a project group."
  }
]

export default function FaqPage() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)

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
            Frequently Asked <span className="text-gradient">Questions</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[color:var(--muted-foreground)] max-w-3xl mx-auto leading-relaxed"
          >
            Everything you need to know about the AI Society.
          </motion.p>
        </div>
      </section>

      <Section className="bg-[color:var(--muted)]/30 flex-grow">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-bold text-lg">{faq.question}</span>
                  <ChevronDown 
                    className={cn(
                      "w-5 h-5 text-[color:var(--primary)] transition-transform duration-300",
                      openIndex === i ? "rotate-180" : ""
                    )} 
                  />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-[color:var(--muted-foreground)] leading-relaxed border-t border-[color:var(--border)] pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}
