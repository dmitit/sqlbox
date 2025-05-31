import { CircularProgress } from '@heroui/react';

export const PrimaryLoader = () => {
   return (
      <div className="min-h-[100dvh] w-full flex flex-col justify-center items-center">
         <CircularProgress aria-label="Loading..." size="lg" />
      </div>
   );
};
