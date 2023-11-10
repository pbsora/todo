import React, { createContext } from "react";

export interface Sidebar {
  sidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarContext = createContext<Sidebar | null>(null);
