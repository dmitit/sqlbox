import SandboxFlowSidebar from '@/pages/sandbox/flow/SandboxFlowSidebar';
import { Panel, PanelGroup } from 'react-resizable-panels';

const SandboxFlowWorkflow = () => {
   return (
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
   );
};

export default SandboxFlowWorkflow;
