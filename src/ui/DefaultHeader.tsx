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
import { useLocation } from 'react-router';
import DefaultLink from '@/ui/DefaultLink';
import DefaultLogo from '@/ui/DefaultLogo';
import { cn } from '@/utils/cn';

export default function DefaultHeader() {
   const location = useLocation();

   const isActive = (path: string) => location.pathname === path;

   return (
      <div className="py-[1rem] relative">
         <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-foreground-200" />
         <div>
            <DefaultContainer>
               <Navbar maxWidth="full" height={'full'}>
                  <NavbarBrand>
                     <DefaultLink
                        className="flex gap-1 group"
                        to={{ pathname: 'sandbox' }}
                     >
                        <p className="font-bold text-inherit">SQL</p>
                        <DefaultLogo
                           className={cn(
                              isActive('/sandbox') ||
                                 location.pathname === '/sandbox'
                                 ? 'text-primary'
                                 : 'text-foreground',
                              'hover:text-primary ',
                              'group-hover:text-primary',
                           )}
                        />
                     </DefaultLink>
                  </NavbarBrand>

                  <NavbarContent
                     className="hidden sm:flex gap-10"
                     justify="center"
                  >
                     <NavbarItem isActive={isActive('/')}>
                        <DefaultLink to={{ pathname: '' }}>Home</DefaultLink>
                     </NavbarItem>
                     <NavbarItem isActive={isActive('/sandbox')}>
                        <DefaultLink to={{ pathname: 'sandbox' }}>
                           Sandbox
                        </DefaultLink>
                     </NavbarItem>
                     <NavbarItem isActive={isActive('/contact')}>
                        <DefaultLink to={{ pathname: 'contact' }}>
                           Contact
                        </DefaultLink>
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
