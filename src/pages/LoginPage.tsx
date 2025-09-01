import React, { useState } from "react";
import { AuthLayout } from "../layouts/Authentication/Athentication";
import { TextField } from "../components/TextField/TextField";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError("Please enter username and password.");
      return;
    }

    try {
      setLoading(true);

      // --- plug in your API call here ---
      // const { data } = await http.post("/auth/login", { username, password });
      // save token etc., then navigate
      await new Promise((r) => setTimeout(r, 500)); // demo delay

      // navigate("/")
      // -------------------------------
    } catch {
      //setError(err?.message ?? "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Sign in"
      subtitle="Access your All Funeral Services account"
    >
      <form onSubmit={onSubmit} className="auth__form">
        <div className="auth__field">
          <label htmlFor="username" className="auth__label">
            Username
          </label>
          <TextField
            id="username"
            placeholder="you@example.com"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
        </div>

        <div className="auth__field auth__password">
          <label htmlFor="password" className="auth__label">
            Password
          </label>
          <TextField
            id="password"
            type={showPw ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <button
            type="button"
            className="auth__toggle"
            onClick={() => setShowPw((v) => !v)}
            aria-label={showPw ? "Hide password" : "Show password"}
          >
            {showPw ? "Hide" : "Show"}
          </button>
        </div>

        {error && <div className="auth__error">{error}</div>}

        <div className="auth__actions">
          <button className="auth__submit" type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
