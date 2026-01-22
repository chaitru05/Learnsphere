import { Star } from "lucide-react"
import "./Testimonials.css"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Medical Student",
      content:
        "StudyGenie helped me prepare for my MCAT in just 3 months. The personalized study plans are incredible!",
      rating: 5,
      avatar: "👩‍⚕️",
    },
    {
      name: "James Wilson",
      role: "Law Student",
      content: "The AI-generated practice questions are so realistic. I scored 95% on my bar exam!",
      rating: 5,
      avatar: "👨‍⚖️",
    },
    {
      name: "Emma Rodriguez",
      role: "Engineering Student",
      content: "Finally, a study tool that actually understands complex topics. Highly recommended!",
      rating: 5,
      avatar: "👩‍💻",
    },
  ]

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="section-header">
          <h2>Loved by Students</h2>
          <p>See what our users have to say</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="testimonial-header">
                <div className="testimonial-avatar">{testimonial.avatar}</div>
                <div>
                  <div className="testimonial-name">{testimonial.name}</div>
                  <div className="testimonial-role">{testimonial.role}</div>
                </div>
              </div>
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="testimonial-content">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
