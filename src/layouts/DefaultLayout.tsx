import DefaultHeader from '@/ui/DefaultHeader';
import { Outlet } from 'react-router';

function DefaultLayout() {
   return (
      <>
         <DefaultHeader />
         <main>
            <Outlet />
         </main>
      </>
   );
}

export default DefaultLayout;
