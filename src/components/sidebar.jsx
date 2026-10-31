import { useEffect, useState } from "react";
import { LogOut, Menu, Search, UserRoundCheck } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../contexts/auth_context";
import { useMediaQuery } from "react-responsive";

export default function Sidebar() {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 968 });
  const [isCollapsed, setIsCollapsed] = useState(isTabletOrMobile);
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

  useEffect(() => {
    setIsCollapsed(isTabletOrMobile);
  }, [isTabletOrMobile]);

  return (
    <div
      className={`flex flex-col gap-1 w-70 p-4 pb-0 border-r border-r-black/20 dark:border-r-white/20 relative ${isCollapsed ? "-translate-x-full" : ""}`}
    >
      {elements.map((element, index) => (
        <SidebarElement key={index} to={element.to} onClick={element.onClick}>
          {element.jsx}
        </SidebarElement>
      ))}
      <div
        onClick={() => setIsCollapsed((prevIsCollapsed) => !prevIsCollapsed)}
        className="border border-black/60 hover:border-black dark:border-white/20 rounded-full p-2 w-fit shadow-sm absolute -right-[18px] bg-white active:bg-gray-200"
      >
        <Menu size={17} />
      </div>
    </div>
  );
}

function SidebarElement({ children, to, onClick }) {
  return (
    <Link
      to={to}
      className="flex gap-2 p-4 hover:bg-gray-100/70 rounded-md"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
