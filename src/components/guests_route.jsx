import { useAuth } from "../contexts/auth_context.jsx";
import { Outlet, Navigate } from "react-router";

export default function GuestsRoute() {
  const { isAuth, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (isAuth) return <Navigate to="/" replace={true} />;

  return <Outlet />;
}
