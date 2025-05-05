import { createContext } from 'react';
import { AsyncDuckDBConnection } from '@duckdb/duckdb-wasm';

export const DuckDBContext = createContext<{
   db: AsyncDuckDBConnection | null;
   isLoading: boolean;
   error: Error | null;
}>({
   db: null,
   isLoading: true,
   error: null,
});
