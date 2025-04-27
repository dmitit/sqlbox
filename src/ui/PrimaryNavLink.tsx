import clsx from 'clsx';
import { NavLink, NavLinkProps } from 'react-router';

interface PrimaryNavLinkProps extends NavLinkProps {
   children: React.ReactNode;
}

const PrimaryNavLink: React.FC<PrimaryNavLinkProps> = ({
   children,
   ...props
}) => {
   return (
      <NavLink
         {...props}
         className={({ isActive }) =>
            clsx(
               'transition-all duration-100 ease-out',
               isActive ? 'font-medium' : 'text-foreground font-normal',
            )
         }
         viewTransition
      >
         {children}
      </NavLink>
   );
};

export default PrimaryNavLink;
