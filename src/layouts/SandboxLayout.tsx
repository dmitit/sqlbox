import { useDuckDB } from '@/lib/duckdb/context/useDuckDB';
import SandboxHeader from '@/ui/SandboxHeader';
import { CircularProgress } from '@heroui/react';
import { Outlet } from 'react-router';

function SandboxLayout() {
   const { isLoading } = useDuckDB();

   if (isLoading) {
      return (
         <div className="min-h-[100dvh] flex flex-col justify-center items-center">
            <CircularProgress aria-label="Loading..." size="lg" />
         </div>
      );
   }

   return (
      <>
         <div className="min-h-[100dvh] flex flex-col">
            <SandboxHeader />
            {/* h-0 задает фикс высоту, чтобы дочерние элементы могли работать через
            h-100%, но нужно придумать решение лучше */}
            <main className="grow h-0">
               <Outlet />
            </main>
         </div>
      </>
   );
}

export default SandboxLayout;
