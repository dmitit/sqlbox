import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import cn from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { removeQuery, selectOutputQueries } from '@/core/store/output.slice';
import { X } from 'lucide-react';

const QueryOutput = () => {
   const outputs = useSelector(selectOutputQueries);
   const dispatch = useDispatch();

   const reversedOutputs = useMemo(() => [...outputs].reverse(), [outputs]);

   const [activeOutputIndex, setActiveOutputIndex] = useState<number | null>(
      null,
   );
   const prevOutputsLength = useRef(outputs.length);

   const activeOutput = useMemo(() => {
      if (
         activeOutputIndex !== null &&
         activeOutputIndex < reversedOutputs.length
      ) {
         return reversedOutputs[activeOutputIndex];
      }
      return null;
   }, [activeOutputIndex, reversedOutputs]);

   const activeButtonRef = useRef<HTMLButtonElement>(null);
   const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 });

   useEffect(() => {
      if (reversedOutputs.length === 0) {
         setActiveOutputIndex(null);
      } else if (outputs.length > prevOutputsLength.current) {
         setActiveOutputIndex(outputs.length - 1);
      } else if (
         activeOutputIndex === null ||
         activeOutputIndex >= reversedOutputs.length
      ) {
         setActiveOutputIndex(0);
      }

      prevOutputsLength.current = outputs.length;
   }, [reversedOutputs, activeOutputIndex, outputs]);

   useLayoutEffect(() => {
      if (activeButtonRef.current) {
         setHighlightStyle({
            left: activeButtonRef.current.offsetLeft,
            width: activeButtonRef.current.offsetWidth,
         });
      } else if (reversedOutputs.length === 0) {
         setHighlightStyle({ left: 0, width: 0 });
      }
   }, [activeOutputIndex, reversedOutputs]);

   const handleOutputChange = (idx: number) => {
      setActiveOutputIndex(idx);
   };

   const handleRemoveOutput = (idx: number) => {
      const output = reversedOutputs[idx];
      if (!output) return;

      dispatch(removeQuery(output.timestamp));

      if (reversedOutputs.length === 1) {
         setActiveOutputIndex(null);
      } else if (activeOutputIndex === idx) {
         setActiveOutputIndex(Math.max(0, idx - 1));
      }
   };

   return (
      <div className="flex flex-col">
         <div
            className={cn(
               'overflow-hidden transition-[border-width] duration-300',
               outputs.length > 0
                  ? 'border-b border-foreground-200'
                  : 'border-b-0',
            )}
            style={{
               borderBottomWidth: outputs.length > 0 ? 1 : 0,
            }}
         >
            {outputs.length > 0 && activeOutput && (
               <div className="flex justify-between">
                  <div className="flex relative">
                     <span
                        className="absolute top-0 h-full bg-foreground-200 transition-all duration-75 -z-10 ease-out"
                        style={highlightStyle}
                     />
                     {reversedOutputs.map((output, idx) => (
                        <button
                           key={output.timestamp}
                           ref={
                              output.timestamp === activeOutput.timestamp
                                 ? activeButtonRef
                                 : null
                           }
                           className={cn(
                              'cursor-pointer px-2 pr-7 py-0.5 relative',
                              activeOutput.timestamp === output.timestamp
                                 ? ''
                                 : 'hover:bg-foreground-100',
                           )}
                           onClick={() => handleOutputChange(idx)}
                        >
                           <span>{output.name}</span>
                           <span
                              className="group cursor-pointer top-1/2 -translate-y-1/2 bg-transparent text-foreground-500 hover:text-foreground-900 transition-colors absolute right-1"
                              onClick={(e) => {
                                 e.stopPropagation();
                                 handleRemoveOutput(idx);
                              }}
                           >
                              <div className="p-0.5 group-hover:bg-foreground-300">
                                 <X size={14} />
                              </div>
                           </span>
                        </button>
                     ))}
                  </div>
                  <div>controls</div>
               </div>
            )}
         </div>
         <div className="p-4">
            {outputs.length === 0 ? (
               <div>run a query</div>
            ) : (
               <div>{activeOutput?.query}</div>
            )}
         </div>
      </div>
   );
};

export default QueryOutput;
