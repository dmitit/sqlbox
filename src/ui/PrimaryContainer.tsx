import clsx from 'clsx';

interface PrimaryContainerProps {
   children: React.ReactNode;
   className?: string;
}

const PrimaryContainer = ({ children, className }: PrimaryContainerProps) => {
   return (
      <div
         className={clsx(
            'max-w-[1600px] mx-auto px-[0.8rem] relative',
            className,
         )}
      >
         {children}
      </div>
   );
};

export default PrimaryContainer;
