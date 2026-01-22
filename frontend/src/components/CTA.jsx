import { ArrowRight } from "lucide-react"
import "./CTA.css"

export default function CTA() {
  return (
    <section id="pricing" className="cta">
      <div className="container">
        <div className="cta-content">
          <h2>Ready to Transform Your Study Experience?</h2>
          <p>Join thousands of students already using StudyGenie to ace their exams</p>
          <button className="btn btn-primary">
            Start Free Trial
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}