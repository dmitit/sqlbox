import { useDispatch, useSelector } from 'react-redux';
import {
   OutputResult,
   removeQuery,
   selectOutputQueries,
   selectActiveOutputTimestamp,
   setActiveOutputTimestamp,
} from '@/core/store/output.slice';
import { X } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';

const QueryOutput = () => {
   const outputs = useSelector(selectOutputQueries);
   const activeOutputTimestamp = useSelector(selectActiveOutputTimestamp);
   const dispatch = useDispatch();

   const handleRemoveOutput = (timestamp: number) => {
      dispatch(removeQuery(timestamp));
   };

   const handleSetActive = (timestamp: number) => {
      dispatch(setActiveOutputTimestamp(timestamp));
   };

   const generateColDefs = (data: OutputResult[]): ColDef[] => {
      if (!data || data.length === 0) {
         return [];
      }
      const firstRow = data[0];
      return Object.keys(firstRow).map((key) => ({
         field: key,
         filter: true,
         sortable: true,
         resizable: true,
      }));
   };

   const activeOutput =
      outputs.find((o) => o.timestamp === activeOutputTimestamp) || null;

   return (
      <div className="flex flex-col h-full bg-background-DEFAULT text-foreground-DEFAULT">
         {' '}
         {/* Optional: Added base background and text color for the component */}
         {outputs.length > 0 ? (
            <>
               <div className="flex gap-2 px-3 py-2 border-b border-foreground-200 bg-background-100">
                  {outputs.map((output) => (
                     <button
                        key={output.timestamp}
                        onClick={() => handleSetActive(output.timestamp)}
                        className={`flex items-center gap-1 px-3 py-1 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500
                           ${
                              activeOutput?.timestamp === output.timestamp
                                 ? 'bg-foreground-200 text-foreground-900 font-semibold'
                                 : 'bg-transparent hover:bg-foreground-100 text-foreground-700'
                           }
                        `}
                     >
                        <span>{output.name}</span>
                        <span
                           onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveOutput(output.timestamp);
                           }}
                           className="ml-1 p-0.5 hover:bg-foreground-300 cursor-pointer"
                        >
                           <X size={16} />
                        </span>
                     </button>
                  ))}
               </div>
               <div className="flex-1 p-3 h-full">
                  {' '}
                  {/* Changed px-3 to p-3 for uniform padding */}
                  {activeOutput ? (
                     <AgGridReact
                        // Consider adding an AG Grid theme class here if your site uses one, e.g., className="ag-theme-alpine"
                        domLayout="normal"
                        rowData={activeOutput.result}
                        columnDefs={generateColDefs(activeOutput.result)}
                        rowDragManaged={true}
                     />
                  ) : (
                     // This placeholder might be rarely seen if activeOutput is always set when outputs exist.
                     <div className="flex flex-col flex-1 items-center justify-center h-full p-6 text-center">
                        <h3 className="text-lg font-medium text-foreground-600">
                           No active selection
                        </h3>
                        <p className="text-sm text-foreground-500">
                           Select a query tab to view results.
                        </p>
                     </div>
                  )}
               </div>
            </>
         ) : (
            <div className="flex flex-col flex-1 items-center justify-center h-full p-8 text-center">
               <h3 className="text-xl font-semibold text-foreground-700 mb-2">
                  Nothing to show yet!
               </h3>
               <p className="text-foreground-500">
                  Run a SQL query, and the results will appear right here.
               </p>
            </div>
         )}
      </div>
   );
};

export default QueryOutput;
