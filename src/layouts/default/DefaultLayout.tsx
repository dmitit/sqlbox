import DefaultHeader from '@/layouts/default/_components/DefaultHeader';
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
