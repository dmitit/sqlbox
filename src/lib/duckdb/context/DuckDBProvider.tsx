import { AsyncDuckDBConnection } from '@duckdb/duckdb-wasm';
import { useEffect, useMemo, useState } from 'react';
import { DuckDBContext } from '@/lib/duckdb/context/DuckDBContext';
import { DuckDBService } from '@/lib/duckdb/service';

export const DuckDBProvider = ({ children }: { children: React.ReactNode }) => {
   const [db, setDb] = useState<AsyncDuckDBConnection | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [error, setError] = useState<Error | null>(null);

   useEffect(() => {
      const duckdb = new DuckDBService();

      const initDuckDB = async () => {
         try {
            await duckdb.initialize();
            const connection = await duckdb.db.connect();
            setDb(connection);
         } catch (error) {
            console.error('DuckDB provider initialization failed: ', error);

            if (error instanceof Error) {
               setError(
                  new Error(
                     `DuckDB provider initialization failed: ${error.message}`,
                  ),
               );
            } else {
               setError(new Error('DuckDB provider initialization failed'));
            }
         } finally {
            setIsLoading(false);
         }
      };

      initDuckDB();

      return () => {
         if (duckdb) {
            duckdb.cleanup();
         }
      };
   }, []);

   const contextValue = useMemo(
      () => ({ db, isLoading, error }),
      [db, isLoading, error],
   );

   return (
      <DuckDBContext.Provider value={contextValue}>
         {children}
      </DuckDBContext.Provider>
   );
};
