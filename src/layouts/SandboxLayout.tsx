import SandboxHeader from '@/ui/SandboxHeader';
import { Outlet } from 'react-router';

function SandboxLayout() {
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
