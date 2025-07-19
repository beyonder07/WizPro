"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Zap, Bug, TrendingUp } from "lucide-react"
import { GSAPProvider } from "@/components/gsap-animations"
import { AnimatedBackground } from "@/components/animated-background"
import { InteractiveCodeEditor } from "@/components/interactive-code-editor"
import { ScrollProgress } from "@/components/scroll-progress"

export default function HomePage() {
  const codeTemplates: Record<string, string> = {
    javascript: `function calculateTotal(items) {
  return items.reduce((total, item) => {
    return total + item.price;
  }, 0);
}`,
    typescript: `function calculateTotal(items: { price: number }[]): number {
  return items.reduce((total, item) => {
    return total + item.price;
  }, 0);
}`,
    python: `def calculate_total(items):
    return sum(item['price'] for item in items)`,
    java: `public int calculateTotal(List<Item> items) {
    return items.stream().mapToInt(Item::getPrice).sum();
}`,
    c: `int calculateTotal(int items[], int n) {
    int total = 0;
    for (int i = 0; i < n; i++) {
        total += items[i];
    }
    return total;
}`,
    cpp: `int calculateTotal(const std::vector<int>& items) {
    int total = 0;
    for (int price : items) {
        total += price;
    }
    return total;
}`
  }

  const [language, setLanguage] = useState("javascript")
  const [code, setCode] = useState(codeTemplates[language])
  const [hasReview, setHasReview] = useState(false)
  const [isReviewing, setIsReviewing] = useState(false)
  const [reviewResult, setReviewResult] = useState(null)

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang)
    setCode(codeTemplates[lang] || "")
  }

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
  const handleReviewCode = async () => {
    setIsReviewing(true)
    try {
      const response = await fetch(`${backendUrl}/ai/get-review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      const data = await response.json()
      setReviewResult(data)
      setHasReview(true)
    } catch (error) {
      setReviewResult({ error: 'Failed to get review from backend.' })
      setHasReview(true)
    }
    setIsReviewing(false)
  }

  return (
    <GSAPProvider>
      <div className="min-h-screen gradient-orange-light dark:dark-bg-primary relative overflow-hidden">
        <ScrollProgress />
        <AnimatedBackground />

        {/* Parallax Background Elements */}
        <div className="parallax-container absolute inset-0 pointer-events-none">
          <div className="parallax-bg absolute top-20 left-10 w-32 h-32 bg-orange-200/20 dark:bg-blue-200/10 rounded-full blur-xl"></div>
          <div className="parallax-bg absolute top-40 right-20 w-24 h-24 bg-red-200/20 dark:bg-purple-200/10 rounded-full blur-lg"></div>
          <div className="parallax-bg absolute bottom-40 left-1/4 w-40 h-40 bg-orange-300/10 dark:bg-blue-300/5 rounded-full blur-2xl"></div>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center relative z-10">
          <div className="hero-title">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-orange-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-600 bg-clip-text text-transparent transform-gpu">
              AI-Powered Code Review
            </h1>
          </div>

          <div className="hero-subtitle">
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Get instant feedback on your code quality, find bugs, and improve your coding skills with our
              <span className="text-orange-600 dark:text-blue-400 font-semibold"> revolutionary AI technology</span>.
            </p>
          </div>

          {/* Enhanced Code Editor Interface */}
          <div className="max-w-6xl mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 to-red-400/5 dark:from-blue-400/5 dark:to-purple-400/5 rounded-3xl blur-3xl"></div>
            <InteractiveCodeEditor
              onReview={handleReviewCode}
              isReviewing={isReviewing}
              hasReview={hasReview}
              code={code}
              setCode={setCode}
              reviewResult={reviewResult}
              language={language}
              onLanguageChange={handleLanguageChange}
            />
          </div>
        </section>

        {/* Enhanced Key Features Section */}
        <section className="features-section container mx-auto px-4 py-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm relative z-10 rounded-t-3xl mt-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">Key Features</h2>
            <div className="w-16 h-1 gradient-orange dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="feature-card p-8 text-center hover:shadow-2xl transition-all duration-500 border-orange-100 dark:border-gray-700 dark:bg-gray-800/50 transform-gpu group">
              <div className="w-16 h-16 bg-orange-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="floating-icon w-8 h-8 text-orange-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-xl mb-4 text-gray-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-blue-400 transition-colors">
                Instant Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors leading-relaxed">
                Get immediate feedback on your code quality and potential improvements with lightning-fast AI
                processing.
              </p>
            </Card>

            <Card className="feature-card p-8 text-center hover:shadow-2xl transition-all duration-500 border-orange-100 dark:border-gray-700 dark:bg-gray-800/50 transform-gpu group">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Bug className="floating-icon w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="font-semibold text-xl mb-4 text-gray-800 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                Bug Detection
              </h3>
              <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors leading-relaxed">
                Automatically identify potential bugs and security vulnerabilities before they become problems.
              </p>
            </Card>

            <Card className="feature-card p-8 text-center hover:shadow-2xl transition-all duration-500 border-orange-100 dark:border-gray-700 dark:bg-gray-800/50 transform-gpu group">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="floating-icon w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-xl mb-4 text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                Skill Improvement
              </h3>
              <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors leading-relaxed">
                Learn best practices and improve your coding skills with personalized AI guidance and recommendations.
              </p>
            </Card>
          </div>
        </section>
      </div>
    </GSAPProvider>
  )
}
