import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../style/dashboard.css";

const Layout = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">
            <svg viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" fill="#2563eb" />
              <path
                d="M20 8 L20 32 M12 20 Q20 12, 28 20"
                stroke="white"
                strokeWidth="3"
                fill="none"
              />
            </svg>
          </div>
          <span className="logo-text">LearnSphere</span>
        </div>

        <button className="create-btn" onClick={() => navigate("/inputform")}>
          + Create New
        </button>

        <nav className="nav-menu">
          <button className="nav-item active" onClick={() => navigate("/")}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="8" height="8" />
              <rect x="13" y="3" width="8" height="8" />
              <rect x="3" y="13" width="8" height="8" />
              <rect x="13" y="13" width="8" height="8" />
            </svg>
            Dashboard
          </button>

          <button className="nav-item">
            <svg
              className="nav-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z" />
            </svg>
            Upgrade
          </button>

          <button className="nav-item" onClick={() => navigate("/profile")}>
            <svg
              className="nav-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
            </svg>
            Profile
          </button>
        </nav>

        <div className="credits-widget">
          <h3 className="credits-title">Available Credits : 5</h3>
          <div className="credits-bar">
            <div className="credits-progress"></div>
          </div>
          <p className="credits-text">1 Out of 5 Credits Used</p>
          <a href="#" className="credits-link">
            Upgrade to create more
          </a>
          <div className="lightning-icon">⚡</div>
        </div>
      </aside>

      {/* Main page area */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
