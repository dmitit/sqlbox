import { selectTables } from '@/core/store/db.slice';
import { DBConnectionService } from '@/services/DBConnectionService';
import { stateToSQL } from '@/services/DBSQLHelper';
import { DBWASMService } from '@/services/DBWASMService';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

const DuckDBContext = createContext<{
   db: DBWASMService | null;
   isLoading: boolean;
   error: Error | null;
}>({ db: null, isLoading: false, error: null });

export const DuckDBProvider = ({ children }: { children: React.ReactNode }) => {
   const [db, setDB] = useState<DBWASMService | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [error, setError] = useState<Error | null>(null);
   const tables = useSelector(selectTables);

   useEffect(() => {
      const dbwasm = new DBWASMService();

      const initDuckDB = async () => {
         try {
            setIsLoading(true);
            setDB(null);
            setError(null);

            const sqldb = stateToSQL(tables);
            console.log(sqldb);

            await dbwasm.initialize();
            setDB(dbwasm);

            const connection = new DBConnectionService(dbwasm.db);
            await connection.initialize();
            await connection.query(sqldb);
            await connection.close();
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
