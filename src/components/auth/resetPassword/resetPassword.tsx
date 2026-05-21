import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import MainButton from "../../basic/mainButton";
import { resetPassword } from "../../../services/auth";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Error: Passwords do not match.");
      return;
    }

    if (!token) {
      setError("Error: Invalid or missing reset token.");
      return;
    }

    setLoading(true);

    try {
      await resetPassword(token, password);
      setReset(true);
      // Redirect to login after a brief delay
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } catch (err) {
      let errorMessage = "";
      if (typeof err === "string") {
        errorMessage = err.toUpperCase();
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(
        errorMessage || "An unexpected error occurred. Please try again.",
      );
    } finally {
      setLoading(false);
    }
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
            Redirecting to login...
          </p>
        </div>
      )}
    </div>
  );
}
