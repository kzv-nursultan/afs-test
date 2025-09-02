import React, { createContext, useContext, useMemo, useState } from "react";
import { AUTH_TOKEN } from "../config";

type AuthContextType = {
  token: string | null;
  isAuthed: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(AUTH_TOKEN)
  );

  const value = useMemo<AuthContextType>(
    () => ({
      token,
      isAuthed: Boolean(token),
      login: (t: string) => {
        localStorage.setItem(AUTH_TOKEN, t);
        setToken(t);
      },
      logout: () => {
        localStorage.removeItem(AUTH_TOKEN);
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
