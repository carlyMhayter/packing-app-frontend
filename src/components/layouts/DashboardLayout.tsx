import { useState } from "react";
import { Link, Outlet } from "react-router";

export default function DashboardLayout() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <nav className="nav-bar">
        <div className="nav-content">
          <Link to="/dashboard" className="nav-logo">
            Packing App
          </Link>
          <div className="nav-right">
            <button
              type="button"
              className="nav-user-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              User ▼
            </button>
            {dropdownOpen && (
              <div className="dropdown">
                <Link to="/account" className="dropdown-item">
                  Account
                </Link>
                <Link to="/logout" className="dropdown-item">
                  Logout
                </Link>
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
