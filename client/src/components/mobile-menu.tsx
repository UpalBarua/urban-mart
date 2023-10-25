import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { HiMenu } from 'react-icons/hi';
import { Button } from '@/components/ui/button';

const MENU_OPTIONS = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Search Products',
    href: '/products',
  },
  {
    title: 'My Wishlist',
    href: '/wishlist',
  },
  {
    title: 'Shopping Cart',
    href: '/cart',
  },
];

function MobileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="md:hidden">
        <Button size="icon" variant="outline">
          <HiMenu className="text-2xl" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 mx-2.5 my-1 ">
        {MENU_OPTIONS.map(({ title, href }) => (
          <DropdownMenuItem key={href}>
            <Link href={href}>{title}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MobileMenu;
