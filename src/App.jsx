import { Outlet } from "react-router";
import { AuthProvider } from "./contexts/auth_context.jsx";
import { ThemeProvider } from "./contexts/theme_context.jsx";
import { UsersProvider } from "./contexts/users_context.jsx";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <UsersProvider>
          <Outlet />
        </UsersProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
