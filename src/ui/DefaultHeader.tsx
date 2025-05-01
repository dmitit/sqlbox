import DefaultContainer from '@/ui/DefaultContainer';
import {
   Avatar,
   Dropdown,
   DropdownItem,
   DropdownMenu,
   DropdownTrigger,
   Navbar,
   NavbarBrand,
   NavbarContent,
   NavbarItem,
} from '@heroui/react';
import DefaultLogo from '@/ui/DefaultLogo';
import clsx from 'clsx';
import { NavLink } from 'react-router';
import PrimaryNavLink from '@/ui/PrimaryNavLink';

export default function DefaultHeader() {
   return (
      <div className="py-[1rem] relative">
         <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-foreground-200" />
         <div>
            <DefaultContainer>
               <Navbar
                  maxWidth="full"
                  height={'full'}
                  classNames={{ wrapper: ['px-0'] }}
               >
                  <NavbarBrand>
                     <NavLink to="sandbox" className="flex gap-1 group">
                        {({ isActive }) => (
                           <>
                              <p className="font-bold text-inherit">SQL</p>
                              <DefaultLogo
                                 className={clsx(
                                    'text-foreground hover:text-primary group-hover:text-primary',
                                    isActive ? 'text-primary' : '',
                                 )}
                              />
                           </>
                        )}
                     </NavLink>
                  </NavbarBrand>

                  <NavbarContent
                     className="hidden sm:flex gap-10"
                     justify="center"
                  >
                     <NavbarItem>
                        <PrimaryNavLink to={{ pathname: '' }}>
                           Home
                        </PrimaryNavLink>
                     </NavbarItem>
                     <NavbarItem>
                        <PrimaryNavLink
                           target="_blank"
                           to={{ pathname: 'sandbox' }}
                        >
                           Sandbox
                        </PrimaryNavLink>
                     </NavbarItem>
                     <NavbarItem>
                        <PrimaryNavLink
                           to={{ pathname: 'contact' }}
                           className={({ isActive }) =>
                              isActive ? 'text-primary' : ''
                           }
                        >
                           Contact
                        </PrimaryNavLink>
                     </NavbarItem>
                  </NavbarContent>

                  <NavbarContent as="div" justify="end">
                     <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                           <Avatar
                              isBordered
                              as="button"
                              className="transition-transform cursor-pointer"
                              color="primary"
                              name="Jason Hughes"
                              size="sm"
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
                  </NavbarContent>
               </Navbar>
            </DefaultContainer>
         </div>
      </div>
   );
}
