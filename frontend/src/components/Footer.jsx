import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import "./Footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>StudyGenie</h3>
            <p>AI-powered exam prep for the modern student</p>
          </div>

          <div className="footer-section">
            <h4>Product</h4>
            <ul>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
              <li>
                <a href="#careers">Careers</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li>
                <a href="#privacy">Privacy</a>
              </li>
              <li>
                <a href="#terms">Terms</a>
              </li>
              <li>
                <a href="#cookies">Cookies</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-social">
            <a href="#" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="#" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="#" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
          <p>&copy; 2025 StudyGenie. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
