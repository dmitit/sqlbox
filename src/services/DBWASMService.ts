import * as duckdb from '@duckdb/duckdb-wasm';
import mvp_duckdb_wasm from '@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url';
import mvp_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url';
import eh_duckdb_wasm from '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url';
import eh_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url';

export class DBWASMService {
   private _db: duckdb.AsyncDuckDB | null = null;
   private _worker: Worker | null = null;

   public get db() {
      if (!this._db) throw new Error('DuckDB not initialized');
      return this._db;
   }

   async initialize() {
      try {
         const MANUAL_BUNDLES: duckdb.DuckDBBundles = {
            mvp: { mainModule: mvp_duckdb_wasm, mainWorker: mvp_worker },
            eh: { mainModule: eh_duckdb_wasm, mainWorker: eh_worker },
         };

         const bundle = await duckdb.selectBundle(MANUAL_BUNDLES);

         // Handled
         if (!bundle.mainWorker) throw new Error('Worker not found');
         this._worker = new Worker(bundle.mainWorker);

         const logger = new duckdb.ConsoleLogger();
         this._db = new duckdb.AsyncDuckDB(logger, this._worker);
         await this._db.instantiate(bundle.mainModule, bundle.pthreadWorker);
      } catch (error) {
         if (error instanceof Error) {
            // Handled
            throw new Error(error.message);
         } else {
            // Handled
            throw new Error('DuckDB initialization failed');
         }
      }
   }

   cleanup() {
      this._worker?.terminate();
      this._worker = null;
      this._db = null;
   }
}
