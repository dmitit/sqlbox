import {
   DuckDBConnectionProvider,
   useDuckDBConnection,
} from '@/core/DuckDBConnectionProvider';
import { SandboxEditorSidebarProvider } from '@/pages/sandbox/editor/SandboxEditorSidebarContext';
import SandboxEditorWorkflow from '@/pages/sandbox/editor/SandboxEditorWorkflow';
import { PrimaryLoader } from '@/ui/PrimaryLoader';
import { addToast } from '@heroui/react';
import { useEffect } from 'react';

const InnerSandboxEditorPage = () => {
   const { isLoading, error } = useDuckDBConnection();

   // Without useEffect, react will throw an error react.dev/link/setstate-in-render
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
