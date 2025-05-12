import SandboxSidebarButton from '@/pages/sandbox/_components/SandboxSidebarButton';
import { useSidebarPanel } from '@/pages/sandbox/flow/SandboxFlowSidebarContext';
import { Database, Download, Table2 } from 'lucide-react';

const SandboxFlowSidebar = () => {
   const { openPanel, setOpenPanel } = useSidebarPanel();

   return (
      <div className="border-r-[2px] border-foreground-200 w-12 h-full">
         <div className="flex flex-col items-center">
            <SandboxSidebarButton
               isActive={openPanel === 'schemas'}
               label="Schemas"
               onClick={() =>
                  setOpenPanel(openPanel === 'schemas' ? null : 'schemas')
               }
            >
               <Table2 />
            </SandboxSidebarButton>
            <SandboxSidebarButton
               isActive={openPanel === 'databases'}
               label="Databases"
               onClick={() =>
                  setOpenPanel(openPanel === 'databases' ? null : 'databases')
               }
            >
               <Database />
            </SandboxSidebarButton>
            <SandboxSidebarButton
               label="Export"
               onClick={() => alert('Exporting...')}
            >
               <Download />
            </SandboxSidebarButton>
         </div>
      </div>
   );
};

export default SandboxFlowSidebar;
