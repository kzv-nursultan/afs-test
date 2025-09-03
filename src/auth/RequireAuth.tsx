import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";


export function RequireAuth() {
  const { isAuthed } = useAuth();
  const location = useLocation();
  if (!isAuthed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
}
