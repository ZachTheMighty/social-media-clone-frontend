import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/auth_context.jsx";

export default function ProtectedRoute() {
  const { isAuth, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuth) return <Navigate to="/login" replace={true} />;

  return <Outlet />;
}
