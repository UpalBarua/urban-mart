import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type UserProfileProps = {
  userName: string;
  profileImg?: string;
};

const UserProfile = ({ userName, profileImg }: UserProfileProps) => {
  return (
    <Button asChild variant="ghost" className="shadow-none hidden md:flex">
      <Link href="/profile" className="flex gap-2.5 items-center">
        <Avatar>
          <AvatarImage src={profileImg} alt={userName} />
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
