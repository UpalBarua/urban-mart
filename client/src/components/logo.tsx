import { cn } from '@/lib/utils';
import Link from 'next/link';
import { BsFillBasket2Fill } from 'react-icons/bs';

const Logo = ({ className = '' }: { className?: string }) => {
  return (
    <Link className={cn('flex gap-x-2 items-center', className)} href="/">
      <BsFillBasket2Fill className="text-xl sm:text-2xl text-accent-500" />
      <h1 className="font-bold capitalize text-accent-500 text-lg tracking-wide">
        Urban Mart
      </h1>
    </Link>
  );
};

export default Logo;
