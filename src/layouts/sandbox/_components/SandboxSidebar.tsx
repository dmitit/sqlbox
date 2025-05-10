import SandboxSidebarButton from '@/layouts/sandbox/_components/SandboxSidebarButton';
import { Database, Download, Table2 } from 'lucide-react';

const SandboxSidebar = () => {
   return (
      <div className="flex flex-col items-center">
         <SandboxSidebarButton isActive label="Schemas">
            <Table2 />
         </SandboxSidebarButton>
         <SandboxSidebarButton label="Databases">
            <Database />
         </SandboxSidebarButton>
         <SandboxSidebarButton label="Export">
            <Download />
         </SandboxSidebarButton>
      </div>
   );
};

export default SandboxSidebar;
