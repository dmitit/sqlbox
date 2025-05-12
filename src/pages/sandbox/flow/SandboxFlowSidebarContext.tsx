import { createContext, useContext, useState } from 'react';

type SidebarPanel = 'schemas' | 'databases' | null;

interface SidebarPanelContextType {
   openPanel: SidebarPanel;
   setOpenPanel: (panel: SidebarPanel) => void;
}

const SidebarPanelContext = createContext<SidebarPanelContextType | undefined>(
   undefined,
);

export const SidebarPanelProvider = ({
   children,
}: {
   children: React.ReactNode;
}) => {
   const [openPanel, setOpenPanel] = useState<SidebarPanel>(null);

   return (
      <SidebarPanelContext.Provider value={{ openPanel, setOpenPanel }}>
         {children}
      </SidebarPanelContext.Provider>
   );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSidebarPanel = () => {
   const ctx = useContext(SidebarPanelContext);
   if (!ctx)
      throw new Error(
         'useSidebarPanel must be used within SidebarPanelProvider',
      );
   return ctx;
};
