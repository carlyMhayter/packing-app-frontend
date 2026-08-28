import { useState } from "react";
import MainButton from "../../basic/mainButton";
import { useNavigate } from "react-router-dom";
import "./styles/login.css";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import {
  loginThunk,
  selectAuthLoading,
  selectAuthError,
} from "../../../state/appSlice";
import { useAppSelector } from "../../../hooks/reduxHooks";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(loginThunk({ email, password })).unwrap();
      setLoggedIn(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      // if the response requires 2fa, there will be a temp token in the response,
      // go to 2fa login
      if (
        error &&
        typeof error == "object" &&
        "requires_2fa" in error &&
        error.requires_2fa &&
        "temp_token" in error
      ) {
        navigate("/auth/two_factor", {
          state: { tempToken: error.temp_token },
        });
        return;
      }
    }
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    console.log("Google login clicked");
  };

  return (
    <div className="login-form">
      <div className={loggedIn ? "fade-out" : ""}>
        <h1>Welcome Back</h1>
        <p className="login-subtitle">Please log in to continue.</p>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <p className="error-banner">{error}</p>}

          <MainButton
            type="submit"
            loading={loading}
            className="login-submit-btn"
          >
            Log In
          </MainButton>
        </form>
        {loggedIn && (
          <div className="success-message">
            <p>
              Welcome back!
              <br />
              Logging you in!
            </p>
          </div>
        )}

        <div className="separator">
          <span className="separator-line" />
          <span className="separator-text">or</span>
          <span className="separator-line" />
        </div>

        <button
          type="button"
          className="btn-social"
          onClick={handleGoogleLogin}
        >
          <svg
            className="social-icon"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.19 3.32v2.77h3.54c2.08-1.92 3.27-4.74 3.27-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.54-2.77c-.98.66-2.23 1.06-3.74 1.06-2.87 0-5.3-1.94-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.86-2.59 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>
      </div>

      {loggedIn && (
        <div className="success-message">
          <p>
            Welcome back!
            <br />
            Logging you in!
          </p>
        </div>
      )}
    </div>
  );
}
