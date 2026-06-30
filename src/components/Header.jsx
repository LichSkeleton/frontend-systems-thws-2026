import { Link, useLocation } from "react-router-dom";
import { useNotes } from "../context/NotesContext";
import { USERS } from "../data/notes";

function NavLink({ to, label, active }) {
  if (active) {
    return <span className="nav-link nav-link-active">{label}</span>;
  }
  return (
    <Link to={to} className="nav-link" style={{ textDecoration: "none" }}>
      {label}
    </Link>
  );
}

export default function Header({ onCreateNote }) {
  const { pathname } = useLocation();
  const { currentUser, setCurrentUser } = useNotes();

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
          <NavLink to="/" label="Board" active={pathname === "/"} />
          <NavLink to="/search" label="Search" active={pathname === "/search"} />
          <NavLink to="/my-notes" label="My Notes" active={pathname === "/my-notes"} />
          <NavLink to="/consensus" label="Consensus" active={pathname === "/consensus"} />
          {onCreateNote && (
            <button type="button" className="btn-post" onClick={onCreateNote}>
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
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </nav>
      </div>
    </header>
  );
}
