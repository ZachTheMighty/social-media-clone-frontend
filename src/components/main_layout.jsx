import { useSidebar } from "../contexts/sidebar_context.jsx";
import Navbar from "./navbar.jsx";
import Sidebar from "./sidebar.jsx";
import { LayoutGroup, motion } from "motion/react";

export default function MainLayout({ children }) {
  const { isCollapsed, setIsCollapsed, isTabletOrMobile } = useSidebar();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex">
          <LayoutGroup>
            <Sidebar />
            <motion.div
              layout="position"
              transition={{
                layout: {
                  duration: 0.3,
                  ease: "easeInOut",
                },
              }}
              className="flex-1"
            >
              {children}
            </motion.div>
          </LayoutGroup>
        </div>
=======
>>>>>>> Stashed changes
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex relative">
        <LayoutGroup>
          <Sidebar />
          <motion.div
            layout="position"
            transition={{
              layout: {
                duration: 0.3,
                ease: "easeInOut",
              },
            }}
<<<<<<< Updated upstream
            className="flex-1"
=======
            className="flex-1 max-h-screen overflow-scroll"
>>>>>>> Stashed changes
          >
            {children}
            {isTabletOrMobile && !isCollapsed && (
              <div
                onClick={() =>
                  setIsCollapsed((prevIsCollapsed) => !prevIsCollapsed)
                }
                className="absolute w-full top-0 h-full z-9 bg-black/60"
              ></div>
            )}
          </motion.div>
        </LayoutGroup>
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
      </div>
    </div>
  );
}
