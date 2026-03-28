"use client"

import * as React from "react"
import { motion, type HTMLMotionProps } from "motion/react"
import { cn } from "./Navbar"

interface SectionProps extends Omit<HTMLMotionProps<"section">, "children"> {
  children: React.ReactNode
  delay?: number
}

export function Section({ children, delay = 0, className, ...props }: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={cn("py-16 md:py-24", className)}
      {...props}
    >
      {children}
    </motion.section>
  )
}
