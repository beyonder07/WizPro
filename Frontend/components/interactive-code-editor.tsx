"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Code2, Zap, Bug, TrendingUp, Shield, Sparkles } from "lucide-react"
import ReactMarkdown from 'react-markdown';

interface InteractiveCodeEditorProps {
  onReview: () => void
  isReviewing: boolean
  hasReview: boolean
  code: string
  setCode: (code: string) => void
  reviewResult?: any // Accept backend review result
  language: string
  onLanguageChange: (lang: string) => void
}

export function InteractiveCodeEditor({ onReview, isReviewing, hasReview, code, setCode, reviewResult, language, onLanguageChange }: InteractiveCodeEditorProps) {
  const editorRef = useRef<HTMLTextAreaElement>(null)
  const [typingEffect, setTypingEffect] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    import("gsap").then(({ gsap }) => {
      // Typing cursor effect
      gsap.to(".typing-cursor", {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })

      // Code syntax highlighting animation
      gsap.fromTo(
        ".code-line",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        },
      )
    })
  }, [code])

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value)
    setTypingEffect(true)
    setTimeout(() => setTypingEffect(false), 200)
  }

  // Remove fallbackReview and use only reviewResult

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Code Editor */}
      <Card className="code-editor p-0 overflow-hidden shadow-2xl border-orange-200 dark:border-gray-700 dark:bg-gray-800/50 transform-gpu">
        <div className="gradient-orange dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-700 text-white p-4 flex items-center justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 dark:from-blue-400/10 dark:to-purple-400/10 animate-pulse"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="floating-icon">
              <Code2 className="w-5 h-5" />
            </div>
            <span className="font-medium">Code Editor</span>
            <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: "3s" }} />
          </div>
          <div className="flex items-center gap-2 relative z-10">
            <Select value={language} onValueChange={onLanguageChange}>
              <SelectTrigger className="w-32 bg-orange-500/20 dark:bg-gray-700/50 border-orange-300 dark:border-gray-600 text-white backdrop-blur-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="c">C</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-orange-50/50 to-red-50/30 dark:from-gray-900/50 dark:to-gray-800/30 min-h-[400px] relative">
          <div className="absolute top-4 right-4 flex gap-2">
            <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
          </div>

          <textarea
            ref={editorRef}
            value={code}
            onChange={handleCodeChange}
            className={`w-full h-full min-h-[350px] font-mono text-sm bg-transparent border-none outline-none resize-none text-gray-800 dark:text-gray-200 transition-all duration-300 ${
              typingEffect ? "transform scale-[1.01]" : ""
            }`}
            placeholder="Write or paste your code here..."
          />
          <span className="typing-cursor absolute text-orange-600 dark:text-blue-400 font-mono">|</span>
        </div>

        <div className="p-4 border-t border-orange-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <Button
            onClick={onReview}
            disabled={isReviewing || !code.trim()}
            className="w-full gradient-orange dark:bg-gradient-to-r dark:from-blue-600 dark:to-purple-600 hover:opacity-90 text-white font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            {isReviewing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                <span className="animate-pulse">Analyzing Code...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2 animate-bounce" />
                Review Code
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* AI Review Panel */}
      <Card className="ai-review p-0 overflow-hidden shadow-2xl border-orange-200 dark:border-gray-700 dark:bg-gray-800/50 transform-gpu">
        <div className="gradient-orange dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-700 text-white p-4 flex items-center gap-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 dark:from-blue-400/5 dark:to-purple-400/5 animate-pulse"></div>
          <div className="floating-icon relative z-10">
            <Shield className="w-5 h-5" />
          </div>
          <span className="font-medium relative z-10">AI Review</span>
          {hasReview && (
            <Badge
              variant="secondary"
              className="ml-auto bg-white text-orange-600 dark:bg-gray-700 dark:text-blue-400 animate-bounce relative z-10"
            >
              Score: {reviewResult?.score}/100
            </Badge>
          )}
        </div>

        <div className="p-6 min-h-[400px] bg-gradient-to-br from-white to-orange-50/30 dark:from-gray-900/50 dark:to-gray-800/30 relative">
          {!hasReview || !reviewResult ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="relative">
                <Code2 className="w-16 h-16 text-orange-300 dark:text-blue-400 mb-4 animate-pulse" />
                <div className="absolute inset-0 w-16 h-16 border-2 border-orange-300 dark:border-blue-400 rounded-full animate-ping opacity-20"></div>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white animate-fade-in">
                No review yet
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm max-w-xs animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Write or paste your code in the editor, then click "Review Code" to get AI-powered feedback.
              </p>
            </div>
          ) : (
            <div className="markdown-preview">
              <ReactMarkdown
                components={{
                  code({node, inline, className, children, ...props}) {
                    if (inline) {
                      return <code className={className}>{children}</code>;
                    }
                    return (
                      <pre className={className} {...props}>
                        {String(children).split('\n').map((line, i) => (
                          <div className="code-line" key={i}>{line}</div>
                        ))}
                      </pre>
                    );
                  },
                }}
              >
                {reviewResult}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
