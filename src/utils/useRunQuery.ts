import { useDuckDB } from '@/core/DuckDBProvider';
import { setTables } from '@/core/store/db.slice';
import { useDispatch } from 'react-redux';

export const useRunQuery = () => {
   const { connection } = useDuckDB();
   const dispatch = useDispatch();

   const runQuery = async (sql: string) => {
      if (!connection) {
         throw new Error('No connection to the database');
      }

      try {
         const result = await connection.query(sql);

         dispatch(setTables(['test', 'test2']));

         return result;
      } catch (error) {
         console.error('Error executing query:', error);
         throw error;
      }
   };

   return { runQuery };
};
