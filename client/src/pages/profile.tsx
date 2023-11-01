import { useRouter } from 'next/router';
import { AiOutlineUser } from 'react-icons/ai';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { signOut } from 'firebase/auth';
import axios from '@/api/axios';
import { auth } from '@/firebase/firebase.config';
import { useAuthContext } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ProfilePage = () => {
  const { user } = useAuthContext();

  const router = useRouter();

  const queryClient = useQueryClient();

  const {
    data: profileOrders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['profileOrders', user?._id],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`/orders/${user?._id}`);
        return data;
      } catch (error: any) {
        console.log(error.message);
      }
    },
    enabled: !!user?._id,
  });

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/login');
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
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
        <div className="hidden lg:block">
          <p className="font-semibold">{user?.userName}</p>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>
        <Button variant="destructive" onClick={handleSignOut}>
          Log Out
        </Button>
      </div>
    </main>
  );
};

export default ProfilePage;
