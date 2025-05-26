import { DBConnectionService } from '@/services/DBConnectionService';
import { DBWASMService } from '@/services/DBWASMService';
import { AsyncDuckDB } from '@duckdb/duckdb-wasm';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const DuckDBContext = createContext<{
   connection: DBConnectionService | null;
   isLoading: boolean;
   error: Error | null;
}>({
   connection: null,
   isLoading: true,
   error: null,
});

export const DuckDBProvider = ({ children }: { children: React.ReactNode }) => {
   const [connection, setConnection] = useState<DBConnectionService | null>(
      null,
   );
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [error, setError] = useState<Error | null>(null);

   useEffect(() => {
      const dbwasm = new DBWASMService();

      const initDuckDB = async () => {
         try {
            await dbwasm.initialize();
            const db: AsyncDuckDB = dbwasm.db;
            const connectionService = new DBConnectionService(db);
            await connectionService.initialize();
            setConnection(connectionService);
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
         if (connection) {
            connection.close();
         }
         dbwasm.cleanup();
      };
   }, []);

   const contextValue = useMemo(
      () => ({ connection, isLoading, error }),
      [connection, isLoading, error],
   );

   return (
      <DuckDBContext.Provider value={contextValue}>
         {children}
      </DuckDBContext.Provider>
   );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDuckDB = () => {
   const context = useContext(DuckDBContext);
   if (!context) {
      throw new Error('useDuckDB must be used within DuckDBProvider');
   }
   return context;
};
