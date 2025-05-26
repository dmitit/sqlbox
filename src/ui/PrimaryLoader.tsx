import { CircularProgress } from '@heroui/react';

export const PrimaryLoader = () => {
   return (
      <div className="min-h-[100dvh] flex flex-col justify-center items-center">
         <CircularProgress aria-label="Loading..." size="lg" />
      </div>
   );
};
