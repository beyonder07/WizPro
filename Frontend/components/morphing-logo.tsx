"use client"

import { useEffect, useRef } from "react"
import { Code2 } from "lucide-react"

export function MorphingLogo() {
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    import("gsap").then(({ gsap }) => {
      const logo = logoRef.current
      if (!logo) return

      // Morphing animation
      gsap.to(logo, {
        scale: 1.1,
        rotation: 5,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      })

      // Glow effect
      gsap.to(logo, {
        boxShadow: "0 0 20px rgba(255, 107, 53, 0.5)",
        duration: 1.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      })
    })
  }, [])

  return (
    <div ref={logoRef} className="w-8 h-8 gradient-orange rounded-lg flex items-center justify-center transform-gpu">
      <Code2 className="w-5 h-5 text-white" />
    </div>
  )
}
