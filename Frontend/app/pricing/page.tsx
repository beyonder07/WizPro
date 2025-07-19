import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, X, Star, Zap, Users, Building } from "lucide-react"

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for individual developers getting started",
      icon: Zap,
      popular: false,
      features: [
        { name: "5 code reviews per month", included: true },
        { name: "Basic bug detection", included: true },
        { name: "Code quality scoring", included: true },
        { name: "JavaScript & Python support", included: true },
        { name: "Web-based editor", included: true },
        { name: "Email support", included: false },
        { name: "Advanced security analysis", included: false },
        { name: "Team collaboration", included: false },
        { name: "API access", included: false },
        { name: "Custom rules", included: false },
      ],
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "For professional developers who need more power",
      icon: Star,
      popular: true,
      features: [
        { name: "Unlimited code reviews", included: true },
        { name: "Advanced bug detection", included: true },
        { name: "Comprehensive quality metrics", included: true },
        { name: "20+ programming languages", included: true },
        { name: "IDE integrations", included: true },
        { name: "Priority email support", included: true },
        { name: "Advanced security analysis", included: true },
        { name: "Personal workspace", included: true },
        { name: "API access", included: true },
        { name: "Custom rules", included: false },
      ],
    },
    {
      name: "Team",
      price: "$49",
      period: "per month",
      description: "For teams that want to collaborate and standardize",
      icon: Users,
      popular: false,
      features: [
        { name: "Everything in Pro", included: true },
        { name: "Team collaboration tools", included: true },
        { name: "Shared workspaces", included: true },
        { name: "Team analytics", included: true },
        { name: "Role-based permissions", included: true },
        { name: "Slack/Teams integration", included: true },
        { name: "Custom branding", included: true },
        { name: "Advanced reporting", included: true },
        { name: "Custom rules & policies", included: true },
        { name: "Phone support", included: true },
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For large organizations with specific requirements",
      icon: Building,
      popular: false,
      features: [
        { name: "Everything in Team", included: true },
        { name: "On-premise deployment", included: true },
        { name: "SSO integration", included: true },
        { name: "Advanced compliance", included: true },
        { name: "Custom integrations", included: true },
        { name: "Dedicated support", included: true },
        { name: "SLA guarantee", included: true },
        { name: "Training & onboarding", included: true },
        { name: "Custom AI models", included: true },
        { name: "White-label solution", included: true },
      ],
    },
  ]

  const faqs = [
    {
      question: "Can I change my plan at any time?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
    },
    {
      question: "Is there a free trial for paid plans?",
      answer: "Yes, all paid plans come with a 14-day free trial. No credit card required to start.",
    },
    {
      question: "What programming languages do you support?",
      answer: "We support 20+ programming languages including JavaScript, Python, Java, C#, Go, Rust, and many more.",
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee for all paid plans if you're not satisfied.",
    },
    {
      question: "How does team billing work?",
      answer: "Team plans are billed per team, not per user. You can add unlimited team members to your workspace.",
    },
  ]

  return (
    <div className="min-h-screen gradient-orange-light">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-orange-800 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan for your needs. Start free and upgrade as you grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`p-6 relative ${
                plan.popular ? "border-orange-500 shadow-lg scale-105" : "hover:shadow-lg transition-shadow"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 gradient-orange">
                  Most Popular
                </Badge>
              )}

              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <plan.icon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period !== "contact us" && <span className="text-muted-foreground">/{plan.period}</span>}
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    {feature.included ? (
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    )}
                    <span className={`text-sm ${!feature.included ? "text-muted-foreground" : ""}`}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                className={`w-full ${plan.popular ? "gradient-orange hover:opacity-90" : ""}`}
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
              </Button>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Have questions? We have answers. If you can't find what you're looking for, feel free to contact our
              support team.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="p-8 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of developers who trust WiZpro to improve their code quality. Start your free trial today,
              no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-orange hover:opacity-90">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg">
                Contact Sales
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
