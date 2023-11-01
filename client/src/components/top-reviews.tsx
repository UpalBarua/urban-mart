import axios from '@/api/axios';
import Heading from '@/components/ui/heading';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { AiFillStar, AiOutlineUser } from 'react-icons/ai';
import ReviewCard from './review-card';
import { Review } from '@/types/types';

const TopReviews = () => {
  const { data: topReviews = [] } = useQuery<Review[]>({
    queryKey: ['topReviews'],
    queryFn: async () => {
      const { data } = await axios.get('/reviews');
      return data;
    },
  });

  return (
    <section className="pb-16">
      <Heading>Top Reviews</Heading>
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3">
        {topReviews?.map((review) => (
          <ReviewCard key={review._id} {...review} isTestimonial />
        ))}
      </ul>
    </section>
  );
};

export default TopReviews;
