import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/accountSettings.css";
import Modal from "../modals/modal/Modal";
import {
  updateProfile,
  updatePassword,
  updatePreferences,
  deleteAccount,
} from "../../services/user";
import type { User as FullUser } from "../../types/user";
import { selectCurrentUser } from "../../state/appSlice";
import { useAppSelector } from "../../hooks/reduxHooks";

export default function AccountSettings() {
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const fullUser = user as FullUser | null;

  const [name, setName] = useState(fullUser?.name ?? "");
  const [email, setEmail] = useState(fullUser?.email ?? "");
  const [username, setUsername] = useState(fullUser?.first_name ?? "");

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

  // Profile save state
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Password save state
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Preferences save state
  const [preferencesSaving, setPreferencesSaving] = useState(false);
  const [preferencesError, setPreferencesError] = useState<string | null>(null);
  const [preferencesSuccess, setPreferencesSuccess] = useState(false);

  // Delete account
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const handleSaveProfile = async () => {
    setProfileSaving(true);
    setProfileError(null);
    setProfileSuccess(false);
    try {
      await updateProfile({ name, email, username });
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (err) {
      setProfileError(
        err instanceof Error ? err.message : "Failed to save profile",
      );
    } finally {
      setProfileSaving(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!currentPassword) {
      setPasswordError("Current password is required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordSaving(true);
    setPasswordError(null);
    try {
      await updatePassword({ current: currentPassword, next: newPassword });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordSuccess(true);
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err) {
      setPasswordError(
        err instanceof Error ? err.message : "Failed to update password",
      );
    } finally {
      setPasswordSaving(false);
    }
  };

  const handleSavePreferences = async () => {
    setPreferencesSaving(true);
    setPreferencesError(null);
    setPreferencesSuccess(false);
    try {
      await updatePreferences({ language, timezone, unit });
      setPreferencesSuccess(true);
      setTimeout(() => setPreferencesSuccess(false), 3000);
    } catch (err) {
      setPreferencesError(
        err instanceof Error ? err.message : "Failed to save preferences",
      );
    } finally {
      setPreferencesSaving(false);
    }
  };

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
            <p className="account-settings-card-desc">
              Update your personal information.
            </p>
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
              <label
                className="account-settings-label"
                htmlFor="settings-email"
              >
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
              <label
                className="account-settings-label"
                htmlFor="settings-username"
              >
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
            {profileError && (
              <p className="account-settings-error">{profileError}</p>
            )}
            {profileSuccess && (
              <p className="account-settings-success">Profile saved!</p>
            )}
            <button
              className="account-settings-btn-primary"
              type="button"
              onClick={handleSaveProfile}
              disabled={profileSaving}
            >
              {profileSaving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </section>

        {/* Password Section */}
        <section className="account-settings-card">
          <div className="account-settings-card-header">
            <h2 className="account-settings-card-title">Password</h2>
            <p className="account-settings-card-desc">
              Change your password to keep your account secure.
            </p>
          </div>
          <div className="account-settings-card-body">
            <div className="account-settings-field">
              <label
                className="account-settings-label"
                htmlFor="settings-current-password"
              >
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
              <label
                className="account-settings-label"
                htmlFor="settings-new-password"
              >
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
              <label
                className="account-settings-label"
                htmlFor="settings-confirm-password"
              >
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
            {passwordError && (
              <p className="account-settings-error">{passwordError}</p>
            )}
            {passwordSuccess && (
              <p className="account-settings-success">Password updated!</p>
            )}
            <button
              className="account-settings-btn-primary"
              type="button"
              onClick={handleUpdatePassword}
              disabled={passwordSaving}
            >
              {passwordSaving ? "Saving..." : "Update Password"}
            </button>
          </div>
        </section>

        {/* Preferences Section */}
        <section className="account-settings-card">
          <div className="account-settings-card-header">
            <h2 className="account-settings-card-title">Preferences</h2>
            <p className="account-settings-card-desc">
              Customize your default settings and units.
            </p>
          </div>
          <div className="account-settings-card-body">
            <div className="account-settings-field">
              <label
                className="account-settings-label"
                htmlFor="settings-language"
              >
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
              <label
                className="account-settings-label"
                htmlFor="settings-timezone"
              >
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
            {preferencesError && (
              <p className="account-settings-error">{preferencesError}</p>
            )}
            {preferencesSuccess && (
              <p className="account-settings-success">Preferences saved!</p>
            )}
            <button
              className="account-settings-btn-primary"
              type="button"
              onClick={handleSavePreferences}
              disabled={preferencesSaving}
            >
              {preferencesSaving ? "Saving..." : "Save Preferences"}
            </button>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="account-settings-card">
          <div className="account-settings-card-header">
            <h2 className="account-settings-card-title">Notifications</h2>
            <p className="account-settings-card-desc">
              Choose which emails and alerts you would like to receive.
            </p>
          </div>
          <div className="account-settings-card-body">
            <div className="account-settings-toggle-field">
              <div className="account-settings-toggle-info">
                <span className="account-settings-toggle-label">
                  Email Updates
                </span>
                <span className="account-settings-toggle-desc">
                  Receive trip reminders, packing alerts, and app news.
                </span>
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
                <span className="account-settings-toggle-label">
                  Weather Alerts
                </span>
                <span className="account-settings-toggle-desc">
                  Get notified of major weather changes for your trips.
                </span>
              </div>
              <button
                type="button"
                className={`account-settings-toggle-btn ${notifications.weather ? "on" : "off"}`}
                onClick={() =>
                  setNotifications((prev) => ({
                    ...prev,
                    weather: !prev.weather,
                  }))
                }
                aria-pressed={notifications.weather}
                aria-label="Toggle weather alerts"
              >
                <span className="account-settings-toggle-knob" />
              </button>
            </div>
            <div className="account-settings-toggle-field">
              <div className="account-settings-toggle-info">
                <span className="account-settings-toggle-label">
                  Packing Reminders
                </span>
                <span className="account-settings-toggle-desc">
                  Receive reminders before upcoming trips to finalize your
                  packing list.
                </span>
              </div>
              <button
                type="button"
                className={`account-settings-toggle-btn ${notifications.packing ? "on" : "off"}`}
                onClick={() =>
                  setNotifications((prev) => ({
                    ...prev,
                    packing: !prev.packing,
                  }))
                }
                aria-pressed={notifications.packing}
                aria-label="Toggle packing reminders"
              >
                <span className="account-settings-toggle-knob" />
              </button>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="account-settings-card account-settings-card-danger">
          <div className="account-settings-card-header">
            <h2 className="account-settings-card-title">Danger Zone</h2>
            <p className="account-settings-card-desc">
              Be careful — these actions are permanent.
            </p>
          </div>
          <div className="account-settings-card-body">
            <div className="account-settings-danger-row">
              <div className="account-settings-danger-info">
                <span className="account-settings-danger-label">
                  Delete Account
                </span>
                <span className="account-settings-danger-desc">
                  Permanently delete your account, trips, and all associated
                  data.
                </span>
              </div>
              <button
                className="account-settings-btn-danger"
                type="button"
                onClick={() => setConfirmDeleteOpen(true)}
              >
                Delete Account
              </button>
            </div>
          </div>
        </section>
      </div>

      <Modal
        open={confirmDeleteOpen}
        title="Delete Account"
        onClose={() => setConfirmDeleteOpen(false)}
      >
        <p>This is permanent and cannot be undone. Are you sure?</p>
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button
            className="account-settings-btn-danger"
            type="button"
            onClick={async () => {
              try {
                await deleteAccount();
                // logout();
                navigate("/");
              } catch {
                setConfirmDeleteOpen(false);
              }
            }}
          >
            Yes, Delete My Account
          </button>
          <button
            className="account-settings-btn-primary"
            type="button"
            onClick={() => setConfirmDeleteOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}
