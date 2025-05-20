import clsx from 'clsx';
import { useState } from 'react';
import { PanelResizeHandle } from 'react-resizable-panels';

const PrimaryResizeHandler = ({ className }: { className?: string }) => {
   const [dragging, setDragging] = useState(false);

   return (
      <PanelResizeHandle
         className={clsx(
            className,
            'bg-foreground-200 transition-all duration-100 ease-out',
            dragging && 'bg-foreground-800',
         )}
         onDragging={(isDragging) => setDragging(isDragging)}
         hitAreaMargins={{ coarse: 20, fine: 5 }}
      />
   );
};

export default PrimaryResizeHandler;
