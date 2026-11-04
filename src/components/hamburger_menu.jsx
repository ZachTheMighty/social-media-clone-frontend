import { useSidebar } from "../contexts/sidebar_context.jsx";
import { Menu } from "lucide-react";

export default function HamburgerMenu({ location }) {
  const { setIsCollapsed } = useSidebar();
  return (
    <div
      onClick={() => setIsCollapsed((prevIsCollapsed) => !prevIsCollapsed)}
      className={`${location === "sidebar" ? "border border-black/60 hover:border-black dark:border-white/20 p-2 shadow-sm absolute -right-[18px] bg-white active:bg-gray-200" : "hover:bg-gray-200 active:bg-gray-300 p-3"} rounded-full`}
    >
      <Menu size={location === "sidebar" ? 17 : 20} />
    </div>
  );
}
