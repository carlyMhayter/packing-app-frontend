import { useState } from "react";
import "./styles/accountSettings.css";

export default function AccountSettings() {
  const [name, setName] = useState("Carly Hayter");
  const [email, setEmail] = useState("carly@example.com");
  const [username, setUsername] = useState("carlyh");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [notifications, setNotifications] = useState({
    email: true,
    weather: true,
    packing: false,
  });

  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("America/New_York");
  const [unit, setUnit] = useState<"imperial" | "metric">("imperial");

  return (
    <div className="account-settings-page">
      <header className="account-settings-header">
        <h1 className="account-settings-title">Account Settings</h1>
        <p className="account-settings-subtitle">
          Manage your profile, password, and preferences.
        </p>
      </header>

      <div className="account-settings-grid">
        {/* Profile Section */}
        <section className="account-settings-card">
          <div className="account-settings-card-header">
            <h2 className="account-settings-card-title">Profile</h2>
            <p className="account-settings-card-desc">Update your personal information.</p>
          </div>
          <div className="account-settings-card-body">
            <div className="account-settings-field">
              <label className="account-settings-label" htmlFor="settings-name">
                Full Name
              </label>
              <input
                id="settings-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="account-settings-input"
              />
            </div>
            <div className="account-settings-field">
              <label className="account-settings-label" htmlFor="settings-email">
                Email Address
              </label>
              <input
                id="settings-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="account-settings-input"
              />
            </div>
            <div className="account-settings-field">
              <label className="account-settings-label" htmlFor="settings-username">
                Username
              </label>
              <input
                id="settings-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="account-settings-input"
              />
            </div>
          </div>
          <div className="account-settings-card-footer">
            <button className="account-settings-btn-primary" type="button">
              Save Profile
            </button>
          </div>
        </section>

        {/* Password Section */}
        <section className="account-settings-card">
          <div className="account-settings-card-header">
            <h2 className="account-settings-card-title">Password</h2>
            <p className="account-settings-card-desc">Change your password to keep your account secure.</p>
          </div>
          <div className="account-settings-card-body">
            <div className="account-settings-field">
              <label className="account-settings-label" htmlFor="settings-current-password">
                Current Password
              </label>
              <input
                id="settings-current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                className="account-settings-input"
              />
            </div>
            <div className="account-settings-field">
              <label className="account-settings-label" htmlFor="settings-new-password">
                New Password
              </label>
              <input
                id="settings-new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter a new password"
                className="account-settings-input"
              />
            </div>
            <div className="account-settings-field">
              <label className="account-settings-label" htmlFor="settings-confirm-password">
                Confirm New Password
              </label>
              <input
                id="settings-confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                className="account-settings-input"
              />
            </div>
          </div>
          <div className="account-settings-card-footer">
            <button className="account-settings-btn-primary" type="button">
              Update Password
            </button>
          </div>
        </section>

        {/* Preferences Section */}
        <section className="account-settings-card">
          <div className="account-settings-card-header">
            <h2 className="account-settings-card-title">Preferences</h2>
            <p className="account-settings-card-desc">Customize your default settings and units.</p>
          </div>
          <div className="account-settings-card-body">
            <div className="account-settings-field">
              <label className="account-settings-label" htmlFor="settings-language">
                Language
              </label>
              <select
                id="settings-language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="account-settings-select"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="ja">Japanese</option>
              </select>
            </div>
            <div className="account-settings-field">
              <label className="account-settings-label" htmlFor="settings-timezone">
                Timezone
              </label>
              <select
                id="settings-timezone"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="account-settings-select"
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
            <div className="account-settings-field">
              <label className="account-settings-label">Default Units</label>
              <div className="account-settings-unit-toggle">
                <button
                  type="button"
                  className={unit === "imperial" ? "selected" : ""}
                  onClick={() => setUnit("imperial")}
                  aria-pressed={unit === "imperial"}
                >
                  Imperial
                </button>
                <button
                  type="button"
                  className={unit === "metric" ? "selected" : ""}
                  onClick={() => setUnit("metric")}
                  aria-pressed={unit === "metric"}
                >
                  Metric
                </button>
              </div>
            </div>
          </div>
          <div className="account-settings-card-footer">
            <button className="account-settings-btn-primary" type="button">
              Save Preferences
            </button>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="account-settings-card">
          <div className="account-settings-card-header">
            <h2 className="account-settings-card-title">Notifications</h2>
            <p className="account-settings-card-desc">Choose which emails and alerts you would like to receive.</p>
          </div>
          <div className="account-settings-card-body">
            <div className="account-settings-toggle-field">
              <div className="account-settings-toggle-info">
                <span className="account-settings-toggle-label">Email Updates</span>
                <span className="account-settings-toggle-desc">Receive trip reminders, packing alerts, and app news.</span>
              </div>
              <button
                type="button"
                className={`account-settings-toggle-btn ${notifications.email ? "on" : "off"}`}
                onClick={() =>
                  setNotifications((prev) => ({ ...prev, email: !prev.email }))
                }
                aria-pressed={notifications.email}
                aria-label="Toggle email notifications"
              >
                <span className="account-settings-toggle-knob" />
              </button>
            </div>
            <div className="account-settings-toggle-field">
              <div className="account-settings-toggle-info">
                <span className="account-settings-toggle-label">Weather Alerts</span>
                <span className="account-settings-toggle-desc">Get notified of major weather changes for your trips.</span>
              </div>
              <button
                type="button"
                className={`account-settings-toggle-btn ${notifications.weather ? "on" : "off"}`}
                onClick={() =>
                  setNotifications((prev) => ({ ...prev, weather: !prev.weather }))
                }
                aria-pressed={notifications.weather}
                aria-label="Toggle weather alerts"
              >
                <span className="account-settings-toggle-knob" />
              </button>
            </div>
            <div className="account-settings-toggle-field">
              <div className="account-settings-toggle-info">
                <span className="account-settings-toggle-label">Packing Reminders</span>
                <span className="account-settings-toggle-desc">Receive reminders before upcoming trips to finalize your packing list.</span>
              </div>
              <button
                type="button"
                className={`account-settings-toggle-btn ${notifications.packing ? "on" : "off"}`}
                onClick={() =>
                  setNotifications((prev) => ({ ...prev, packing: !prev.packing }))
                }
                aria-pressed={notifications.packing}
                aria-label="Toggle packing reminders"
              >
                <span className="account-settings-toggle-knob" />
              </button>
            </div>
          </div>
          <div className="account-settings-card-footer">
            <button className="account-settings-btn-primary" type="button">
              Save Notifications
            </button>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="account-settings-card account-settings-card-danger">
          <div className="account-settings-card-header">
            <h2 className="account-settings-card-title">Danger Zone</h2>
            <p className="account-settings-card-desc">Be careful — these actions are permanent.</p>
          </div>
          <div className="account-settings-card-body">
            <div className="account-settings-danger-row">
              <div className="account-settings-danger-info">
                <span className="account-settings-danger-label">Delete Account</span>
                <span className="account-settings-danger-desc">Permanently delete your account, trips, and all associated data.</span>
              </div>
              <button className="account-settings-btn-danger" type="button">
                Delete Account
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
