"use client"

import * as React from "react"

export function EasterEggs() {
  React.useEffect(() => {
    // Easter Egg 1: Console Message
    console.log(
      "%c🤖 Welcome to the Adelphi AI Society! 🤖",
      "color: #818cf8; font-size: 20px; font-weight: bold; background: #0a0a0a; padding: 10px; border-radius: 5px;"
    )
    console.log("If you're reading this, you should probably join our dev team. Email us at aisociety@adelphi.edu")

    // Easter Egg 2: Konami Code
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ]
    let konamiIndex = 0

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++
        if (konamiIndex === konamiCode.length) {
          activateKonami()
          konamiIndex = 0
        }
      } else {
        konamiIndex = 0
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const activateKonami = () => {
    alert("🚀 Konami Code Activated! You are now an honorary AI Overlord. 🚀")
    document.body.style.filter = "hue-rotate(90deg) invert(10%)"
    setTimeout(() => {
      document.body.style.filter = ""
    }, 5000)
  }

  return null
}
