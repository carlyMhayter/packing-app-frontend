import { useLocation } from "react-router-dom";
import { Link, Outlet } from "react-router";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import logoIcon from "../../assets/platy_square.png";

export default function RootLayout() {
  const location = useLocation();
  const { pathname } = location;
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <div className="root-layout">
      {pathname === "/" && (
        <>
          <Link to="/" className="home-logo-link" aria-label="Go to homepage">
            <img src={logoIcon} alt="Platypak" className="home-logo-icon" />
          </Link>
          <nav className="top-auth-nav">
            {!isAuthenticated ? (
              <>
                <Link to="/auth/login" className="top-auth-link">
                  Log In
                </Link>
                <Link to="/auth/create_user" className="top-auth-link">
                  Create Account
                </Link>
              </>
            ) : (
              <Link to="/dashboard" className="top-auth-link">
                Dashboard
              </Link>
            )}

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
                  {isAuthenticated && (
                    <Link to="/dashboard" className="dropdown-item">
                      Dashboard
                    </Link>
                  )}
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
        </>
      )}
      <Outlet />
    </div>
  );
}
