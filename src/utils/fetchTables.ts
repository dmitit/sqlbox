import { TableMeta } from '@/core/store/db.slice';
import { DBConnectionService } from '@/services/DBConnectionService';

export async function fetchTables(
   connection: DBConnectionService,
): Promise<TableMeta[]> {
   // Получаем список таблиц
   const tables = await connection.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema='main'`,
   );

   const result: TableMeta[] = [];
   for (const { table_name } of tables) {
      const columns = await connection.query(
         `PRAGMA table_info('${table_name}')`,
      );
      result.push({
         name: table_name,
         columns: columns.map((col) => ({
            cid: col.cid,
            default_value: col.dflt_value,
            pk: col.pk,
            name: col.name,
            type: col.type,
            nullable: !col.notnull,
         })),
      });
   }
   return result;
}
