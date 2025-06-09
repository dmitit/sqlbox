import { TableRow } from '@/core/store/db.slice';
import * as duckdb from '@duckdb/duckdb-wasm';
import * as arrow from 'apache-arrow';

export class DBConnectionService {
   private db: duckdb.AsyncDuckDB;
   private connection: duckdb.AsyncDuckDBConnection | null = null;

   constructor(db: duckdb.AsyncDuckDB) {
      this.db = db;
   }

   public async initialize() {
      this.connection = await this.db.connect();
   }

   public async query<T extends { [key: string]: arrow.DataType }>(
      sql: string,
   ) {
      if (!this.connection) throw new Error('No connection');

      const result = await this.connection.query<T>(sql);
      const rows = result.toArray().map((row) => row.toJSON());

      const serializedRows = rows.map((row) => {
         const serializedRow: TableRow = {};

         for (const [key, value] of Object.entries(row)) {
            try {
               if (value === null || value === undefined) {
                  serializedRow[key] = null;
               } else if (value instanceof Date) {
                  serializedRow[key] = value.toISOString();
               } else if (
                  typeof value === 'boolean' ||
                  typeof value === 'number' ||
                  typeof value === 'string'
               ) {
                  serializedRow[key] = value;
               } else {
                  serializedRow[key] = String(value);
               }
            } catch (err) {
               console.error(`Error serializing key "${key}":`, err);
               serializedRow[key] = null;
            }
         }
         return serializedRow;
      });

      return serializedRows;
   }

   public async close() {
      if (this.connection) {
         await this.connection.close();
         this.connection = null;
      }
   }
}
