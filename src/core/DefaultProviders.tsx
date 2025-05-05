import { router } from '@/core/routes';
import { DuckDBProvider } from '@/lib/duckdb/context/DuckDBProvider';
import { HeroUIProvider } from '@heroui/react';
import { RouterProvider } from 'react-router';

export function DefaultProviders() {
   return (
      <DuckDBProvider>
         <HeroUIProvider>
            <RouterProvider router={router} />
         </HeroUIProvider>
      </DuckDBProvider>
   );
}
