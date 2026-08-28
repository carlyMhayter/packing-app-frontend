import { useState, useRef, useEffect } from "react";
import MainButton from "../../basic/mainButton";
import { useNavigate } from "react-router-dom";
import "./styles/twoFactorAuth.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  selectAuthError,
  verify2FAThunk,
  selectAuthLoading,
  resend2FAThunk,
} from "../../../state/appSlice";

export default function TwoFactorAuth() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [verified, setVerified] = useState(false);
  const [resendSent, setResendSent] = useState(false);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const paramsString = new URL(window.location.href).searchParams;
  const token = paramsString.get("tempToken");

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
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

    try {
      const codeString = code.join("").toString();
      dispatch(verify2FAThunk({ token: token!, code: codeString })).unwrap();

      setVerified(true);
      navigate("/dashboard");
    } catch {
      console.log("Error:", error);
    }
  };

  const handleResend = async () => {
    try {
      dispatch(resend2FAThunk({ token: token! })).unwrap();
      setResendSent(true);
    } catch (err) {
      console.log("Error:", err);
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
