import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import {
   selectTables,
   TableMeta,
   TableColumnMeta,
} from '@/core/store/db.slice';
import {
   MoreHorizontal,
   ChevronRight,
   ChevronDown,
   Database,
   Columns,
   Type,
   CheckCircle,
   XCircle,
   KeyRound,
   Asterisk,
   SquarePlay,
} from 'lucide-react';
import { useRunQuery } from '@/utils/useRunQuery';

const SchemasList = () => {
   const tables = useSelector(selectTables);
   const [openTables, setOpenTables] = useState<Record<string, boolean>>({});
   const { runQuery } = useRunQuery();

   const handleTableAction = (tableName: string) => {
      runQuery(`SELECT * FROM ${tableName}`);
   };

   // const handleColumnAction = (tableName: string, columnName: string) => {
   //    console.log(`Action for column: ${columnName} in table: ${tableName}`);
   // };

   const toggleTable = (tableName: string) => {
      setOpenTables((prev) => ({
         ...prev,
         [tableName]: !prev[tableName],
      }));
   };

   if (!tables || tables.length === 0) {
      return (
         <div className="p-4 h-full flex flex-col items-center justify-center text-center">
            <Database
               size={48}
               className="text-gray-400 dark:text-gray-500 mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
               No Tables Found
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
               The database is empty or no tables have been loaded yet.
            </p>
         </div>
      );
   }

   return (
      <div className="p-4 h-full overflow-y-auto bg-gray-50 dark:bg-gray-900">
         <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Database Schema
         </h1>
         <div className="space-y-5">
            {tables.map((table: TableMeta) => {
               const isOpen = !!openTables[table.name];
               return (
                  <div
                     key={table.name}
                     className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transition-all hover:shadow-xl"
                  >
                     <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center">
                           <button
                              onClick={() => toggleTable(table.name)}
                              className="flex items-center group focus:outline-none cursor-pointer"
                              aria-label={`Toggle columns for table ${table.name}`}
                           >
                              {isOpen ? (
                                 <ChevronDown
                                    size={20}
                                    className="mr-2 text-gray-500 dark:text-gray-400 transition-transform duration-200"
                                 />
                              ) : (
                                 <ChevronRight
                                    size={20}
                                    className="mr-2 text-gray-500 dark:text-gray-400 transition-transform duration-200"
                                 />
                              )}
                              <h2 className="text-lg font-semibold text-primary-600 dark:text-primary-500 flex items-center">
                                 <Database
                                    size={18}
                                    className="mr-2 opacity-80"
                                 />
                                 {table.name}
                              </h2>
                           </button>
                           <button
                              onClick={() => handleTableAction(table.name)}
                              className="p-1 text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-500 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                              title={`SELECT * FROM ${table.name}`}
                           >
                              <SquarePlay size={18} />
                           </button>
                        </div>
                        <div className="mt-2 space-y-1 text-sm">
                           {table.columns.some((col) => col.pk) && (
                              <div className="flex items-center text-yellow-700 dark:text-yellow-400">
                                 <KeyRound
                                    size={16}
                                    className="mr-2 opacity-80"
                                 />
                                 <span>
                                    Primary key:&nbsp;
                                    {table.columns
                                       .filter((col) => col.pk)
                                       .map((col) => col.name)
                                       .join(', ')}
                                 </span>
                              </div>
                           )}
                           {table.columns.some((col) => col.foreignKey) && (
                              <div className="flex items-start text-blue-700 dark:text-blue-400">
                                 <KeyRound
                                    size={16}
                                    className="mr-2 opacity-80 mt-0.5"
                                 />
                                 <span>
                                    Foreign keys:
                                    <ul className="ml-4 list-disc">
                                       {table.columns
                                          .filter((col) => col.foreignKey)
                                          .map((col) => (
                                             <li key={col.name}>
                                                <span className="font-medium">
                                                   {col.name}
                                                </span>
                                                {' → '}
                                                <span>
                                                   {
                                                      col.foreignKey
                                                         ?.referenced_table
                                                   }
                                                   (
                                                   {col.foreignKey?.referenced_column_names.join(
                                                      ', ',
                                                   )}
                                                   )
                                                </span>
                                             </li>
                                          ))}
                                    </ul>
                                 </span>
                              </div>
                           )}
                        </div>
                     </div>
                     <div
                        className={`transition-all duration-300 ease-in-out ${
                           isOpen
                              ? 'max-h-[1000px] opacity-100'
                              : 'max-h-0 opacity-0 pointer-events-none'
                        } overflow-hidden`}
                     >
                        {table.columns.length > 0 ? (
                           <div className="divide-y divide-gray-100 dark:divide-gray-700">
                              {table.columns.map((col: TableColumnMeta) => (
                                 <div
                                    key={col.name}
                                    className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                 >
                                    <div className="flex justify-between items-center mb-2">
                                       <div className="flex items-center">
                                          <Columns
                                             size={16}
                                             className="mr-2 text-gray-500 dark:text-gray-400"
                                          />
                                          <span className="font-medium text-gray-800 dark:text-gray-200">
                                             {col.name}
                                          </span>
                                       </div>
                                       {/* <button
                                          onClick={() =>
                                             handleColumnAction(
                                                table.name,
                                                col.name,
                                             )
                                          }
                                          className="p-1 text-gray-400 hover:text-primary-600 dark:text-gray-500 dark:hover:text-primary-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                          title={`Actions for column ${col.name}`}
                                       >
                                          <ChevronRight size={18} />
                                       </button> */}
                                    </div>
                                    <div className="space-y-1 text-sm">
                                       <div className="flex items-center text-gray-600 dark:text-gray-400">
                                          <Type
                                             size={14}
                                             className="mr-2 opacity-70"
                                          />
                                          <span>Type: </span>
                                          <code className="ml-1 bg-gray-100 dark:bg-gray-700 px-1.5 rounded text-xs text-gray-700 dark:text-gray-300">
                                             {col.type}
                                          </code>
                                       </div>
                                       <div className="flex items-center">
                                          {col.pk && (
                                             <span className="flex items-center text-yellow-600 dark:text-yellow-400">
                                                <KeyRound
                                                   size={14}
                                                   className="mr-2 opacity-70"
                                                />{' '}
                                                Primary Key
                                             </span>
                                          )}
                                       </div>
                                       <div className="flex items-center">
                                          {col.nullable ? (
                                             <span className="flex items-center text-blue-600 dark:text-blue-400">
                                                <CheckCircle
                                                   size={14}
                                                   className="mr-2 opacity-70"
                                                />{' '}
                                                Nullable
                                             </span>
                                          ) : (
                                             <span className="flex items-center text-green-600 dark:text-green-400">
                                                <XCircle
                                                   size={14}
                                                   className="mr-2 opacity-70"
                                                />{' '}
                                                Not Nullable
                                             </span>
                                          )}
                                       </div>
                                       {col.default_value !== null &&
                                          col.default_value !== undefined && (
                                             <div className="flex items-center text-gray-600 dark:text-gray-400">
                                                <Asterisk
                                                   size={14}
                                                   className="mr-2 opacity-70"
                                                />
                                                <span>Default: </span>
                                                <code className="ml-1 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs text-gray-700 dark:text-gray-300">
                                                   {String(col.default_value)}
                                                </code>
                                             </div>
                                          )}
                                    </div>
                                 </div>
                              ))}
                           </div>
                        ) : (
                           <p className="p-5 text-sm text-gray-500 dark:text-gray-400">
                              This table has no columns.
                           </p>
                        )}
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
};

export default SchemasList;
