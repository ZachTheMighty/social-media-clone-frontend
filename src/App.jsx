import { Outlet } from "react-router";
import { AuthProvider } from "./contexts/auth_context.jsx";

export default function App() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
