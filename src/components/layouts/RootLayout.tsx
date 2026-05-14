import { useState } from "react";
import { Link, Outlet } from "react-router";
import logoIcon from "../../assets/platy_square.png";

export default function RootLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="root-layout">
      <Link to="/" className="home-logo-link" aria-label="Go to homepage">
        <img src={logoIcon} alt="Platypak" className="home-logo-icon" />
      </Link>

      <nav className="top-auth-nav">
        <Link to="/auth/login" className="top-auth-link">
          Log In
        </Link>
        <Link to="/auth/create_user" className="top-auth-link">
          Create Account
        </Link>

        <div className="hamburger-menu">
          <button
            type="button"
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>

          {menuOpen && (
            <div className="hamburger-dropdown">
              <Link to="/dashboard" className="dropdown-item">
                Dashboard
              </Link>
              <Link to="/account" className="dropdown-item">
                Account
              </Link>
              <Link to="/settings" className="dropdown-item">
                Settings
              </Link>
            </div>
          )}
        </div>
      </nav>

      <Outlet />
    </div>
  );
}
