import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNotes } from "../context/NotesContext";
import { USERS } from "../data/notes";

function NavLink({ to, label, active, className = "", onNavigate }) {
  if (active) {
    return <span className={`nav-link nav-link-active ${className}`}>{label}</span>;
  }
  return (
    <Link
      to={to}
      className={`nav-link ${className}`}
      style={{ textDecoration: "none" }}
      onClick={onNavigate}
    >
      {label}
    </Link>
  );
}

export default function Header({ onCreateNote }) {
  const { pathname } = useLocation();
  const { currentUser, setCurrentUser } = useNotes();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    if (menuOpen) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 769px)");
    const onChange = (e) => {
      if (e.matches) closeMenu();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

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

        <button
          type="button"
          className="header-menu-btn"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="header-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="header-menu-icon" aria-hidden="true" />
        </button>

        <nav
          id="header-nav"
          className={`header-nav${menuOpen ? " header-nav-open" : ""}`}
        >
          <NavLink to="/" label="Board" active={pathname === "/"} onNavigate={closeMenu} />
          <NavLink
            to="/search"
            label="Search"
            active={pathname === "/search"}
            onNavigate={closeMenu}
          />
          <NavLink
            to="/my-notes"
            label="My Notes"
            active={pathname === "/my-notes"}
            onNavigate={closeMenu}
          />
          <NavLink
            to="/consensus"
            label="Consensus"
            active={pathname === "/consensus"}
            className="nav-link-consensus"
            onNavigate={closeMenu}
          />
          {onCreateNote && (
            <button
              type="button"
              className="btn-post"
              onClick={() => {
                onCreateNote();
                closeMenu();
              }}
            >
              + Post Note
            </button>
          )}
          <div className="user-switcher">
            <span className="user-switcher-icon">👤</span>
            <select
              className="user-switcher-select"
              value={currentUser}
              onChange={(e) => setCurrentUser(e.target.value)}
            >
              {USERS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </nav>

        {menuOpen && (
          <button
            type="button"
            className="header-nav-backdrop"
            aria-label="Close menu"
            onClick={closeMenu}
          />
        )}
      </div>
    </header>
  );
}
