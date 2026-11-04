import Navbar from "./navbar.jsx";
import Sidebar from "./sidebar.jsx";
import { SidebarProvider } from "../contexts/sidebar_context.jsx";

export default function MainLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex">
          <Sidebar />
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
