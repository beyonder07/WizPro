"use client"

import type React from "react"

import { useEffect, useRef } from "react"

export function useGSAPAnimation() {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Dynamically import GSAP to avoid SSR issues
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)

        // Hero title animation
        gsap.fromTo(
          ".hero-title",
          { opacity: 0, y: 100, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.7)",
            delay: 0.2,
          },
        )

        // Hero subtitle animation
        gsap.fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            delay: 0.6,
          },
        )

        // Code editor animation
        gsap.fromTo(
          ".code-editor",
          { opacity: 0, x: -100, rotateY: -15 },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: 1,
          },
        )

        // AI review panel animation
        gsap.fromTo(
          ".ai-review",
          { opacity: 0, x: 100, rotateY: 15 },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: 1.2,
          },
        )

        // Feature cards animation
        gsap.fromTo(
          ".feature-card",
          { opacity: 0, y: 80, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.2,
            scrollTrigger: {
              trigger: ".features-section",
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        )

        // Floating animation for icons
        gsap.to(".floating-icon", {
          y: -10,
          duration: 2,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.3,
        })

        // Parallax effect for background elements
        gsap.to(".parallax-bg", {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: ".parallax-container",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
      })
    })
  }, [])

  return elementRef
}

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  const containerRef = useGSAPAnimation()

  return (
    <div ref={containerRef} className="relative">
      {children}
    </div>
  )
}
