import { DBConnectionService } from '@/services/DBConnectionService';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useDuckDB } from './DuckDBProvider'; // Импортируем useDuckDB

const DuckDBConnectionContext = createContext<{
   connection: DBConnectionService | null;
   isLoading: boolean;
   error: Error | null;
}>({
   connection: null,
   isLoading: true,
   error: null,
});

export const DuckDBConnectionProvider = ({
   children,
}: {
   children: React.ReactNode;
}) => {
   const { db, isLoading: isDuckDBLoading, error: duckDBError } = useDuckDB(); // Используем useDuckDB
   const [connection, setConnection] = useState<DBConnectionService | null>(
      null,
   );
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [error, setError] = useState<Error | null>(null);

   useEffect(() => {
      if (isDuckDBLoading) {
         setIsLoading(true);
         return;
      }

      // Handled
      if (duckDBError) {
         setError(
            new Error(`Failed to connect to DuckDB: ${duckDBError.message}`),
         );
         setIsLoading(false);
         return;
      }

      // Handled
      if (!db) {
         setError(new Error('DuckDB instance is not available.'));
         setIsLoading(false);
         return;
      }

      const dbConnection = new DBConnectionService(db.db);

      const initConnection = async () => {
         setIsLoading(true);
         try {
            await dbConnection.initialize();
            setConnection(dbConnection);
            setError(null);
         } catch (error) {
            if (error instanceof Error) {
               // Handled
               setError(
                  new Error(
                     `DuckDB connection initialization failed: ${error.message}`,
                  ),
               );
            } else {
               // Handled
               setError(new Error('DuckDB connection initialization failed'));
            }
            setConnection(null);
         } finally {
            setIsLoading(false);
         }
      };

      initConnection();

      return () => {
         console.log('Closing DuckDB connection:', dbConnection);
         if (dbConnection) {
            dbConnection.close();
         }
         setConnection(null);
      };
   }, [db, isDuckDBLoading, duckDBError]);

   const contextValue = useMemo(
      () => ({
         connection,
         isLoading: isLoading,
         error: error,
      }),
      [connection, isLoading, error],
   );

   return (
      <DuckDBConnectionContext.Provider value={contextValue}>
         {children}
      </DuckDBConnectionContext.Provider>
   );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDuckDBConnection = () => {
   const context = useContext(DuckDBConnectionContext);
   if (!context) {
      throw new Error(
         'useDuckDBConnection must be used within a DuckDBConnectionProvider',
      );
   }
   return context;
};
