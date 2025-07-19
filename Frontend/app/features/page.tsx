import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Zap,
  Bug,
  TrendingUp,
  Shield,
  Code2,
  FileText,
  Users,
  Clock,
  CheckCircle,
  Target,
  Lightbulb,
} from "lucide-react"

export default function FeaturesPage() {
  const features = [
    {
      icon: Zap,
      title: "Instant Code Analysis",
      description: "Get immediate feedback on your code quality with our advanced AI algorithms.",
      benefits: ["Real-time analysis", "Multiple language support", "Fast processing"],
      color: "text-yellow-600 dark:text-yellow-400",
    },
    {
      icon: Bug,
      title: "Advanced Bug Detection",
      description: "Automatically identify potential bugs, security vulnerabilities, and performance issues.",
      benefits: ["Security vulnerability scanning", "Performance bottleneck detection", "Logic error identification"],
      color: "text-red-600 dark:text-red-400",
    },
    {
      icon: TrendingUp,
      title: "Code Quality Metrics",
      description: "Comprehensive scoring system to track your code quality improvements over time.",
      benefits: ["Quality scoring", "Progress tracking", "Detailed metrics"],
      color: "text-green-600 dark:text-green-400",
    },
    {
      icon: Shield,
      title: "Security Analysis",
      description: "Identify security vulnerabilities and get recommendations for secure coding practices.",
      benefits: ["OWASP compliance", "Vulnerability assessment", "Security best practices"],
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Code2,
      title: "Multi-Language Support",
      description: "Support for 20+ programming languages including JavaScript, Python, Java, and more.",
      benefits: ["20+ languages", "Framework-specific analysis", "Custom rule sets"],
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: FileText,
      title: "Detailed Reports",
      description: "Generate comprehensive reports with actionable insights and improvement suggestions.",
      benefits: ["PDF/HTML reports", "Executive summaries", "Technical details"],
      color: "text-indigo-600 dark:text-indigo-400",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share reviews with your team and collaborate on code improvements.",
      benefits: ["Team workspaces", "Review sharing", "Collaborative feedback"],
      color: "text-pink-600 dark:text-pink-400",
    },
    {
      icon: Clock,
      title: "Historical Analysis",
      description: "Track code quality trends and improvements over time with detailed analytics.",
      benefits: ["Trend analysis", "Historical data", "Progress visualization"],
      color: "text-orange-600 dark:text-orange-400",
    },
  ]

  const codeQualityMetrics = [
    { name: "Maintainability", description: "How easy it is to maintain and modify the code" },
    { name: "Reliability", description: "Code stability and error-free execution" },
    { name: "Security", description: "Protection against vulnerabilities and threats" },
    { name: "Performance", description: "Efficiency and speed of code execution" },
    { name: "Readability", description: "Code clarity and documentation quality" },
  ]

  return (
    <div className="min-h-screen gradient-orange-light">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-orange-800 bg-clip-text text-transparent">
            Powerful Features for Better Code
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how WiZpro's AI-powered features can transform your development workflow and help you write better,
            more secure code.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-muted`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="font-semibold text-lg mb-3">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <div className="space-y-2">
                {feature.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Code Quality Metrics */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Code Quality Metrics</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive analysis covers all aspects of code quality to give you actionable insights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {codeQualityMetrics.map((metric, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="w-5 h-5 text-orange-600" />
                  <h3 className="font-semibold">{metric.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{metric.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Integration Section */}
        <Card className="p-8 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800">
          <div className="text-center">
            <Lightbulb className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Smart Integration</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Seamlessly integrate WiZpro into your existing development workflow with support for popular IDEs, CI/CD
              pipelines, and version control systems.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary">VS Code</Badge>
              <Badge variant="secondary">IntelliJ IDEA</Badge>
              <Badge variant="secondary">GitHub Actions</Badge>
              <Badge variant="secondary">GitLab CI</Badge>
              <Badge variant="secondary">Jenkins</Badge>
              <Badge variant="secondary">Bitbucket</Badge>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
