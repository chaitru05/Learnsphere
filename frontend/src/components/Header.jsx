"use client"

import { useState } from "react"
import { Menu, X, Github, Sun, Moon } from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import "./Header.css"

export default function Header({ scrollY }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <header className={`header ${scrollY > 50 ? "scrolled" : ""}`}>
      <div className="container header-content">
        <div className="logo">
          <div className="logo-icon">✨</div>
          <span>StudyGenie</span>
        </div>

        <nav className={`nav ${isMenuOpen ? "active" : ""}`}>
          <a href="#features">Features</a>
          <a href="#stats">Impact</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#pricing">Pricing</a>
        </nav>

        <div className="header-actions">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="icon-btn">
            <Github size={20} />
          </a>
          <button
            className="icon-btn theme-toggle"
            onClick={toggleTheme}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button className="btn btn-primary">Get Started</button>
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  )
}
