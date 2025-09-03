import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { MOCK_ORGANIZATION_ID } from "../config";

export function PublicOnly() {
  const { isAuthed } = useAuth();
  if (isAuthed) return <Navigate to={`/${MOCK_ORGANIZATION_ID}`} replace />;
  return <Outlet />;
}
