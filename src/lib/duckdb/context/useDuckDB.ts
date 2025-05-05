import { DuckDBContext } from '@/lib/duckdb/context/DuckDBContext';
import { useContext } from 'react';

export const useDuckDB = () => {
   const context = useContext(DuckDBContext);
   if (!context) {
      throw new Error('useDuckDB must be used within DuckDBProvider');
   }
   return context;
};
