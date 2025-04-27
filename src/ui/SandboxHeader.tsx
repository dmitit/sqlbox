import DefaultContainer from '@/ui/DefaultContainer';
import PrimaryNavLink from '@/ui/PrimaryNavLink';
import { Button, Navbar, NavbarContent, NavbarItem } from '@heroui/react';

const SandboxHeader = () => {
   return (
      <div className="py-[0.5rem] relative">
         <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-foreground-200" />
         <div>
            <DefaultContainer>
               <Navbar
                  maxWidth="full"
                  height={'full'}
                  classNames={{ wrapper: ['px-0'] }}
               >
                  <NavbarContent
                     className="hidden sm:flex gap-6"
                     justify="start"
                  >
                     <NavbarItem>
                        <Button color="primary" variant="bordered" size="sm">
                           File
                        </Button>
                     </NavbarItem>
                  </NavbarContent>

                  <NavbarContent
                     className="hidden sm:flex gap-6"
                     justify="center"
                  >
                     <NavbarItem>
                        <PrimaryNavLink to={{ pathname: 'editor' }}>
                           Editor
                        </PrimaryNavLink>
                     </NavbarItem>
                     <NavbarItem>
                        <PrimaryNavLink to={{ pathname: 'flow' }}>
                           Flow
                        </PrimaryNavLink>
                     </NavbarItem>
                  </NavbarContent>

                  <NavbarContent className="hidden sm:flex gap-6" justify="end">
                     <Button color="primary" variant="bordered" size="sm">
                        Settings
                     </Button>
                  </NavbarContent>
               </Navbar>
            </DefaultContainer>
         </div>
      </div>
   );
};

export default SandboxHeader;
