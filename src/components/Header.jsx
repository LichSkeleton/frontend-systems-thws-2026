import { Link } from "react-router-dom";

export default function Header({ variant = "home" }) {
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
              <span className="nav-link">Top Notes</span>
              <span className="nav-link">Recent</span>
              <Link to="/views" className="nav-link" style={{ textDecoration: "none" }}>
                Views →
              </Link>
            </>
          )}
          <button type="button" className="btn-post">
            + Post Note
          </button>
        </nav>
      </div>
    </header>
  );
}
