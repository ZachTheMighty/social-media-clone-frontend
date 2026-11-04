import Navbar from "./navbar.jsx";
import Sidebar from "./sidebar.jsx";
import { SidebarProvider } from "../contexts/sidebar_context.jsx";
import { LayoutGroup, motion } from "motion/react";

export default function MainLayout({ children }) {
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
      </div>
    </SidebarProvider>
  );
}
