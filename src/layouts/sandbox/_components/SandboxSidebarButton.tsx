import { Button, Tooltip } from '@heroui/react';
import clsx from 'clsx';
import React from 'react';

interface SandboxSidebarButtonProps {
   children: React.ReactElement<React.SVGProps<SVGSVGElement>>;
   label: string;
   isActive?: boolean;
}

const SandboxSidebarButton = ({
   children,
   label = 'Button',
   isActive = false,
}: SandboxSidebarButtonProps) => {
   const icon = React.cloneElement(children, {
      className: clsx('w-full', children.props.className),
   });

   return (
      <Tooltip
         color="default"
         content={label}
         placement="right"
         delay={100}
         closeDelay={50}
         size="lg"
         offset={10}
         radius="sm"
      >
         <Button
            isIconOnly
            aria-label={label}
            color="default"
            variant="light"
            radius="none"
            className={clsx(
               'w-full py-5',
               isActive
                  ? 'text-foreground-900 border-l-2 border-primary-600'
                  : 'text-foreground-500',
            )}
            disableAnimation
         >
            <span className="w-5 h-5">{icon}</span>
         </Button>
      </Tooltip>
   );
};

export default SandboxSidebarButton;
