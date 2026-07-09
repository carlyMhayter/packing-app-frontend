import nameLogo from "../../assets/text_&_logo.png";
import AnimatedBorder from "../animations/border/AnimatedBorder";
import { Link, Outlet } from "react-router";
import { useState } from "react";
import logoIcon from "../../assets/platy_square.png";
import "./styles/AuthLayout.css";

export default function AuthLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="auth-layout">
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
              <Link to="/account_settings" className="dropdown-item">
                Account
              </Link>
            </div>
          )}
        </div>
      </nav>
      <img src={nameLogo} alt="Packing App" className="auth-name-logo" />
      <p>Packing as unique as you are!</p>
      <AnimatedBorder className="auth-card">
        <Outlet />
      </AnimatedBorder>
    </div>
  );
}
