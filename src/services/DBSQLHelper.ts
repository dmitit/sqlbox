import { ForeignKeyMeta, TableMeta } from '@/core/store/db.slice';
import { DBConnectionService } from '@/services/DBConnectionService';

function parseForeignKeyColumns(constraintText: string) {
   const fkMatch = constraintText.match(
      /FOREIGN KEY\s*\(([^)]+)\)\s+REFERENCES\s+([^(]+)\(([^)]+)\)/i,
   );
   if (!fkMatch)
      return { columns: [], referencedTable: '', referencedColumns: [] };
   const columns = fkMatch[1].split(',').map((s) => s.trim());
   const referencedTable = fkMatch[2].trim();
   const referencedColumns = fkMatch[3].split(',').map((s) => s.trim());
   return { columns, referencedTable, referencedColumns };
}

export async function SQLToState(
   connection: DBConnectionService,
): Promise<TableMeta[]> {
   const tables = await connection.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema='main'`,
   );

   const fkRows = await connection.query(
      `SELECT * FROM duckdb_constraints() WHERE constraint_type = 'FOREIGN KEY'`,
   );

   const result: TableMeta[] = [];
   for (const { table_name } of tables) {
      const columns = await connection.query(
         `PRAGMA table_info('${table_name}')`,
      );

      const rows = await connection.query(`SELECT * FROM "${table_name}"`);

      const tableFKs = fkRows
         .filter((fk) => fk.table_name === table_name)
         .map((fk) => {
            // @ts-ignore
            const parsed = parseForeignKeyColumns(fk.constraint_text);
            return {
               constraint_name: fk.constraint_name,
               column_names: parsed.columns,
               referenced_table: parsed.referencedTable,
               referenced_column_names: parsed.referencedColumns,
            };
         });

      result.push({
         // @ts-ignore
         name: table_name,
         // @ts-ignore
         columns: columns.map((col) => {
            const fkMeta = tableFKs.find((fk) =>
               // @ts-ignore
               fk.column_names.includes(col.name),
            );
            return {
               cid: col.cid,
               default_value: col.dflt_value,
               pk: col.pk,
               name: col.name,
               type: col.type,
               nullable: !col.notnull,
               foreignKey: fkMeta,
            };
         }),
         rows,
      });
   }
   return result;
}

export function stateToSQL(tables: TableMeta[]): string {
   const escapeId = (id: string) => `"${id.replace(/"/g, '""')}"`;
   const escapeValue = (v: unknown) =>
      v === null
         ? 'NULL'
         : typeof v === 'number'
           ? v
           : typeof v === 'boolean'
             ? v
                ? 'TRUE'
                : 'FALSE'
             : `'${String(v).replace(/'/g, "''")}'`;

   const sql: string[] = [];

   for (const table of tables) {
      const columnDefinitions = table.columns.map(
         (col) =>
            `${escapeId(col.name)} ${col.type}${
               !col.nullable ? ' NOT NULL' : ''
            }${
               // Primary Key will be handled as a table constraint
               col.default_value !== null && col.default_value !== undefined
                  ? ` DEFAULT ${escapeValue(col.default_value)}`
                  : ''
            }`,
      );

      const tableConstraints: string[] = [];

      // Collect Primary Key columns
      const pkColumnNames = table.columns
         .filter((col) => col.pk)
         .map((col) => escapeId(col.name));

      if (pkColumnNames.length > 0) {
         tableConstraints.push(`PRIMARY KEY (${pkColumnNames.join(', ')})`);
      }

      // Collect unique Foreign Key constraints
      const uniqueFKs = new Map<string, ForeignKeyMeta>();
      table.columns.forEach((col) => {
         if (col.foreignKey && !uniqueFKs.has(col.foreignKey.constraint_name)) {
            uniqueFKs.set(col.foreignKey.constraint_name, col.foreignKey);
         }
      });

      uniqueFKs.forEach((fk) => {
         const fkColumns = fk.column_names.map(escapeId).join(', ');
         const refTable = escapeId(fk.referenced_table);
         const refColumns = fk.referenced_column_names.map(escapeId).join(', ');
         tableConstraints.push(
            `CONSTRAINT ${escapeId(fk.constraint_name)} FOREIGN KEY (${fkColumns}) REFERENCES ${refTable} (${refColumns})`,
         );
      });

      const allTableParts = [...columnDefinitions, ...tableConstraints];
      const tableDefinition = allTableParts.join(', ');

      sql.push(`CREATE TABLE ${escapeId(table.name)} (${tableDefinition});`);

      if (table.rows.length > 0) {
         const colNames = table.columns.map((c) => escapeId(c.name)).join(', ');
         for (const row of table.rows) {
            const values = table.columns
               .map((c) => escapeValue(row[c.name]))
               .join(', ');
            sql.push(
               `INSERT INTO ${escapeId(table.name)} (${colNames}) VALUES (${values});`,
            );
         }
      }
   }

   return sql.join('\n');
}
