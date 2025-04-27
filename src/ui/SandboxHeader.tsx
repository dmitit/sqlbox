import DefaultContainer from '@/ui/DefaultContainer';
import { Navbar } from '@heroui/react';

const SandboxHeader = () => {
   return (
      <div className="py-[1rem] relative">
         <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-foreground-200" />
         <div>
            <DefaultContainer>
               <Navbar maxWidth="full" height={'full'}></Navbar>
            </DefaultContainer>
         </div>
      </div>
   );
};

export default SandboxHeader;
