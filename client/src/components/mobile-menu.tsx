import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { HiMenu } from 'react-icons/hi';
import { Button } from '@/components/ui/button';

const navLinks = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Products',
    href: '/products',
  },
  {
    title: 'Wishlist',
    href: '/wishlist',
  },
  {
    title: 'Cart',
    href: '/cart',
  },
  {
    title: 'Profile',
    href: '/profile',
  },
] as const;

function MobileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="md:hidden">
        <Button size="icon" variant="outline">
          <HiMenu className="text-xl" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 mx-2.5 my-1 ">
        {navLinks.map(({ title, href }) => (
          <DropdownMenuItem key={href}>
            <Link href={href}>{title}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MobileMenu;
