import clsx from 'clsx';
import { useState } from 'react';
import { PanelResizeHandle } from 'react-resizable-panels';

const DefaultResizeHandler = ({ className }: { className?: string }) => {
   const [dragging, setDragging] = useState(false);

   return (
      <PanelResizeHandle
         className={clsx(
            className,
            'bg-foreground-400 transition-all duration-100 ease-out delay-100',
            dragging
               ? 'scale-150 bg-foreground-900'
               : 'hover:scale-150 hover:bg-foreground-900',
         )}
         onDragging={(isDragging) => setDragging(isDragging)}
         hitAreaMargins={{ coarse: 20, fine: 0 }}
      />
   );
};

export default DefaultResizeHandler;
