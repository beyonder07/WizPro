"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Github, Linkedin, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { MorphingLogo } from "./morphing-logo"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: "/features", label: "Features" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/pricing", label: "Pricing" },
    { href: "/documentation", label: "Documentation" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    import("gsap").then(({ gsap }) => {
      // Navigation slide-in animation
      gsap.fromTo(
        ".nav-item",
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.2,
        },
      )
    })
  }, [])

  return (
    <>
      {/* Fixed header with improved positioning */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-orange-200 dark:border-gray-700"
            : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-orange-100 dark:border-gray-800"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <Link href="/" className="nav-item flex items-center gap-3 group">
              <MorphingLogo />
              <div className="transform transition-transform duration-300 group-hover:scale-105">
                <h1 className="font-bold text-xl bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
                  WiZpro
                </h1>
                <p className="text-xs text-muted-foreground">AI-Powered Code Review</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-item text-sm font-medium transition-all duration-300 hover:text-orange-600 dark:hover:text-orange-400 hover:scale-105 relative group ${
                    pathname === item.href ? "text-orange-600 dark:text-orange-400" : "text-gray-700 dark:text-gray-300"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              <div className="nav-item">
                <ThemeToggle />
              </div>
              <div className="hidden sm:flex items-center gap-3">
                <a href="https://github.com/beyonder07" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="nav-item w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12" />
                </a>
                <a href="https://www.linkedin.com/in/rajul-mishra-621548258/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="nav-item w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 cursor-pointer transition-all duration-300 hover:scale-110 hover:-rotate-12" />
                </a>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden nav-item hover:bg-orange-100 dark:hover:bg-gray-800 transition-colors duration-300"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <X className="w-5 h-5 transform rotate-180 transition-transform duration-300" />
                ) : (
                  <Menu className="w-5 h-5 transform transition-transform duration-300" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-orange-200 dark:border-gray-700 bg-white/98 dark:bg-gray-900/98 backdrop-blur-md animate-slide-down">
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-all duration-300 hover:text-orange-600 dark:hover:text-orange-400 hover:translate-x-2 py-2 ${
                    pathname === item.href ? "text-orange-600 dark:text-orange-400" : "text-gray-700 dark:text-gray-300"
                  }`}
                  onClick={() => setIsOpen(false)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center gap-4 pt-4 border-t border-orange-200 dark:border-gray-700">
                <a href="https://github.com/beyonder07" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 cursor-pointer transition-colors duration-300" />
                </a>
                <a href="https://www.linkedin.com/in/rajul-mishra-621548258/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 cursor-pointer transition-colors duration-300" />
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-16"></div>
    </>
  )
}
