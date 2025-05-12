import SandboxFlowSidebar from '@/pages/sandbox/flow/SandboxFlowSidebar';
import { SidebarPanelProvider } from '@/pages/sandbox/flow/SandboxFlowSidebarContext';
import { Panel, PanelGroup } from 'react-resizable-panels';

const SandboxFlowPage = () => {
   return (
      <SidebarPanelProvider>
         <PanelGroup
            direction="horizontal"
            // autoSaveId="sandbox-editor-main"
            // storage={localStorage}
         >
            <SandboxFlowSidebar />

            <Panel defaultSize={20} minSize={10} collapsible>
               <div className="h-full w-full"></div>
            </Panel>
         </PanelGroup>
      </SidebarPanelProvider>
   );
};

export default SandboxFlowPage;
