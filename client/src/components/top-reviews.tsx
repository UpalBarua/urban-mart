import axios from '@/api/axios';
import Heading from '@/components/ui/heading';
import { Review } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import ReviewCard from './review-card';

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
