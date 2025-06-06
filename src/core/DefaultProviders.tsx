import { router } from '@/core/routes';
import { DuckDBProvider } from '@/core/DuckDBProvider';
import { HeroUIProvider, ToastProvider } from '@heroui/react';
import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/core/store/store';
import { PrimaryLoader } from '@/ui/PrimaryLoader';

export function DefaultProviders() {
   return (
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
   );
}
