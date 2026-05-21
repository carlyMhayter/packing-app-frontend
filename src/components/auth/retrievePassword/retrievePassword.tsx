import { useState } from "react";
import MainButton from "../../basic/mainButton";
import { forgotPassword } from "../../../services/auth";

export default function RetrievePassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await forgotPassword(email);
      setSent(true);
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
      <div className={sent ? "fade-out" : ""}>
        <h1>Reset Password</h1>
        <p className="login-subtitle">
          Enter your email and we'll send you a reset link.
        </p>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="reset-email">Email</label>
            <input
              id="reset-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="you@example.com"
              required
            />
          </div>

          {error && <p className="error-banner">{error}</p>}

          <MainButton
            type="submit"
            loading={loading}
            className="login-submit-btn"
          >
            Send Reset Link
          </MainButton>
        </form>
      </div>

      {sent && (
        <div className="success-message">
          <p>
            Link sent!
            <br />
            Check your email.
          </p>
        </div>
      )}
    </div>
  );
}
