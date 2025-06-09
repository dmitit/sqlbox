// ...existing code...
import { useSelector, useDispatch } from 'react-redux';
import {
   selectQueryHistory,
   clearQueryHistory,
   QueryHistoryEntry,
} from '@/core/store/queryHistory.slice';
import { useRunQuery } from '@/utils/useRunQuery';
import { addToast, Button } from '@heroui/react';
import { History, Play, Trash2, ListX, Copy } from 'lucide-react'; // Added Copy
import { formatDistanceToNow } from 'date-fns';
// Assuming you have a toast notification system, you might need to import it
// import { useToast } from '@/hooks/useToast'; // Example, adjust if you have one

const QueryHistory = () => {
   const history = useSelector(selectQueryHistory);
   const dispatch = useDispatch();
   const { runQuery } = useRunQuery();
   // const { addToast } = useToast(); // Example, if you have a toast system

   const handleRunQuery = (sql: string) => {
      runQuery(sql);
   };

   const handleClearHistory = () => {
      dispatch(clearQueryHistory());
   };

   const handleCopyQuery = async (sql: string) => {
      try {
         await navigator.clipboard.writeText(sql);
         addToast({
            title: 'Success',
            color: 'success',
            description: 'Query copied to clipboard!',
         }); // Optional: notify user
      } catch (err) {
         console.error('Failed to copy query: ', err);
         addToast({
            title: 'Error',
            color: 'warning',
            description: 'Failed to copy query.',
         }); // Optional: notify user
      }
   };

   if (history.length === 0) {
      return (
         <div className="p-4 h-full flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-gray-900">
            <ListX
               size={48}
               className="text-gray-400 dark:text-gray-500 mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
               No Query History
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
               Run some queries, and they will appear here.
            </p>
         </div>
      );
   }

   return (
      <div className="p-4 h-full overflow-y-auto bg-gray-50 dark:bg-gray-900">
         <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center">
               Query History
            </h1>
            <Button
               variant="light"
               size="sm"
               onClick={handleClearHistory}
               className="text-red-600 border-red-600 hover:bg-red-50 dark:text-red-500 dark:border-red-500 dark:hover:bg-red-700 dark:hover:text-white"
            >
               <Trash2 size={16} className="mr-1" />
               Clear History
            </Button>
         </div>
         <div className="space-y-3">
            {history
               .slice()
               .reverse()
               .map((entry: QueryHistoryEntry) => (
                  <div
                     key={entry.id}
                     className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-3 transition-all hover:shadow-lg"
                  >
                     <div className="flex justify-between items-start mb-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                           {formatDistanceToNow(new Date(entry.timestamp), {
                              addSuffix: true,
                           })}
                        </span>
                        <div className="flex items-center space-x-1">
                           <Button
                              variant="light"
                              isIconOnly
                              size="sm"
                              onClick={() => handleCopyQuery(entry.sql)}
                              className="p-0.5 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                              title="Copy query"
                           >
                              <Copy size={14} />
                           </Button>
                           <Button
                              variant="light"
                              isIconOnly
                              size="sm"
                              onClick={() => handleRunQuery(entry.sql)}
                              className="p-0.5 text-primary-600 hover:bg-primary-50 dark:text-primary-500 dark:hover:bg-gray-700"
                              title="Run this query again"
                           >
                              <Play size={14} />
                           </Button>
                        </div>
                     </div>
                     <pre className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-x-auto whitespace-pre-wrap break-all">
                        {entry.sql}
                     </pre>
                  </div>
               ))}
         </div>
      </div>
   );
};

export default QueryHistory;
