import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, Brain, FileText, CheckCircle, ArrowRight, Code2, Zap, Target, Users } from "lucide-react"
import Link from "next/link"

export default function HowItWorksPage() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Your Code",
      description: "Paste your code directly into our editor or upload files from your project.",
      details: [
        "Support for 20+ programming languages",
        "Drag & drop file upload",
        "GitHub integration",
        "Batch file processing",
      ],
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Our advanced AI algorithms analyze your code for quality, bugs, and security issues.",
      details: [
        "Machine learning models",
        "Pattern recognition",
        "Security vulnerability scanning",
        "Performance optimization detection",
      ],
    },
    {
      icon: FileText,
      title: "Get Detailed Report",
      description: "Receive comprehensive feedback with actionable insights and improvement suggestions.",
      details: [
        "Quality score and metrics",
        "Line-by-line feedback",
        "Security recommendations",
        "Best practice suggestions",
      ],
    },
    {
      icon: CheckCircle,
      title: "Implement Improvements",
      description: "Apply the suggested improvements and track your progress over time.",
      details: [
        "Code refactoring suggestions",
        "Progress tracking",
        "Before/after comparisons",
        "Team collaboration tools",
      ],
    },
  ]

  const benefits = [
    {
      icon: Zap,
      title: "Faster Development",
      description: "Reduce debugging time by 60% with early bug detection",
    },
    {
      icon: Target,
      title: "Higher Quality",
      description: "Improve code quality scores by an average of 40%",
    },
    {
      icon: Users,
      title: "Better Collaboration",
      description: "Standardize code quality across your entire team",
    },
  ]

  return (
    <div className="min-h-screen gradient-orange-light">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-orange-800 bg-clip-text text-transparent">
            How WiZpro Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI-powered code review process is designed to be simple, fast, and incredibly effective. Here's how we
            help you write better code in just four easy steps.
          </p>
        </div>

        {/* Steps Process */}
        <div className="max-w-4xl mx-auto mb-16">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-8 mb-12 last:mb-0">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 gradient-orange rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {index + 1}
                </div>
              </div>

              <Card className="flex-1 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <step.icon className="w-6 h-6 text-orange-600" />
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{step.description}</p>
                <div className="grid md:grid-cols-2 gap-2">
                  {step.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center w-8">
                  <ArrowRight className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose WiZpro?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of developers who have improved their code quality and development speed with WiZpro.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology Section */}
        <Card className="p-8 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800 mb-16">
          <div className="text-center">
            <Code2 className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Powered by Advanced AI</h2>
            <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
              Our AI models are trained on millions of lines of code from open-source projects, industry best practices,
              and security standards to provide you with the most accurate and helpful code reviews.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <Badge variant="secondary">Machine Learning</Badge>
              <Badge variant="secondary">Natural Language Processing</Badge>
              <Badge variant="secondary">Static Code Analysis</Badge>
              <Badge variant="secondary">Security Scanning</Badge>
              <Badge variant="secondary">Performance Analysis</Badge>
            </div>
          </div>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Improve Your Code?</h2>
          <p className="text-muted-foreground mb-6">
            Start your free trial today and experience the power of AI-driven code review.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gradient-orange hover:opacity-90">
              <Link href="/">Try WiZpro Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
