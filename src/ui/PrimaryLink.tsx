import clsx from 'clsx';
import { Link, LinkProps } from 'react-router';

interface PrimaryLinkProps extends LinkProps {
   children: React.ReactNode;
   className?: string;
}

const PrimaryLink: React.FC<PrimaryLinkProps> = ({
   children,
   className,
   ...props
}) => {
   return (
      <Link
         {...props}
         className={clsx(
            'text-inherit transition-all duration-100 ease-out',
            className,
         )}
      >
         {children}
      </Link>
   );
};

export default PrimaryLink;
