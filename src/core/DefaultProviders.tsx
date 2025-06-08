import { router } from '@/core/routes';
import { DuckDBProvider } from '@/core/DuckDBProvider';
import { HeroUIProvider, ToastProvider } from '@heroui/react';
import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/core/store/store';
import { PrimaryLoader } from '@/ui/PrimaryLoader';
import { GoogleOAuthProvider } from '@react-oauth/google';

export function DefaultProviders() {
   const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

   return (
      <GoogleOAuthProvider clientId={googleClientId}>
         <Provider store={store}>
            <PersistGate loading={<PrimaryLoader />} persistor={persistor}>
               <DuckDBProvider>
                  <HeroUIProvider>
                     <RouterProvider router={router} />
                     <ToastProvider
                        maxVisibleToasts={7}
                        toastProps={{ variant: 'flat' }}
                     />
                  </HeroUIProvider>
               </DuckDBProvider>
            </PersistGate>
         </Provider>
      </GoogleOAuthProvider>
   );
}
