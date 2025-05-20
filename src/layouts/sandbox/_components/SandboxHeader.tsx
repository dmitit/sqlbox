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
                     <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                           <Avatar
                              as="button"
                              className="transition-transform cursor-pointer w-7 h-7"
                              color="primary"
                              name="Jason Hughes"
                              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                           />
                        </DropdownTrigger>
                        <DropdownMenu
                           aria-label="Profile Actions"
                           variant="flat"
                        >
                           <DropdownItem key="profile" className="h-14 gap-2">
                              <p className="font-semibold">Signed in as</p>
                              <p className="font-semibold">zoey@example.com</p>
                           </DropdownItem>
                           <DropdownItem key="settings">
                              My Settings
                           </DropdownItem>
                           <DropdownItem key="help_and_feedback">
                              Help & Feedback
                           </DropdownItem>
                           <DropdownItem key="logout" color="danger">
                              Log Out
                           </DropdownItem>
                        </DropdownMenu>
                     </Dropdown>
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
