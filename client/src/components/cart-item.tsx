import ProductQuantity from '@/components/ui/product-quantity';
import { useCartContext } from '@/context/cart-context';
import type { Product } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiDollar } from 'react-icons/bi';
import { RxDotFilled } from 'react-icons/rx';
import { Button } from '@/components/ui/button';

type CartItemProps = {
  _id: string;
  quantity: number;
  product: Product;
};

const CartItem = ({ quantity, product, _id: cartItemId }: CartItemProps) => {
  const { _id: productId, imageUrl, name, description, price } = product;

  const [productQuantity, setProductQuantity] = useState(quantity);
  const { removeCartItem, setCartItemQuantity } = useCartContext();

  useEffect(() => {
    if (cartItemId && productQuantity) {
      setCartItemQuantity({
        cartItemId,
        quantity: productQuantity,
      });
    }
  }, [cartItemId, productQuantity, setCartItemQuantity]);

  const handleCartItemRemove = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    removeCartItem(cartItemId);
  };

  return (
    <Link
      href={`/products/${productId}`}
      className="flex flex-col gap-2 items-center p-2 w-full bg-white dark:bg-primary-950 rounded-xl border border-primary-50 dark:border-primary-800 shadow-sm relative">
      <div className="relative h-52 w-full bg-primary-50/50 border border-primary-50 rounded-xl dark:border-primary-800">
        <Image
          className="object-cover object-center rounded-xl"
          src={imageUrl}
          alt={name}
          quality={95}
          fill
        />
      </div>
      <div className="flex flex-col gap-1 p-2">
        <h3 className="text-lg font-medium capitalize">{name}</h3>
        <p className="text-primary-400">
          {description.length > 80
            ? description.slice(0, 80) + '...'
            : description}
        </p>
        <footer className="flex gap-3 pt-4 items-center justify-between">
          <p className="flex items-center text-2xl font-medium">
            <BiDollar />
            <span>{(+price * quantity).toLocaleString()}</span>
          </p>
          <ProductQuantity
            productQuantity={productQuantity}
            setProductQuantity={setProductQuantity}
          />
        </footer>
      </div>
      <Button
        variant="destructive"
        size="icon"
        onClick={handleCartItemRemove}
        className="absolute top-[5%] right-[5%] shadow-lg">
        <AiOutlineDelete className="text-2xl" />
      </Button>
    </Link>
  );
};

export default CartItem;
