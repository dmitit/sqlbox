import { router } from '@/core/routes';
import { DuckDBProvider } from '@/core/DuckDBProvider';
import { HeroUIProvider, ToastProvider } from '@heroui/react';
import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import store from '@/core/store/store';

export function DefaultProviders() {
   return (
      <Provider store={store}>
         <DuckDBProvider>
            <HeroUIProvider>
               <RouterProvider router={router} />
               <ToastProvider
                  maxVisibleToasts={7}
                  toastProps={{ variant: 'flat' }}
               />
            </HeroUIProvider>
         </DuckDBProvider>
      </Provider>
   );
}
