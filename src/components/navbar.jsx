import { SquarePlus, Bell, Moon, Sun } from "lucide-react";
import { useAuth } from "../contexts/auth_context.jsx";
import { Link } from "react-router";
import { useTheme } from "../contexts/theme_context.jsx";

export default function Navbar() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex justify-between items-center px-4 py-2 border-b border-b-black/20 dark:border-b-white/20">
      <Link to="/" className="text-2xl">
        Logo
      </Link>
      <div className="flex justify-between items-center gap-2">
        <div className="flex">
          <div
            onClick={toggleTheme}
            className="p-[11px] hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
          >
            {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
          </div>
          <Link
            to="/posts/new"
            className="p-[11px] hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
          >
            <SquarePlus size={19} />
          </Link>
          <Link
            to="/notifications"
            className="p-[11px] hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
          >
            <Bell size={19} />
          </Link>
        </div>
        <Link
          to="/profile"
          className="rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <img
            src={user.picture}
            alt="Profile picture"
            className="w-8 h-8 rounded-full object-cover"
          />
        </Link>
      </div>
    </div>
  );
}
