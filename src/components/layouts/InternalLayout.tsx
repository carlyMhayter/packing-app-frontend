import { useState } from "react";
import { Link, Outlet } from "react-router";
import logoIcon from "../../assets/platy_square.png";
import logoName from "../../assets/name-trans.png";
import "./styles/InternalLayout.css";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { logoutThunk, selectCurrentUser } from "../../state/appSlice";
export default function InternalLayout() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  const displayName = user?.first_name || user?.email?.split("@")[0] || "User";
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logoutThunk());
    window.location.href = "/";
  };

  return (
    <div className="dashboard-layout">
      <nav className="nav-bar">
        <div className="nav-content">
          <Link
            to="/"
            className="internal-logo-link"
            aria-label="Go to homepage"
          >
            <img src={logoIcon} alt="Platypak" className="internal-logo-icon" />
          </Link>
          <Link to="/dashboard" className="internal-logo-name-link">
            <img src={logoName} alt="Platypak" className="internal-logo-name" />
          </Link>
          <div className="nav-right">
            <button
              type="button"
              className="nav-user-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {displayName} ▼
            </button>
            {dropdownOpen && (
              <div className="dropdown">
                <Link to="/account_settings" className="dropdown-item">
                  Account Settings
                </Link>
                <button
                  type="button"
                  className="dropdown-item"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
}
