import Link from 'next/link';
import Logo from './logo';
import {
  AiOutlineSearch,
  AiOutlineHome,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from 'react-icons/ai';
import ThemeToggle from '@/components/ui/theme-toggle';
import MobileMenu from './mobile-menu';
import { Button } from '@/components/ui/button';
import UserProfile from './user-profile';

const navLinks = [
  {
    href: '/',
    Icon: (
      <AiOutlineHome className="text-xl dark:text-primary-50/50 text-primary-950/50" />
    ),
    title: 'Home',
    isProtected: false,
  },
  {
    href: '/products',
    Icon: (
      <AiOutlineSearch className="text-xl dark:text-primary-50/50 text-primary-950/50" />
    ),
    title: 'Search',
    isProtected: false,
  },
  {
    href: '/wishlist',
    Icon: (
      <AiOutlineHeart className="text-xl dark:text-primary-50/50 text-primary-950/50" />
    ),
    title: 'Wishlist',
    isProtected: true,
  },
  {
    href: '/cart',
    Icon: (
      <AiOutlineShoppingCart className="text-xl dark:text-primary-50/50 text-primary-950/50" />
    ),
    title: 'Cart',
    isProtected: true,
  },
] as const;

const Navbar = () => {
  const user = '...';

  return (
    <header className="sticky top-0 z-20 py-2 flex items-center justify-between dark:bg-primary-900 dark:text-primary-50/90 bg-[#EEEEF2] text-primary-950/90">
      <Logo />
      <nav className="flex items-center gap-x-1.5">
        <ul className="md:flex gap-x-1 items-center lg:gap-x-2.5 hidden">
          {navLinks.map(({ href, title, Icon, isProtected }) =>
            !isProtected || (isProtected && user) ? (
              <li key={href}>
                <Link
                  className="gap-2.5 items-center px-2.5 font-medium py-1.5 rounded-lg border border-transparent hover:bg-white hover:border-primary-50 hover:shadow-sm transition-colors flex focus-visible:bg-white focus-visible:border-primary-50 focus-visible:shadow-sm dark:hover:bg-primary-800 dark:focus-visible:bg-primary-800 dark:hover:border-primary-700 dark:focus-visible:border-primary-700"
                  href={href}>
                  {Icon}
                  <span>{title}</span>
                </Link>
              </li>
            ) : null
          )}
        </ul>
        {user ? (
          <UserProfile
            userName={'Upal Barua'}
            profileImg="https://i.ibb.co/zP7qGZH/IMG-0707.jpg"
          />
        ) : (
          <Button asChild className="text-base hidden md:inline-flex">
            <Link href="/login">
              <AiOutlineUser className="text-xl text-black/60" />
              <span>Login</span>
            </Link>
          </Button>
        )}
        <ThemeToggle />
        <MobileMenu />
      </nav>
    </header>
  );
};

export default Navbar;
