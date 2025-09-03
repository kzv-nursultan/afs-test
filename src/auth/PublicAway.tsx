import { Navigate, Outlet } from "react-router-dom";

import { MOCK_ORGANIZATION_ID } from "../config";
import { useAuth } from "./useAuth";

export function PublicOnly() {
  const { isAuthed } = useAuth();
  if (isAuthed) return <Navigate to={`/${MOCK_ORGANIZATION_ID}`} replace />;
  return <Outlet />;
}
