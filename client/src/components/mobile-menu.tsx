import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { HiMenu } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/auth-context';

const navLinks = [
  {
    title: 'Home',
    href: '/',
    isProtected: false,
  },
  {
    title: 'Products',
    href: '/products',
    isProtected: false,
  },
  {
    title: 'Wishlist',
    href: '/wishlist',
    isProtected: true,
  },
  {
    title: 'Cart',
    href: '/cart',
    isProtected: true,
  },
  {
    title: 'Profile',
    href: '/profile',
    isProtected: true,
  },
] as const;

function MobileMenu() {
  const { user } = useAuthContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="md:hidden">
        <Button size="icon" variant="outline">
          <HiMenu className="text-xl" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 mx-2.5 my-1 ">
        {navLinks.map(({ title, href, isProtected }) =>
          !isProtected || (isProtected && user) ? (
            <DropdownMenuItem key={href}>
              <Link href={href}>{title}</Link>
            </DropdownMenuItem>
          ) : null
        )}
        {!user ? (
          <DropdownMenuItem>
            <Link href="/login">Login</Link>
          </DropdownMenuItem>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MobileMenu;
