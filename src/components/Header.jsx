import { Link, useLocation } from "react-router-dom";

export default function Header({ onCreateNote }) {
  const { pathname } = useLocation();
  const onBoard = pathname === "/";
  const onSearch = pathname === "/search";
  const onViews = pathname === "/views";

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="header-logo" style={{ textDecoration: "none" }}>
          <span className="logo-icon">📌</span>
          <div>
            <h1 className="logo-title">AI Complaint Board</h1>
            <p className="logo-sub">A place to vent about AI</p>
          </div>
        </Link>
        <nav className="header-nav">
          {!onBoard && (
            <Link to="/" className="nav-link" style={{ textDecoration: "none" }}>
              ← Board
            </Link>
          )}
          {!onSearch && (
            <Link to="/search" className="nav-link" style={{ textDecoration: "none" }}>
              Search
            </Link>
          )}
          {!onViews && (
            <Link to="/views" className="nav-link" style={{ textDecoration: "none" }}>
              Views →
            </Link>
          )}
          <button type="button" className="btn-post" onClick={onCreateNote}>
            + Post Note
          </button>
        </nav>
      </div>
    </header>
  );
}
