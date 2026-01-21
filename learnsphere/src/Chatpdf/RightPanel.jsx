"use client"

import { useState } from "react"
import "./RightPanel.css"
import { Volume2, BookOpen, BarChart3, FileText, Edit3, ChevronDown } from "lucide-react"

export default function RightPanel() {
  const [expandedSection, setExpandedSection] = useState(null)

  const features = [
    { id: "audio", icon: Volume2, label: "Audio Overview", description: "Listen to document summary" },
    { id: "guide", icon: BookOpen, label: "Study Guide", description: "Key concepts & topics" },
    { id: "reports", icon: BarChart3, label: "Reports", description: "Analytics & insights" },
    { id: "summary", icon: FileText, label: "Summary PDF", description: "Downloadable summary" },
  ]

  return (
    <div className="right-panel-3">
      <div className="panel-header-3">
        <h2 className="panel-title-3">Learning Tools</h2>
      </div>

      <div className="features-grid-3">
        {features.map((feature) => {
          const Icon = feature.icon
          const isExpanded = expandedSection === feature.id

          return (
            <div
              key={feature.id}
              className={`feature-card-3 ${isExpanded ? "expanded-3" : ""}`}
              onClick={() => setExpandedSection(isExpanded ? null : feature.id)}
            >
              <div className="feature-header-3">
                <Icon size={24} className="feature-icon-3" />
                <div className="feature-text-3">
                  <p className="feature-label-3">{feature.label}</p>
                  <p className="feature-description-3">{feature.description}</p>
                </div>
                <ChevronDown className={`chevron-3 ${isExpanded ? "rotated-3" : ""}`} size={20} />
              </div>

              {isExpanded && (
                <div className="feature-content-3">
                  <p>This feature is ready to use. (Backend integration needed)</p>
                  <button className="feature-btn-3">Generate</button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="notes-section-3">
        <div className="notes-header-3">
          <Edit3 size={20} className="notes-icon-3" />
          <h3 className="notes-title-3">Notes</h3>
        </div>

        <textarea
          className="notes-textarea-3"
          placeholder="Take notes while studying..."
          defaultValue="Add your notes here..."
        />

        <div className="notes-footer-3">
          <button className="save-notes-btn-3">Save Notes</button>
        </div>
      </div>
    </div>
  )
}
