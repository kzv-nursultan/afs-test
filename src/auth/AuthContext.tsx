import React, { useMemo, useState } from "react";
import { AUTH_TOKEN } from "../config";
import { AuthContext, type AuthContextType } from "./auth-context";

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
