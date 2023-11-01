import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { User } from '@/types/types';
import Link from 'next/link';

const UserProfile = ({ userName, photoURL }: User) => {
  return (
    <Button
      asChild
      variant="ghost"
      className="gap-2.5 items-center px-2.5 font-medium py-1.5 rounded-lg border border-transparent hover:bg-white hover:border-primary-50 hover:shadow-sm transition-colors focus-visible:bg-white focus-visible:border-primary-50 focus-visible:shadow-sm dark:hover:bg-primary-800 dark:focus-visible:bg-primary-800 dark:hover:border-primary-700 dark:focus-visible:border-primary-700 shadow-none hidden sm:flex">
      <Link href="/profile" className="flex gap-2.5 items-center">
        <Avatar>
          <AvatarImage src={photoURL} alt={userName} />
          <AvatarFallback>
            {userName
              .split(' ')
              .map((letter) => letter.charAt(0).toUpperCase())
              .join('')}
          </AvatarFallback>
        </Avatar>
        <span className="font-medium capitalize">{userName}</span>
      </Link>
    </Button>
  );
};

export default UserProfile;
