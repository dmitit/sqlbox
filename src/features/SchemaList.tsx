import { useSelector } from 'react-redux';
import { selectTables } from '@/core/store/db.slice';

const SchemasList = () => {
   const tables = useSelector(selectTables);

   return (
      <div className="p-4">
         <h2 className="text-xl">Таблицы</h2>
         <ul>
            {tables.length === 0 && (
               <li className="text-gray-400">Нет таблиц</li>
            )}
            {tables.map((table) => (
               <li key={table.name}>{table.name}</li>
            ))}
         </ul>
      </div>
   );
};

export default SchemasList;
