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

      return rows;
   }

   public async close() {
      if (this.connection) {
         await this.connection.close();
         this.connection = null;
      }
   }
}
