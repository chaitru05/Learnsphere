import "./Stats.css"

export default function Stats() {
  const stats = [
    { value: "50K+", label: "Active Students", icon: "👥" },
    { value: "98%", label: "Success Rate", icon: "🎯" },
    { value: "1M+", label: "Materials Generated", icon: "📚" },
    { value: "24/7", label: "AI Support", icon: "🤖" },
  ]

  return (
    <section id="stats" className="stats">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
