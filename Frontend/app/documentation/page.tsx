import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Code2,
  Zap,
  Settings,
  Users,
  Shield,
  ExternalLink,
  ChevronRight,
  FileText,
  Video,
  MessageCircle,
} from "lucide-react"

export default function DocumentationPage() {
  const sections = [
    {
      title: "Getting Started",
      icon: Zap,
      description: "Quick start guide and basic setup",
      articles: [
        { title: "Introduction to WiZpro", time: "5 min read" },
        { title: "Your First Code Review", time: "10 min read" },
        { title: "Understanding Quality Scores", time: "8 min read" },
        { title: "Supported Languages", time: "3 min read" },
      ],
    },
    {
      title: "Code Analysis",
      icon: Code2,
      description: "Deep dive into our analysis features",
      articles: [
        { title: "Bug Detection Algorithms", time: "15 min read" },
        { title: "Security Vulnerability Scanning", time: "12 min read" },
        { title: "Performance Analysis", time: "10 min read" },
        { title: "Code Quality Metrics", time: "8 min read" },
      ],
    },
    {
      title: "Configuration",
      icon: Settings,
      description: "Customize WiZpro for your needs",
      articles: [
        { title: "Custom Rules and Policies", time: "20 min read" },
        { title: "IDE Integration Setup", time: "15 min read" },
        { title: "CI/CD Pipeline Integration", time: "18 min read" },
        { title: "Webhook Configuration", time: "12 min read" },
      ],
    },
    {
      title: "Team Management",
      icon: Users,
      description: "Collaborate effectively with your team",
      articles: [
        { title: "Creating Team Workspaces", time: "10 min read" },
        { title: "Role-based Permissions", time: "8 min read" },
        { title: "Sharing Reviews", time: "5 min read" },
        { title: "Team Analytics", time: "12 min read" },
      ],
    },
    {
      title: "Security & Compliance",
      icon: Shield,
      description: "Enterprise security and compliance features",
      articles: [
        { title: "Data Privacy and Security", time: "10 min read" },
        { title: "GDPR Compliance", time: "8 min read" },
        { title: "SOC 2 Certification", time: "6 min read" },
        { title: "On-premise Deployment", time: "25 min read" },
      ],
    },
    {
      title: "API Reference",
      icon: FileText,
      description: "Complete API documentation",
      articles: [
        { title: "Authentication", time: "8 min read" },
        { title: "Code Review API", time: "15 min read" },
        { title: "Webhooks API", time: "12 min read" },
        { title: "Rate Limits", time: "5 min read" },
      ],
    },
  ]

  const quickLinks = [
    { title: "API Reference", href: "#", icon: Code2 },
    { title: "SDK Downloads", href: "#", icon: FileText },
    { title: "Video Tutorials", href: "#", icon: Video },
    { title: "Community Forum", href: "#", icon: MessageCircle },
  ]

  const popularArticles = [
    "Getting Started with WiZpro",
    "Setting up GitHub Integration",
    "Understanding Security Scores",
    "Custom Rule Configuration",
    "Team Workspace Setup",
  ]

  return (
    <div className="min-h-screen gradient-orange-light">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-orange-800 bg-clip-text text-transparent">
            Documentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about using WiZpro effectively. From quick start guides to advanced
            configuration.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-4 gap-4 mb-16">
          {quickLinks.map((link, index) => (
            <Card key={index} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <link.icon className="w-5 h-5 text-orange-600" />
                <span className="font-medium">{link.title}</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto" />
              </div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Documentation */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{section.title}</h2>
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {section.articles.map((article, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{article.title}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {article.time}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Articles */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-orange-600" />
                Popular Articles
              </h3>
              <div className="space-y-3">
                {popularArticles.map((article, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm hover:text-orange-600 cursor-pointer transition-colors"
                  >
                    <ChevronRight className="w-3 h-3" />
                    {article}
                  </div>
                ))}
              </div>
            </Card>

            {/* Search */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Search Documentation</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full px-3 py-2 border rounded-lg bg-background"
                />
              </div>
            </Card>

            {/* Support */}
            <Card className="p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Contact Support
                </Button>
                <Button variant="ghost" size="sm" className="w-full">
                  Join Community
                </Button>
              </div>
            </Card>

            {/* Version Info */}
            <Card className="p-4">
              <div className="text-center">
                <Badge variant="secondary">v2.1.0</Badge>
                <p className="text-xs text-muted-foreground mt-2">Last updated: January 2024</p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
