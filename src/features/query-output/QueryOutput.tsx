import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeQuery, selectOutputQueries } from '@/core/store/output.slice';
import { Tabs, Tab } from '@heroui/tabs';
import { X } from 'lucide-react';

const QueryOutput = () => {
   const outputs = useSelector(selectOutputQueries);
   const dispatch = useDispatch();

   const reversedOutputs = useMemo(() => [...outputs].reverse(), [outputs]);

   const handleRemoveOutput = (timestamp: number) => {
      dispatch(removeQuery(timestamp));
   };

   return (
      <div className="flex flex-col">
         {reversedOutputs.length > 0 ? (
            <Tabs
               classNames={{
                  panel: 'px-3',
               }}
               radius="none"
            >
               {reversedOutputs.map((output) => (
                  <Tab
                     key={output.timestamp}
                     title={
                        <div className="flex justify-between items-center gap-1">
                           <div>{output.query}</div>
                           <button
                              onClick={() =>
                                 handleRemoveOutput(output.timestamp)
                              }
                              className="p-1 hover:bg-foreground-300 rounded cursor-pointer"
                           >
                              <X size={14} />
                           </button>
                        </div>
                     }
                  >
                     <div className="flex justify-between items-center">
                        <div>{output.query}</div>
                     </div>
                  </Tab>
               ))}
            </Tabs>
         ) : (
            <div className="p-4">run a query</div>
         )}
      </div>
   );
};

export default QueryOutput;
