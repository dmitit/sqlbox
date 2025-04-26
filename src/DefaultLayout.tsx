import { Outlet } from 'react-router';
import DefaultHeader from './ui/DefaultHeader';

export default function DefaultLayout() {
   return (
      <>
         <DefaultHeader />
         <main>
            <Outlet />
         </main>
         {/* <CoreFooter /> */}
      </>
   );
}
