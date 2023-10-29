import axios from '@/api/axios';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuthContext } from '@/context/auth-context';
import { cn } from '@/lib/utils';
import { Review } from '@/types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { toast } from 'sonner';

type ReviewFormProps = {
  isReviewEditing: boolean;
  productId: string;
  setIsReviewEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReviewForm = ({
  isReviewEditing,
  setIsReviewEditing,
  productId,
}: ReviewFormProps) => {
  const [reviewComment, setReviewComment] = useState('');
  const [rating, setRating] = useState(0);

  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  const { mutate: addNewReview } = useMutation({
    mutationFn: async (
      newReview: Pick<Review, 'user' | 'product' | 'rating' | 'comment'>
    ) => {
      if (!reviewComment || reviewComment.length === 0) return;

      await axios.post('/reviews', newReview);
    },
    onMutate: (newReview) => {
      queryClient.setQueryData(
        ['reviews', user?._id],
        (prevReviews: Review[]) => [
          {
            ...newReview,
            user,
            createdAt: Date.now(),
          },
          ...prevReviews,
        ]
      );
    },
    onSuccess: () => {
      toast.success('Review added');
      setReviewComment('');
      setIsReviewEditing(false);
      queryClient.invalidateQueries({ queryKey: [['reviews', user?._id]] });
    },
    onError: (error: any) => {
      toast.error('Something went wrong');
      console.error(error);
    },
  });

  return (
    <form
      className={cn('pb-8 space-y-3', isReviewEditing ? 'block' : 'hidden')}
      onSubmit={(event) => {
        event.preventDefault();
        addNewReview({
          user: user?._id as string,
          product: productId,
          rating: rating,
          comment: reviewComment,
        });
      }}>
      <Textarea
        className="resize-none rounded-xl border border-primary-50 h-36 shadow-sm"
        value={reviewComment}
        onChange={(event) => setReviewComment(event.target.value)}
      />
      <div className="flex justify-between items-center">
        <div>
          {[...Array(5)].map((_, i) => {
            i += 1;
            return (
              <button
                className="focus:outline-0"
                type="button"
                key={i}
                onClick={() => setRating(i)}>
                <AiFillStar
                  key={i}
                  className={cn(
                    'text-xl',
                    i <= rating ? 'text-orange-500/90' : 'text-primary-200'
                  )}
                />
              </button>
            );
          })}
        </div>
        <Button size="sm" type="submit">
          Add Review
        </Button>
      </div>
    </form>
  );
};

export default ReviewForm;
