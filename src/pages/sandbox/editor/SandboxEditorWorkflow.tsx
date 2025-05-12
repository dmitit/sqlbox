import DatabasesList from '@/features/DatabasesList';
import QueryInput from '@/features/QueryInput';
import QueryOutput from '@/features/QueryOutput';
import SchemasList from '@/features/SchemaList';
import SandboxEditorSidebar from '@/pages/sandbox/editor/SandboxEditorSidebar';
import { useEditorSidebar } from '@/pages/sandbox/editor/SandboxEditorSidebarContext';
import DefaultResizeHandler from '@/ui/resizable-panels/DefaultResizeHandler';
import { useEffect, useRef } from 'react';
import {
   ImperativePanelHandle,
   Panel,
   PanelGroup,
} from 'react-resizable-panels';

const SandboxEditorWorkflow = () => {
   const { activePanel } = useEditorSidebar();
   const ref = useRef<ImperativePanelHandle>(null);

   useEffect(() => {
      if (!ref.current) return;

      if (activePanel === null) {
         ref.current.collapse();
      } else {
         if (ref.current.isCollapsed()) {
            ref.current.expand(); // или ref.current.expand(20) для конкретного размера
         }
      }
   }, [activePanel]);

   return (
      <PanelGroup
         direction="horizontal"
         // autoSaveId="sandbox-editor-main"
         // storage={localStorage}
      >
         <SandboxEditorSidebar />

         <Panel defaultSize={20} minSize={10} collapsible ref={ref}>
            <div className="h-full w-full">
               {activePanel === 'schemas' && <SchemasList />}
               {activePanel === 'databases' && <DatabasesList />}
            </div>
         </Panel>

         {activePanel !== null && <DefaultResizeHandler className="w-[2px]" />}

         <Panel defaultSize={80} minSize={10} collapsible>
            <PanelGroup
               direction="vertical"
               // autoSaveId="sandbox-editor-codearea"
               // storage={localStorage}
            >
               <Panel defaultSize={50}>
                  <div className="h-full w-full">
                     <QueryInput />
                  </div>
               </Panel>
               <DefaultResizeHandler className="h-[2px]" />
               <Panel defaultSize={50} minSize={20} maxSize={80} collapsible>
                  <div className="h-full w-full">
                     <QueryOutput />
                  </div>
               </Panel>
            </PanelGroup>
         </Panel>
      </PanelGroup>
   );
};

export default SandboxEditorWorkflow;
