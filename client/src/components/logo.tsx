import { cn } from '@/lib/utils';
import Link from 'next/link';
import { BsFillBasket2Fill } from 'react-icons/bs';

const Logo = ({ className = '' }: { className?: string }) => {
  return (
    <Link
      className={cn(
        'flex gap-x-2 items-center justify-center text-lg sm:text-xl',
        className
      )}
      href="/">
      <BsFillBasket2Fill className="sm:text-xl text-xl text-accent-500" />
      <h1 className="font-extrabold capitalize tracking-tight text-black dark:text-white">
        UrbanMart
      </h1>
    </Link>
  );
};

export default Logo;
