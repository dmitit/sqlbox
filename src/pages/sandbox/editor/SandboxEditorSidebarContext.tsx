import { createContext, useContext, useState } from 'react';

export type SandboxEditorSidebarPanel = 'schemas' | 'databases' | null;

interface SandboxEditorSidebarContextType {
   activePanel: SandboxEditorSidebarPanel;
   toggleActivePanel: (panel: SandboxEditorSidebarPanel) => void;
}

const SandboxEditorSidebarContext = createContext<
   SandboxEditorSidebarContextType | undefined
>(undefined);

export const SandboxEditorSidebarProvider = ({
   children,
}: {
   children: React.ReactNode;
}) => {
   const [activePanel, setActivePanel] =
      useState<SandboxEditorSidebarPanel>('schemas');

   const toggleActivePanel = (panel: SandboxEditorSidebarPanel) => {
      setActivePanel((prev) => (prev === panel ? null : panel));
   };

   return (
      <SandboxEditorSidebarContext.Provider
         value={{ activePanel, toggleActivePanel }}
      >
         {children}
      </SandboxEditorSidebarContext.Provider>
   );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useEditorSidebar = () => {
   const ctx = useContext(SandboxEditorSidebarContext);
   if (!ctx)
      throw new Error(
         'useSidebarPanel must be used within SidebarPanelProvider',
      );
   return ctx;
};
