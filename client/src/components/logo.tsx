import { cn } from '@/lib/utils';
import Link from 'next/link';
import { BsFillBasket2Fill } from 'react-icons/bs';

const Logo = ({ className = '' }: { className?: string }) => {
  return (
    <Link
      className={cn('flex gap-x-2 items-center text-lg', className)}
      href="/">
      <BsFillBasket2Fill className="sm:text-2xl text-accent-500" />
      <h1 className="font-extrabold capitalize tracking-tight text-black dark:text-white">
        Urban Mart
      </h1>
    </Link>
  );
};

export default Logo;
