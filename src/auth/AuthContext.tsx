import React, { createContext, useContext, useMemo, useState } from "react";

const AUTH_KEY = "auth_token";

type AuthContextType = {
  token: string | null;
  isAuthed: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(AUTH_KEY)
  );

  const value = useMemo<AuthContextType>(
    () => ({
      token,
      isAuthed: Boolean(token),
      login: (t: string) => {
        localStorage.setItem(AUTH_KEY, t);
        setToken(t);
      },
      logout: () => {
        localStorage.removeItem(AUTH_KEY);
        setToken(null);
      },
    }),
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
