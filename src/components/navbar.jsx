import { SquarePlus, Bell } from "lucide-react";
import { useAuth } from "../contexts/auth_context.jsx";
import { Link } from "react-router";
import { useSidebar } from "../contexts/sidebar_context.jsx";
import HamburgerMenu from "./hamburger_menu.jsx";
import ThemeSwitch from "./theme_swtich.jsx";

export default function Navbar() {
  const { user } = useAuth();
  const { isTabletOrMobile } = useSidebar();

  return (
    <div className="flex justify-between items-center px-4 py-2 border-b border-b-black/20 dark:border-b-white/20">
      <div className="flex items-center gap-2">
        {isTabletOrMobile && <HamburgerMenu />}
        <Link to="/" className="text-2xl">
          Logo
        </Link>
      </div>
      <div className="flex justify-between items-center gap-2">
        <div className="flex">
          <ThemeSwitch />
          <NavbarElement to="posts/new">
            <SquarePlus size={19} />
          </NavbarElement>

          <NavbarElement to="notifications">
            <Bell size={19} />
          </NavbarElement>
        </div>
        <NavbarElement to="profile">
          <img
            src={user.picture}
            alt="Profile picture"
            className="w-8 h-8 rounded-full object-cover"
          />
        </NavbarElement>
      </div>
    </div>
  );
}

function NavbarElement({ children, to = location, onClick = "" }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${to === "profile" ? "p-1" : "p-[11px]"} hover:bg-gray-200 dark:hover:bg-gray-700 active:dark:bg-gray-500 rounded-full`}
    >
      {children}
    </Link>
  );
}
