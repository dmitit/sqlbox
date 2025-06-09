import { useRef, useState, useLayoutEffect } from 'react';
import SandboxSidebarButton from '@/pages/sandbox/_components/SandboxSidebarButton';
import { Database, Download, History, Table2 } from 'lucide-react';
import { useEditorSidebar } from '@/pages/sandbox/editor/SandboxEditorSidebarContext';

const SandboxEditorSidebar = () => {
   const { activePanel, toggleActivePanel } = useEditorSidebar();
   const activeButtonRef = useRef<HTMLButtonElement>(null);
   const [highlightStyle, setHighlightStyle] = useState({ top: 0, height: 0 });

   useLayoutEffect(() => {
      if (activeButtonRef.current && activePanel) {
         setHighlightStyle({
            top: activeButtonRef.current.offsetTop,
            height: activeButtonRef.current.offsetHeight,
         });
      }
   }, [activePanel, toggleActivePanel]);

   return (
      <div className="border-r-2 border-gray-200 w-12 h-full relative">
         {activePanel && (
            <span
               className="absolute left-0 w-[3px] bg-primary-600 rounded-r transition-all duration-200 z-10"
               style={highlightStyle}
            />
         )}

         <div className="flex flex-col items-center">
            <SandboxSidebarButton
               label="Schemas"
               ref={activePanel === 'schemas' ? activeButtonRef : null}
               isActive={activePanel === 'schemas'}
               onClick={() => toggleActivePanel('schemas')}
            >
               <Table2 />
            </SandboxSidebarButton>

            <SandboxSidebarButton
               label="Databases"
               ref={activePanel === 'queryHistory' ? activeButtonRef : null}
               isActive={activePanel === 'queryHistory'}
               onClick={() => toggleActivePanel('queryHistory')}
            >
               <History />
            </SandboxSidebarButton>

            <SandboxSidebarButton
               label="Export"
               onClick={() => alert('Export...')}
            >
               <Download />
            </SandboxSidebarButton>
         </div>
      </div>
   );
};

export default SandboxEditorSidebar;
