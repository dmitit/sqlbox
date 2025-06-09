import { useDuckDBConnection } from '@/core/DuckDBConnectionProvider';
import { setTables } from '@/core/store/db.slice';
import { addQuery } from '@/core/store/output.slice';
import { addQueryToHistory } from '@/core/store/queryHistory.slice';
import { SQLToState } from '@/services/DBSQLHelper';
// import { setTables } from '@/core/store/db.slice';
import { addToast } from '@heroui/react';
import { useDispatch } from 'react-redux';

export const useRunQuery = () => {
   const { connection } = useDuckDBConnection();
   const dispatch = useDispatch();

   const runQuery = async (sql: string) => {
      try {
         if (!connection) {
            throw new Error('No connection to the database');
         }

         const timestamp = Date.now();
         const result = await connection.query(sql);
         console.log(result);

         dispatch(addQuery({ duration: 0, query: sql, timestamp, result }));

         const tables = await SQLToState(connection);
         dispatch(setTables(tables));

         dispatch(addQueryToHistory({ sql, timestamp }));
      } catch (error) {
         addToast({
            title: 'Error',
            description:
               error instanceof Error
                  ? error.message
                  : 'An unknown error occurred',
            color: 'danger',
         });
      }
   };

   return { runQuery };
};
