import { SandboxEditorSidebarProvider } from '@/pages/sandbox/editor/SandboxEditorSidebarContext';
import SandboxEditorWorkflow from '@/pages/sandbox/editor/SandboxEditorWorkflow';

const SandboxEditorPage = () => {
   return (
      <SandboxEditorSidebarProvider>
         <SandboxEditorWorkflow />
      </SandboxEditorSidebarProvider>
   );
};

export default SandboxEditorPage;
