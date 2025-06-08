import PrimaryHeaderLogin from '@/ui/PrimaryHeaderLogin';
import DefaultLogo from '@/ui/PrimaryLogo';
import PrimaryNavLink from '@/ui/PrimaryNavLink';
import {
   Avatar,
   Button,
   Dropdown,
   DropdownItem,
   DropdownMenu,
   DropdownTrigger,
   Navbar,
   NavbarBrand,
   NavbarContent,
   NavbarItem,
} from '@heroui/react';
import clsx from 'clsx';
import { Settings } from 'lucide-react';
import { NavLink } from 'react-router';

const SandboxHeader = () => {
   return (
      <div className="py-[0.7rem] relative">
         <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground-200" />
         <div className="px-3">
            <Navbar
               maxWidth="full"
               height={'full'}
               classNames={{ wrapper: ['px-0'] }}
            >
               <NavbarBrand>
                  <NavLink to="/" className="flex gap-[1px] group">
                     <>
                        <DefaultLogo
                           className={clsx(
                              'text-primary group-hover:text-foreground',
                           )}
                        />
                     </>
                  </NavLink>
               </NavbarBrand>

               <NavbarContent justify="center">
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

               <NavbarContent justify="end">
                  <div className="flex gap-4 items-center">
                     <PrimaryHeaderLogin />
                     <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        aria-label="Settings"
                        color="primary"
                     >
                        <Settings />
                     </Button>
                  </div>
               </NavbarContent>
            </Navbar>
         </div>
      </div>
   );
};

export default SandboxHeader;
