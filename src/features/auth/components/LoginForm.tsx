import React, { useState } from "react";
import { TextField } from "../../../components/TextField/TextField";
import s from "./LoginForm.module.scss";
import { Button } from "../../../components/Button/Button";
import { Eye } from "../../../icons/Eye";
import { EyeOff } from "../../../icons/EyeOff";
import { http } from "../../../api/client";
import { useAuth } from "../../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { readAxiosHeader } from "../../utils/readAxiosHeader";

interface UserData {
  username: string;
  password: string;
}

type FormErrors = Partial<UserData> | null;

const InitialUserData = { username: "", password: "" };

const validateAndSetErrors = (
  userData: UserData,
  setError: (value: React.SetStateAction<FormErrors>) => void
): boolean => {
  const errors: FormErrors = {};
  const username = userData.username?.trim();
  const password = userData.password?.trim();

  if (!username) errors.username = "Username is required";
  if (!password) errors.password = "Password is required";

  if (Object.keys(errors).length) {
    setError(errors);
    return true;
  }
  return false;
};

const validateAndSaveToken = (
  token: string | undefined,
  login: (token: string) => void
): boolean => {
  if (!token) {
    return false;
  }
  login(token);
  http.defaults.headers.common.Authorization = `Bearer ${token}`;
  return true;
};

export default function LoginForm() {
  const [userData, setUserdata] = useState<UserData>(InitialUserData);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<FormErrors>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (validateAndSetErrors(userData, setError)) return;

    try {
      setLoading(true);

      const res = await http.get("/auth", {
        params: {
          user: userData.username,
        },
      });

      const token = readAxiosHeader(res.headers, "authorization");
      if (!validateAndSaveToken(token, login)) return;
      navigate("/");
    } catch (err) {
      console.error("Auth error", err);
    } finally {
      setLoading(false);
    }
  }

  const inputOnChangeHandler = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setUserdata((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const toggleShowModal = () => setShowPw((prev) => !prev);

  return (
    <form onSubmit={onSubmit} className={s["auth__form"]}>
      <div className={s["auth__field"]}>
        <label htmlFor="username" className={s["auth__label"]}>
          Username
        </label>
        <TextField
          id="username"
          placeholder="Username"
          autoComplete="username"
          name="username"
          value={userData.username}
          onChange={inputOnChangeHandler}
          invalid={!!error && !!error?.username}
        />
      </div>

      <div className={s["auth__field"]}>
        <label htmlFor="password" className={s["auth__label"]}>
          Password
        </label>
        <div className={s["auth__password"]}>
          <TextField
            id="password"
            name="password"
            type={showPw ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="current-password"
            value={userData.password}
            onChange={inputOnChangeHandler}
            invalid={!!error && !!error?.password}
          />
          <div className={s["auth__icon-button"]}>
            <Button
              type="button"
              variant="filled-icon"
              onClick={toggleShowModal}
              aria-label={showPw ? "Hide password" : "Show password"}
              icon={showPw ? <Eye /> : <EyeOff />}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className={s["auth__error"]}>
          {error.username || error.password}
        </div>
      )}

      <div className={s["auth__actions"]}>
        <Button
          variant="filled"
          disabled={loading}
          label={loading ? "Signing in…" : "Sign in"}
        />
      </div>
    </form>
  );
}
