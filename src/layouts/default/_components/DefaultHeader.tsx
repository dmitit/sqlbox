import DefaultContainer from '@/ui/PrimaryContainer';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import DefaultLogo from '@/ui/PrimaryLogo';
import clsx from 'clsx';
import { NavLink } from 'react-router';
import PrimaryNavLink from '@/ui/PrimaryNavLink';
import PrimaryHeaderLogin from '@/ui/PrimaryHeaderLogin';

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
                     <NavLink
                        to="sandbox/editor"
                        className="flex gap-[1px] group"
                     >
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
                           to={{ pathname: 'sandbox/editor' }}
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
                     <PrimaryHeaderLogin />
                  </NavbarContent>
               </Navbar>
            </DefaultContainer>
         </div>
      </div>
   );
}
