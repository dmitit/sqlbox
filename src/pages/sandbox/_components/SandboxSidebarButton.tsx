import { Button, PressEvent, Tooltip } from '@heroui/react';
import clsx from 'clsx';
import React from 'react';

interface SandboxSidebarButtonProps {
   children: React.ReactElement<React.SVGProps<SVGSVGElement>>;
   label: string;
   isActive?: boolean;
   onClick?: (e: PressEvent) => void;
}

const SandboxSidebarButton = React.forwardRef<
   HTMLButtonElement,
   SandboxSidebarButtonProps
>(({ children, label = 'Button', isActive = false, onClick }, ref) => {
   const icon = React.cloneElement(children, {
      className: clsx('w-full', children.props.className),
   });

   return (
      <Tooltip
         color="default"
         content={label}
         placement="right"
         delay={500}
         closeDelay={50}
         size="lg"
         offset={10}
         radius="sm"
      >
         <Button
            ref={ref}
            isIconOnly
            aria-label={label}
            color="default"
            variant="light"
            radius="none"
            className={clsx(
               'w-full py-5 relative group',
               isActive ? 'text-foreground-900' : 'text-foreground-500',
            )}
            disableAnimation
            onPress={onClick}
         >
            <span className="w-5 h-5">{icon}</span>
         </Button>
      </Tooltip>
   );
});

export default SandboxSidebarButton;
