// import useWishlist from '@/hooks/useWishlist';
import { useCartContext } from '@/context/cart-context';
import type { Product } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { MouseEvent } from 'react';
import { AiFillHeart, AiFillStar, AiOutlineHeart } from 'react-icons/ai';
import { BiDollar } from 'react-icons/bi';
import { BsCartPlus, BsFillCartCheckFill } from 'react-icons/bs';

// type ProductCardProps = Product & {
//   isOnCart: boolean;
//   isProductInWishlist: boolean;
//   addToCart: (cartItem: { product: Product; quantity: number }) => void;
// };

const ProductCard = ({
  _id,
  name,
  imageUrl,
  price,
  description,
  ratingAvg,
  ...restProps
}: Product) => {
  // const { toggleWishlistProduct } = useWishlist();
  const isProductInWishlist = false;
  const { addToCart, checkProductInCart } = useCartContext();

  const handleAddToCart = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.preventDefault();

    addToCart({
      product: {
        _id,
        name,
        imageUrl,
        price,
        description,
        ratingAvg,
        ...restProps,
      },
      quantity: 1,
    });
  };

  const handleAddToWishlist = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.preventDefault();

    // if (_id) {
    //   toggleWishlistProduct(_id);
    // }
  };

  return (
    <Link
      className="flex flex-col gap-1 sm:gap-1.5 p-2 bg-white dark:bg-primary-950 rounded-xl border shadow-sm border-primary-50 dark:border-primary-800"
      href={`/products/${_id}`}>
      <div className="relative w-full h-40 rounded-lg md:h-52 bg-primary-200">
        <Image
          className="object-cover object-center rounded-xl"
          src={imageUrl}
          alt={name}
          fill
        />
      </div>
      <div className="p-1 space-y-1 sm:space-y-1.5 sm:p-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium flex-1">{name}</h3>
          <div className="text-sm bg-yellow-100 dark:bg-yellow-900 flex items-center gap-x-1 rounded-full px-3 py-0.5 text-yellow-500 font-medium border border-yellow-200 border-yellow-900/50">
            <AiFillStar />
            <span>{ratingAvg}</span>
          </div>
        </div>
        <p className="text-primary-400">
          {description.length > 100
            ? description.slice(0, 100) + '...'
            : description}
        </p>
        <footer className="flex justify-between items-center pt-3 lg:pt-5">
          <p className="flex items-center text-2xl font-medium lg:text-3xl">
            <BiDollar />
            <span>{price}</span>
          </p>
          <div className="space-x-2.5">
            <button
              className="p-2 text-xl text-pink-500 dark:border-pink-900 border border-pink-200 shadow-sm rounded-full transition-colors bg-pink-200/80 hover:bg-pink-200 md:text-2xl dark:bg-pink-900/50"
              onClick={handleAddToWishlist}>
              {isProductInWishlist ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
            <button
              className="p-2 text-xl text-green-500 rounded-full shadow-sm border border-green-200 dark:bg-green-900/50 dark:border-green-900 transition-colors bg-green-200/80 hover:bg-green-200 md:text-2xl"
              onClick={handleAddToCart}>
              {checkProductInCart(_id) ? (
                <BsFillCartCheckFill />
              ) : (
                <BsCartPlus />
              )}
            </button>
          </div>
        </footer>
      </div>
    </Link>
  );
};

export default ProductCard;
