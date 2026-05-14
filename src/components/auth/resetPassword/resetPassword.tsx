import { useState } from "react";
import MainButton from "../../basic/mainButton";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);
  const [error, setError] = useState(
    "Error: Unable to reset password. Token may be expired or invalid.",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Error: Passwords do not match.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Simulate API error 30% of the time for demo
      if (Math.random() < 0.3) {
        setError(
          "Error: Unable to reset password. Token may be expired or invalid.",
        );
        return;
      }
      setReset(true);
    }, 2000);
  };

  return (
    <div className="login-form">
      <div className={reset ? "fade-out" : ""}>
        <h1>Set New Password</h1>
        <p className="login-subtitle">Enter your new password below.</p>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="new-password">New Password</label>
            <input
              id="new-password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter new password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm-new-password">Confirm Password</label>
            <input
              id="confirm-new-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              placeholder="Confirm new password"
              required
            />
          </div>

          {error && <p className="error-banner">{error}</p>}

          <MainButton
            type="submit"
            loading={loading}
            className="login-submit-btn"
          >
            Reset Password
          </MainButton>
        </form>
      </div>

      {reset && (
        <div className="success-message">
          <p>
            Password updated!
            <br />
            Logging you in!
          </p>
        </div>
      )}
    </div>
  );
}
