import { LogOut, Search, UserRoundCheck, Mail } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../contexts/auth_context";
import { useSidebar } from "../contexts/sidebar_context";
import HamburgerMenu from "./hamburger_menu";
import { motion } from "motion/react";

export default function Sidebar() {
  const { isCollapsed, setIsCollapsed, isTabletOrMobile } = useSidebar();
  const { setIsAuth } = useAuth();
  const elements = [
    {
      jsx: (
        <>
          <Search />
          <div>Search for People</div>
        </>
      ),
      to: "search",
    },
    {
      jsx: (
        <>
          <Mail />
          <div>Requests</div>
        </>
      ),
      to: "requests",
    },
    {
      jsx: (
        <>
          <UserRoundCheck />
          <div>Following</div>
        </>
      ),
      to: "following",
    },
    {
      jsx: (
        <>
          <UserRoundCheck />
          <div>Followers</div>
        </>
      ),
      to: "followers",
    },
    {
      jsx: (
        <>
          <LogOut />
          <div>Logout</div>
        </>
      ),
      onClick: () => {
        localStorage.removeItem("token");
        setIsAuth(false);
      },
    },
  ];

  return (
    <motion.div
      layout="position"
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className={`flex flex-col gap-1 w-70 p-4 pr-6 pb-0 border-r border-r-black/20 dark:border-r-white/20 ${isCollapsed ? "absolute h-full -translate-x-full" : "translate-x-0"} ${isTabletOrMobile && "absolute h-full z-10 bg-white dark:bg-[#0e1113]"} `}
    >
      {elements.map((element, index) => (
        <SidebarElement
          key={index}
          to={element.to}
          onClick={() => {
            element.onClick;
            isTabletOrMobile && setIsCollapsed(!isCollapsed);
          }}
        >
          {element.jsx}
        </SidebarElement>
      ))}
      {!isTabletOrMobile && <HamburgerMenu location="sidebar" />}
    </motion.div>
  );
}

function SidebarElement({ children, to, onClick }) {
  return (
    <Link
      to={to}
      className="flex gap-2 p-4 hover:bg-gray-100/70 hover:dark:bg-gray-700/30 active:bg-black/20 active:dark:bg-white/20 rounded-md"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
