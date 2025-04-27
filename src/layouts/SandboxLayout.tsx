import SandboxHeader from '@/ui/SandboxHeader';
import { Outlet } from 'react-router';

function SandboxLayout() {
   return (
      <>
         <SandboxHeader />
         <main>
            <Outlet />
         </main>
      </>
   );
}

export default SandboxLayout;
