import clsx from 'clsx';

interface DefaultContainerProps {
   children: React.ReactNode;
   className?: string;
}

const DefaultContainer = ({ children, className }: DefaultContainerProps) => {
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

export default DefaultContainer;
