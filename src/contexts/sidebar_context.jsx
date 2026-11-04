import { createContext, useContext, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

const SidebarContext = createContext(null);

export function SidebarProvider({ children }) {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 968 });
  const [isCollapsed, setIsCollapsed] = useState(isTabletOrMobile);

  useEffect(() => {
    setIsCollapsed(isTabletOrMobile);
  }, [isTabletOrMobile]);

  return (
    <SidebarContext value={{ isCollapsed, setIsCollapsed, isTabletOrMobile }}>
      {children}
    </SidebarContext>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
