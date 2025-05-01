import QueryInput from '@/features/QueryInput';
import QueryOutput from '@/features/QueryOutput';
import SchemaList from '@/features/SchemaList';
import DefaultResizeHandler from '@/ui/resizable-panels/DefaultResizeHandler';
import { Panel, PanelGroup } from 'react-resizable-panels';

export default function SandboxEditorPage() {
   return (
      <>
         <PanelGroup
            direction="horizontal"
            // autoSaveId="sandbox-editor-main"
            // storage={localStorage}
         >
            <Panel
               defaultSize={20}
               minSize={10}
               collapsible
               className="border-1"
            >
               <div className="h-full w-full">
                  <SchemaList />
               </div>
            </Panel>

            <DefaultResizeHandler className="w-[2px]" />
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
      </>
   );
}
