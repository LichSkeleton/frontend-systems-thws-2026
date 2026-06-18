import { Link } from "react-router-dom";

export default function Header({ variant = "home", onCreateNote }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="header-logo">
          <span className="logo-icon">📌</span>
          <div>
            <h1 className="logo-title">AI Complaint Board</h1>
            <p className="logo-sub">A place to vent about AI</p>
          </div>
        </div>
        <nav className="header-nav">
          {variant === "views" ? (
            <Link to="/" className="nav-link" style={{ textDecoration: "none" }}>
              ← Board
            </Link>
          ) : (
            <>
              <a href="#top-section" className="nav-link">
                Top Notes
              </a>
              <a href="#recent-section" className="nav-link">
                Recent
              </a>
              <Link to="/views" className="nav-link" style={{ textDecoration: "none" }}>
                Views →
              </Link>
            </>
          )}
          <button type="button" className="btn-post" onClick={onCreateNote}>
            + Post Note
          </button>
        </nav>
      </div>
    </header>
  );
}
