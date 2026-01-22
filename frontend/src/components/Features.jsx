import { Zap, Brain, BarChart3, Clock } from "lucide-react"
import "./Features.css"

export default function Features() {
  const features = [
    {
      icon: <Brain size={32} />,
      title: "AI-Powered Generation",
      description: "Advanced algorithms create personalized study materials tailored to your learning style and pace.",
    },
    {
      icon: <Zap size={32} />,
      title: "Instant Results",
      description: "Get comprehensive study guides and practice questions in seconds, not hours.",
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Progress Tracking",
      description: "Monitor your improvement with detailed analytics and performance insights.",
    },
    {
      icon: <Clock size={32} />,
      title: "Adaptive Learning",
      description: "The system learns from your performance and adjusts difficulty accordingly.",
    },
  ]

  return (
    <section id="features" className="features">
      <div className="container">
        <div className="section-header">
          <h2>Powerful Features</h2>
          <p>Everything you need to ace your exams</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
