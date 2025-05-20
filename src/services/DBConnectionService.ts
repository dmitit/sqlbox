// class DBConnectionService {
//    private connection: duckdb.AsyncDuckDBConnection | null = null;

//    public async initialize() {
//       // ...инициализация db
//       this.connection = await this.db.connect();
//    }

//    public async query(sql: string) {
//       if (!this.connection) throw new Error('No connection');
//       return this.connection.query(sql);
//    }

//    public async close() {
//       if (this.connection) {
//          await this.connection.close();
//          this.connection = null;
//       }
//    }
// }
