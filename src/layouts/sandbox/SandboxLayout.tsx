import { useDuckDB } from '@/core/DuckDBProvider';
import SandboxHeader from '@/layouts/sandbox/_components/SandboxHeader';
import { PrimaryLoader } from '@/ui/PrimaryLoader';
import { Outlet } from 'react-router';

function SandboxLayout() {
   const { isLoading } = useDuckDB();

   if (isLoading) {
      return <PrimaryLoader />;
   }

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
