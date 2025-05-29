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
      console.log(db);
      if (isDuckDBLoading) {
         setIsLoading(true);
         return;
      }

      if (duckDBError) {
         setError(
            new Error(`Failed to initialize DuckDB: ${duckDBError.message}`),
         );
         setIsLoading(false);
         return;
      }

      if (!db) {
         setError(new Error('DuckDB instance is not available.'));
         setIsLoading(false);
         return;
      }

      // db доступен, создаем DBConnectionService
      const dbConnection = new DBConnectionService(db.db); // Передаем db в конструктор

      const initConnection = async () => {
         setIsLoading(true); // Устанавливаем isLoading в true перед инициализацией соединения
         try {
            await dbConnection.initialize();
            setConnection(dbConnection);
            setError(null); // Сбрасываем ошибку при успешной инициализации
         } catch (initError) {
            console.error(
               'DuckDB connection initialization failed: ',
               initError,
            );
            if (initError instanceof Error) {
               setError(
                  new Error(
                     `DuckDB connection initialization failed: ${initError.message}`,
                  ),
               );
            } else {
               setError(new Error('DuckDB connection initialization failed'));
            }
            setConnection(null); // Убедимся, что connection равен null в случае ошибки
         } finally {
            setIsLoading(false);
         }
      };

      initConnection();

      return () => {
         // Очистка при размонтировании компонента или изменении db
         if (connection) {
            connection.close();
         }
         setConnection(null); // Сбрасываем соединение
      };
   }, [db]); // Добавляем зависимости

   const contextValue = useMemo(
      () => ({
         connection,
         isLoading: isLoading || isDuckDBLoading, // Объединяем состояния загрузки
         error: error || duckDBError, // Объединяем ошибки
      }),
      [connection, isLoading, error, isDuckDBLoading, duckDBError],
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
