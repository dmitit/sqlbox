import {
   DuckDBConnectionProvider,
   useDuckDBConnection,
} from '@/core/DuckDBConnectionProvider';
import { SidebarPanelProvider } from '@/pages/sandbox/flow/SandboxFlowSidebarContext';
import SandboxFlowWorkflow from '@/pages/sandbox/flow/SandboxFlowWorkflow';
import { PrimaryLoader } from '@/ui/PrimaryLoader';
import { addToast } from '@heroui/react';
import { useEffect } from 'react';

const InnerSandboxFlowPage = () => {
   const { isLoading, error } = useDuckDBConnection();

   useEffect(() => {
      if (error) {
         addToast({
            title: 'Error',
            description:
               error.message || 'An error occurred while connecting to DuckDB.',
            color: 'danger',
         });
      }
   }, [error]);

   if (isLoading) {
      return <PrimaryLoader />;
   }

   return (
      <SidebarPanelProvider>
         <SandboxFlowWorkflow />
      </SidebarPanelProvider>
   );
};

const SandboxFlowPage = () => {
   return (
      <DuckDBConnectionProvider>
         <InnerSandboxFlowPage />
      </DuckDBConnectionProvider>
   );
};

export default SandboxFlowPage;
