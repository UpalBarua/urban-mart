import axios from '@/api/axios';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthContext } from '@/context/auth-context';
import type { Review } from '@/types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { AiFillStar, AiOutlineDelete } from 'react-icons/ai';
import { toast } from 'sonner';
import { Button } from './ui/button';

type ReviewCardProps = Review & {
  isTestimonial: boolean;
};

const ReviewCard = ({
  user,
  comment,
  rating,
  createdAt,
  product,
  isTestimonial,
}: ReviewCardProps) => {
  const queryClient = useQueryClient();

  const { user: authUser } = useAuthContext();

  const { mutate: handleReviewDelete } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/reviews?productId=${product._id}`);
    },
    onSuccess: () => {
      toast.success('Review deleted');
      queryClient.invalidateQueries({ queryKey: ['reviews', authUser?._id] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to delete review');
    },
  });

  return (
    <li className="space-y-3 p-3 bg-white rounded-xl border shadow-sm border-primary-50">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage src={user?.photoURL} alt={user?.userName} />
            <AvatarFallback>
              {user?.userName
                .split(' ')
                .map((letter) => letter.charAt(0).toUpperCase())
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className="leading-none ps-1">
            <p className="font-medium">{user?.userName}</p>
            <p className="text-sm text-primary-600">
              {format(new Date(createdAt), 'MMMM d, yyyy')}
            </p>
          </div>
        </div>
        <div className="flex gap-1 items-center font-medium">
          <AiFillStar className="text-yellow-400" />
          <span>{rating}</span>
        </div>
      </div>
      <p className="p-1 text-primary-800">{comment}</p>
      {!isTestimonial && authUser?.email === user?.email && (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => handleReviewDelete()}>
          <AiOutlineDelete className="text-xl" />
          <span>Delete</span>
        </Button>
      )}
    </li>
  );
};

export default ReviewCard;
