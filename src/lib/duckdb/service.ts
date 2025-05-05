import * as duckdb from '@duckdb/duckdb-wasm';
import mvp_duckdb_wasm from '@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url';
import mvp_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url';
import eh_duckdb_wasm from '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url';
import eh_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url';

type DuckDBStatus = 'IDLE' | 'INITIALIZED' | 'REMOVED';

export class DuckDBService {
   private _db: duckdb.AsyncDuckDB | null = null;
   private _worker: Worker | null = null;
   private _status: DuckDBStatus = 'IDLE';

   public get db() {
      if (!this._db) {
         throw new Error('DuckDB not initialized');
      }
      return this._db;
   }

   public get status() {
      return this._status;
   }

   async initialize() {
      try {
         const MANUAL_BUNDLES: duckdb.DuckDBBundles = {
            mvp: { mainModule: mvp_duckdb_wasm, mainWorker: mvp_worker },
            eh: { mainModule: eh_duckdb_wasm, mainWorker: eh_worker },
         };

         const bundle = await duckdb.selectBundle(MANUAL_BUNDLES);

         if (!bundle.mainWorker) {
            throw new Error('Worker not found');
         }
         this._worker = new Worker(bundle.mainWorker);

         const logger = new duckdb.ConsoleLogger();

         this._db = new duckdb.AsyncDuckDB(logger, this._worker);
         await this._db.instantiate(bundle.mainModule, bundle.pthreadWorker);

         this._status = 'INITIALIZED';
      } catch (error) {
         if (error instanceof Error) {
            throw new Error(`DuckDB initializing failed: ${error.message}`);
         }
         throw new Error('DuckDB initializing failed');
      }
   }

   cleanup() {
      if (this._worker) {
         this._worker.terminate();
         this._worker = null;
      }
      this._db = null;
      this._status = 'REMOVED';
   }
}
