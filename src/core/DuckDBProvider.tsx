import { DBConnectionService } from '@/services/DBConnectionService';
import { DBWASMService } from '@/services/DBWASMService';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const DuckDBContext = createContext<{
   db: DBWASMService | null;
   isLoading: boolean;
   error: Error | null;
}>({ db: null, isLoading: false, error: null });

export const DuckDBProvider = ({
   children,
   initialSQL,
}: {
   children: React.ReactNode;
   initialSQL?: string;
}) => {
   const [db, setDB] = useState<DBWASMService | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [error, setError] = useState<Error | null>(null);

   useEffect(() => {
      console.log('DuckDBProvider initializing');
      const dbwasm = new DBWASMService();

      const initDuckDB = async () => {
         try {
            setIsLoading(true);
            setDB(null);
            setError(null);

            await dbwasm.initialize();
            setDB(dbwasm);

            const connection = new DBConnectionService(dbwasm.db);

            if (initialSQL) {
               await connection.initialize();
               await connection.query(initialSQL);
               await connection.close();
            }
         } catch (error) {
            if (error instanceof Error) {
               // Handled
               setError(
                  new Error(
                     `DuckDB provider initialization failed: ${error.message}`,
                  ),
               );
            } else {
               // Handled
               setError(new Error('DuckDB provider initialization failed'));
            }
         } finally {
            setIsLoading(false);
         }
      };

      initDuckDB();

      return () => {
         console.log('DuckDBProvider cleaning up');
         dbwasm.cleanup();
      };
   }, [initialSQL]);

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

// eslint-disable-next-line react-refresh/only-export-components
export const useDuckDB = () => {
   const context = useContext(DuckDBContext);
   if (!context) {
      throw new Error('useDuckDB must be used within DuckDBProvider');
   }
   return context;
};
