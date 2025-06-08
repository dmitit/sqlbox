import { Link, Outlet } from 'react-router';
import { selectIsAuthenticated } from '@/core/store/auth.slice';
import { useSelector } from 'react-redux';
import PrimaryContainer from '@/ui/PrimaryContainer';
import { LogIn } from 'lucide-react';
import PrimaryHeaderLogin from '@/ui/PrimaryHeaderLogin';

const ProtectedRoute = () => {
   const isAuthenticated = useSelector(selectIsAuthenticated);

   if (!isAuthenticated) {
      return (
         <div className="bg-white dark:bg-gray-900 flex flex-col min-h-screen">
            <PrimaryContainer className="py-8 text-center flex-grow flex flex-col items-center justify-center">
               <LogIn
                  size={64}
                  className="text-primary-600 dark:text-primary-500 mb-6"
               />
               <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Access Denied
               </h1>
               <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md">
                  The page you are trying to access requires authentication.
                  Please log in to continue.
               </p>
               <div className="mb-8">
                  <PrimaryHeaderLogin />
               </div>
               <p className="text-sm text-gray-500 dark:text-gray-400">
                  After logging in, you will be redirected to your intended
                  page. If not, you can{' '}
                  <Link to="/" color="primary" className="underline">
                     click here to go to the home page
                  </Link>
                  .
               </p>
            </PrimaryContainer>
         </div>
      );
   }

   return <Outlet />;
};

export default ProtectedRoute;
