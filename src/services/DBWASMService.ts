import * as duckdb from '@duckdb/duckdb-wasm';
// Удаляем прямые импорты WASM и worker файлов, так как они будут получены с CDN
// import mvp_duckdb_wasm from '@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url';
// import mvp_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url';
// import eh_duckdb_wasm from '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url';
// import eh_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url';

export class DBWASMService {
   private _db: duckdb.AsyncDuckDB | null = null;
   private _worker: Worker | null = null;
   private _worker_url_object: string | null = null; // Для хранения URL.createObjectURL

   public get db() {
      if (!this._db) throw new Error('DuckDB not initialized');
      return this._db;
   }

   async initialize() {
      try {
         const JSDELIVR_BUNDLES = duckdb.getJsDelivrBundles();
         const bundle = await duckdb.selectBundle(JSDELIVR_BUNDLES);

         if (!bundle.mainWorker)
            throw new Error('Worker URL not found in bundle');
         if (!bundle.mainModule)
            throw new Error('Module URL not found in bundle');

         // Создаем worker из URL, предоставленного CDN
         // Используем подход с Blob для worker'а, как в документации
         const worker_url = URL.createObjectURL(
            new Blob([`importScripts("${bundle.mainWorker}");`], {
               type: 'text/javascript',
            }),
         );
         this._worker_url_object = worker_url; // Сохраняем для последующей очистки

         this._worker = new Worker(worker_url);

         const logger = new duckdb.ConsoleLogger();
         this._db = new duckdb.AsyncDuckDB(logger, this._worker);
         await this._db.instantiate(bundle.mainModule, bundle.pthreadWorker);
      } catch (error) {
         if (error instanceof Error) {
            console.error('DuckDB initialization error:', error.message);
            throw new Error(`DuckDB initialization failed: ${error.message}`);
         } else {
            console.error('Unknown DuckDB initialization error:', error);
            throw new Error(
               'DuckDB initialization failed with an unknown error',
            );
         }
      }
   }

   cleanup() {
      this._worker?.terminate();
      this._worker = null;
      this._db = null;
      if (this._worker_url_object) {
         URL.revokeObjectURL(this._worker_url_object); // Очищаем созданный Object URL
         this._worker_url_object = null;
      }
   }
}
