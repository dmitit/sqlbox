import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
   OutputResult,
   removeQuery,
   selectOutputQueries,
} from '@/core/store/output.slice';
import { Tabs, Tab } from '@heroui/tabs';
import { X } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';

const QueryOutput = () => {
   const outputs = useSelector(selectOutputQueries);
   const dispatch = useDispatch();

   const reversedOutputs = useMemo(() => [...outputs].reverse(), [outputs]);

   const handleRemoveOutput = (timestamp: number) => {
      dispatch(removeQuery(timestamp));
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

   return (
      <div className="flex flex-col h-full">
         {reversedOutputs.length > 0 ? (
            <Tabs
               classNames={{
                  panel: 'px-3 h-full',
               }}
               radius="none"
            >
               {reversedOutputs.map((output) => {
                  const colDefs = generateColDefs(output.result);
                  const rowData = output.result;

                  return (
                     <Tab
                        key={output.timestamp}
                        title={
                           <div className="flex justify-between items-center gap-1">
                              <div>{output.name}</div>
                              <div
                                 onClick={() =>
                                    handleRemoveOutput(output.timestamp)
                                 }
                                 className="p-1 hover:bg-foreground-300 rounded cursor-pointer"
                              >
                                 <X size={14} />
                              </div>
                           </div>
                        }
                     >
                        <AgGridReact
                           domLayout="normal"
                           rowData={rowData}
                           columnDefs={colDefs}
                           rowDragManaged={true}
                        />
                     </Tab>
                  );
               })}
            </Tabs>
         ) : (
            <div className="p-4">run a query</div>
         )}
      </div>
   );
};

export default QueryOutput;
