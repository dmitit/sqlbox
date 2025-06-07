import { useDuckDBConnection } from '@/core/DuckDBConnectionProvider';
import { addQuery } from '@/core/store/output.slice';
// import { setTables } from '@/core/store/db.slice';
import { addToast } from '@heroui/react';
import { useDispatch } from 'react-redux';
import * as arrow from 'apache-arrow';

export const useRunQuery = () => {
   const { connection } = useDuckDBConnection();
   const dispatch = useDispatch();

   const runQuery = async (sql: string) => {
      try {
         if (!connection) {
            throw new Error('No connection to the database');
         }

         const timestamp = Date.now();
         const result = await connection.query<{ id: arrow.Int32 }>(sql);
         console.log(result);

         dispatch(addQuery({ duration: 0, query: sql, timestamp }));
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
