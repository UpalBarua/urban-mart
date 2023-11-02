import axios from '@/api/axios';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/auth-context';
import { auth } from '@/firebase/firebase.config';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

const ProfilePage = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  // const {
  //   data: profileOrders = [],
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ['profileOrders', user?._id],
  //   queryFn: async () => {
  //     try {
  //       const { data } = await axios.get(`/orders/${user?._id}`);
  //       return data;
  //     } catch (error: any) {
  //       console.log(error.message);
  //     }
  //   },
  //   enabled: !!user?._id,
  // });

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="py-5">
      <div className="flex gap-4 items-center">
        <Avatar>
          <AvatarImage src={user?.photoURL} alt={user?.userName} />
          <AvatarFallback>
            {user?.userName
              .split(' ')
              .map((letter) => letter.charAt(0).toUpperCase())
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div className="hidden lg:block pe-4">
          <p className="font-semibold">{user?.userName}</p>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>
        <Button variant="destructive" size="sm" onClick={handleSignOut}>
          Logout
        </Button>
      </div>
    </main>
  );
};

export default ProfilePage;
