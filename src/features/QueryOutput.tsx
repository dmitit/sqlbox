import { useDuckDB } from '@/lib/duckdb/context/useDuckDB';

const QueryOutput = () => {
   const { db, error, isLoading } = useDuckDB();

   console.log('db, ', db);
   console.log('error, ', error);
   console.log('loading, ', isLoading);

   return (
      <div className="p-4 border-1">
         <h3>output</h3>
      </div>
   );
};

export default QueryOutput;
