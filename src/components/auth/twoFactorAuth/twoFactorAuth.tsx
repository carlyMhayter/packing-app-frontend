import { useState, useRef, useEffect } from "react";
import MainButton from "../../basic/mainButton";
import { useLocation } from "react-router-dom";
import { verify2FA, resend2FACode } from "../../../services/auth";

export default function TwoFactorAuth() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const location = useLocation();
  const [tempToken, setTempToken] = useState(location.state?.tempToken);
  const [resendSent, setResendSent] = useState(false);
  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    setError("");
    const next = [...code];
    next[index] = value;
    setCode(next);
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Pass tempToken explicitly to auth function
    const response = await verify2FA(tempToken, code.join(""));

    if (response) {
      setVerified(true);
    } else {
      setError("Invalid code. Please try again.");
    }
  };
  const handleResend = async () => {
    setLoading(true);
    try {
      const result = await resend2FACode(tempToken);
      console.log("Resend result:", result);
      // setTempToken(result.temp_token);
      // setResendSent(true);
    } catch (e) {
      if (!(e instanceof Error)) {
        const error1 = new Error(e);
        console.log("Error resending code:", error1);
      }
      // console.log("Error resending code:", error);
      // setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  return (
    <div className="login-form">
      <div className={verified ? "fade-out" : ""}>
        <h1>Two-Factor Authentication</h1>
        <p className="login-subtitle">
          Enter the 6-digit code sent to your device.
        </p>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="code-0">Authentication Code</label>
            <div className="code-inputs">
              {code.map((digit, i) => (
                <input
                  key={i}
                  id={i === 0 ? "code-0" : undefined}
                  ref={(el) => {
                    inputsRef.current[i] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="code-digit"
                  required
                />
              ))}
            </div>
          </div>

          {error && <p className="error-banner">{error}</p>}

          <MainButton
            type="submit"
            loading={loading}
            className="login-submit-btn"
          >
            Verify
          </MainButton>
        </form>

        <button type="button" className="btn-text" onClick={handleResend}>
          Resend code
        </button>
        {resendSent && <p className="success-message">Code resent!</p>}
      </div>

      {verified && (
        <div className="success-message">
          <p>
            Success!
            <br />
            Logging you in!
          </p>
        </div>
      )}
    </div>
  );
}
