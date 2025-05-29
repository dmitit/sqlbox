import {
   DuckDBConnectionProvider,
   useDuckDBConnection,
} from '@/core/DuckDBConnectionProvider';
import { SandboxEditorSidebarProvider } from '@/pages/sandbox/editor/SandboxEditorSidebarContext';
import SandboxEditorWorkflow from '@/pages/sandbox/editor/SandboxEditorWorkflow';
import { PrimaryLoader } from '@/ui/PrimaryLoader';

const InnerSandboxEditorPage = () => {
   const { isLoading, error } = useDuckDBConnection();

   if (isLoading) {
      return <PrimaryLoader />;
   }

   if (error) {
      return (
         <div className="flex items-center justify-center h-full">
            <div className="text-red-500">
               {error.message ||
                  'An error occurred while connecting to DuckDB.'}
            </div>
         </div>
      );
   }

   return (
      <SandboxEditorSidebarProvider>
         <SandboxEditorWorkflow />
      </SandboxEditorSidebarProvider>
   );
};

const SandboxEditorPage = () => {
   return (
      <DuckDBConnectionProvider>
         <InnerSandboxEditorPage />
      </DuckDBConnectionProvider>
   );
};

export default SandboxEditorPage;
