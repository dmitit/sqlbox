import { router } from '@/core/routes';
import { HeroUIProvider } from '@heroui/react';
import { RouterProvider } from 'react-router';

export function DefaultProviders() {
   return (
      <HeroUIProvider>
         <RouterProvider router={router} />
      </HeroUIProvider>
   );
}
