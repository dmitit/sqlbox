import { cn } from '@/utils/cn';
import { Link, LinkProps } from 'react-router';

interface DefaultLinkProps extends LinkProps {
   children: React.ReactNode;
   className?: string;
}

const DefaultLink: React.FC<DefaultLinkProps> = ({
   children,
   className,
   ...props
}) => {
   return (
      <Link
         {...props}
         className={cn(
            'text-inherit transition-all duration-100 ease-out',
            className,
         )}
      >
         {children}
      </Link>
   );
};

export default DefaultLink;
