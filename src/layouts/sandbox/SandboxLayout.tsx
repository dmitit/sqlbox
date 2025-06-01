import { useDuckDB } from '@/core/DuckDBProvider';
import SandboxHeader from '@/layouts/sandbox/_components/SandboxHeader';
import { addToast } from '@heroui/react';
import { useEffect } from 'react';
import { Outlet } from 'react-router';

function SandboxLayout() {
   const { error } = useDuckDB();

   useEffect(() => {
      if (error) {
         addToast({
            title: 'Error',
            description:
               error.message || 'An error occurred while initializing DuckDB.',
            color: 'danger',
         });
      }
   }, [error]);

   return (
      <>
         <div className="min-h-[100dvh] flex flex-col">
            <SandboxHeader />
            {/* h-0 задает фикс высоту, чтобы дочерние элементы могли работать через
            h-100%, но нужно придумать решение лучше */}
            <main className="grow h-0 flex">
               <Outlet />
            </main>
         </div>
      </>
   );
}

export default SandboxLayout;
