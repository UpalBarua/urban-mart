import axios from '@/api/axios';
import ReviewCard from '@/components/review-card';
import { Button } from '@/components/ui/button';
import ReviewForm from '@/components/ui/review-form';
import { useAuthContext } from '@/context/auth-context';
import { useCartContext } from '@/context/cart-context';
import type { Product, Review } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { BiDollar } from 'react-icons/bi';
import { BsCart3, BsFillShareFill, BsTag } from 'react-icons/bs';
import { GoReport } from 'react-icons/go';
import { MdAdd, MdOutlineClose } from 'react-icons/md';
import { RxDotFilled } from 'react-icons/rx';
import { PhotoView } from 'react-photo-view';
import { toast } from 'sonner';
import Link from 'next/link';

export const getStaticPaths = async () => {
  try {
    const { data: products } = await axios.get('/products');

    const paths = products.map(({ _id }: { _id: string }) => {
      return {
        params: {
          productId: _id,
        },
      };
    });

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.log('Error fetching products: ', error);

    return {
      paths: [],
      fallback: true,
    };
  }
};

export const getStaticProps = async ({
  params,
}: {
  params: { productId: string };
}) => {
  try {
    const { data } = await axios.get(`/products/${params?.productId}`);

    return {
      props: {
        productDetails: data,
      },
    };
  } catch (error) {
    console.log('Failed to fetch product details: ', error);

    return {
      props: {
        productDetails: {},
      },
    };
  }
};

function ProductDetails({ productDetails }: { productDetails: Product }) {
  const [isReviewEditing, setIsReviewEditing] = useState(false);
  const router = useRouter();

  const { addToCart } = useCartContext();

  const { user } = useAuthContext();

  const handleReviewEditing = () => {
    setIsReviewEditing((prevIsReviewEditing) => !prevIsReviewEditing);
  };

  const {
    _id,
    name,
    imageUrl,
    ratingAvg,
    salesCount,
    description,
    price,
    stock,
  } = productDetails || {};

  const handleAddToCart = () => {
    if (!user?._id) {
      return toast.error('You need to be logged in');
    }

    addToCart({ product: productDetails, quantity: 1 });
  };

  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', user?._id],
    queryFn: async () => {
      try {
        const { data } = await axios.get<Review[]>(`/reviews/${_id}`);
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleCheckout = async () => {
    if (!user?._id) {
      return toast.error('You need to be logged in');
    }
    try {
      const { data } = await axios.post('/payment/create-checkout-session', {
        products: [{ product: productDetails, quantity: 1 }],
      });
      // if (data?.url) {
      //   await axios.post('/orders', {
      //     user: userId,
      //     orders: [{ product: productDetails, quantity: productQuantity }],
      //   });
      //   router.push(data.url);
      // }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <main className="py-2 lg:py-6 max-w-4xl mx-auto space-y-10">
      <div className="rounded-md grid grid-cols-1 gap-5 sm:grid-cols-10">
        <div className="relative w-full h-52 sm:col-span-4 sm:h-auto">
          <PhotoView src={imageUrl}>
            <Image
              className="object-cover object-center bg-primary-50/50 rounded-xl shadow"
              src={imageUrl}
              alt={name}
              quality={95}
              fill
            />
          </PhotoView>
        </div>
        <div className="space-y-2.5 sm:col-span-6">
          <h2 className="md:text-2xl font-medium capitalize text-primary-950 text-xl tracking-tight dark:text-primary-50/90">
            {name}
          </h2>
          <div className="flex flex-wrap gap-3 items-center text-primary-600 pb-3 dark:text-primary-300">
            <div className="flex items-center gap-x-1">
              <span className="font-medium">{ratingAvg}</span>
              <AiFillStar className="text-yellow-500" /> &nbsp;Ratings
            </div>
            <RxDotFilled className="text-xs" />
            <div>
              <span className="font-medium">{stock}</span>
              <span> In Stock </span>
            </div>
            <RxDotFilled className="text-xs" />
            <div>
              <span className="font-medium">{salesCount}+</span> Sold
            </div>
          </div>
          <div className="flex justify-between items-center pb-3">
            <p className="flex items-center text-2xl sm:text-3xl font-medium text-gray-800 dark:text-primary-200">
              <BiDollar />
              <span>{price}</span>
            </p>
            <div className="flex gap-2 items-center">
              <Button onClick={handleCheckout}>
                <BsTag className="text-lg hidden md:block" />
                <span>Buy Now</span>
              </Button>
              <Button variant="outline" onClick={handleAddToCart}>
                <BsCart3 className="text-lg hidden md:block" />
                <span>Add to Cart</span>
              </Button>
            </div>
          </div>
          <p className="text-primary-600 dark:text-primary-300 leading-relaxed">
            {description}
          </p>
          <div className="flex gap-1 items-center pt-4">
            <Button
              variant="ghost"
              className="shadow-none text-accent-600"
              size="sm">
              <BsFillShareFill />
              <span>Share Product</span>
            </Button>
            <Button
              variant="ghost"
              className="shadow-none text-accent-600"
              size="sm">
              <GoReport />
              <span>Report Product</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex sticky top-0 justify-between items-center pb-3 text-xl">
          <h3 className="font-medium capitalize">Top Reviews</h3>
          {user?._id ? (
            isReviewEditing ? (
              <Button
                size="sm"
                variant="destructive"
                onClick={handleReviewEditing}>
                <MdOutlineClose className="text-xl" />
                <span>Cancel</span>
              </Button>
            ) : (
              <Button size="sm" onClick={handleReviewEditing}>
                <MdAdd className="text-xl" />
                <span>Add Review</span>
              </Button>
            )
          ) : (
            <p className="text-base">
              Please{' '}
              <Link className="text-accent-500" href="/login">
                login
              </Link>{' '}
              to post your review
            </p>
          )}
        </div>
        <ReviewForm
          isReviewEditing={isReviewEditing}
          setIsReviewEditing={setIsReviewEditing}
          productId={_id || ''}
        />
        <ul className="gap-3 lg:gap-4 grid grid-cols-3">
          {reviews?.map((review) => (
            <ReviewCard key={review._id} {...review} />
          ))}
        </ul>
      </div>
    </main>
  );
}

export default ProductDetails;
