import * as duckdb from '@duckdb/duckdb-wasm';

export class DBConnectionService {
   private db: duckdb.AsyncDuckDB;
   private connection: duckdb.AsyncDuckDBConnection | null = null;

   constructor(db: duckdb.AsyncDuckDB) {
      this.db = db;
   }

   public async initialize() {
      this.connection = await this.db.connect();
   }

   public async query(sql: string) {
      if (!this.connection) throw new Error('No connection');
      return this.connection.query(sql);
   }

   public async close() {
      if (this.connection) {
         await this.connection.close();
         this.connection = null;
      }
   }
}
