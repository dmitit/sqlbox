import { DBWASMService } from '@/services/DBWASMService';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const DuckDBContext = createContext<{
   db: DBWASMService | null;
   isLoading: boolean;
   error: Error | null;
}>({ db: null, isLoading: true, error: null });

export const DuckDBProvider = ({ children }: { children: React.ReactNode }) => {
   const [db, setDB] = useState<DBWASMService | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [error, setError] = useState<Error | null>(null);

   useEffect(() => {
      const dbwasm = new DBWASMService();

      const initDuckDB = async () => {
         try {
            await dbwasm.initialize();
            setDB(dbwasm);
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
         dbwasm.cleanup();
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

// eslint-disable-next-line react-refresh/only-export-components
export const useDuckDB = () => {
   const context = useContext(DuckDBContext);
   if (!context) {
      throw new Error('useDuckDB must be used within DuckDBProvider');
   }
   return context;
};
