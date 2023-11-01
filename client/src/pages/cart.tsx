import axios from '@/api/axios';
import CartItem from '@/components/cart-item';
import OrderSummery from '@/components/order-summery';
import RouteGuard from '@/components/route-guard';
import Heading from '@/components/ui/heading';
import { useAuthContext } from '@/context/auth-context';
import { useCartContext } from '@/context/cart-context';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

const CartPage = () => {
  const router = useRouter();

  const { cartProducts, removeCartItem, setCartItemQuantity } =
    useCartContext();

  const { user } = useAuthContext();

  const subTotal = useMemo(
    () =>
      cartProducts?.reduce(
        (sum, { product, quantity }) => (sum += product.price * quantity),
        0
      ),
    [cartProducts]
  );

  const tax = useMemo(
    () =>
      cartProducts?.reduce(
        (sum, { product, quantity }) =>
          (sum += product.price * quantity * 0.01),
        0
      ),
    [cartProducts]
  );

  const handleCheckout = async () => {
    try {
      const { data } = await axios.post('/payment/create-checkout-session', {
        products: cartProducts,
      });
      if (data?.url) {
        // await axios.post('/orders', {
        //   user: _id,
        //   orders: cartProducts,
        // });
        router.push(data.url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RouteGuard>
      <main className="pt-6 md:pt-8">
        <section className="relative">
          <Heading>Shopping Cart</Heading>
          <div className="grid grid-cols-12 gap-6 items-start">
            <ul className="grid order-1 grid-cols-1 col-span-12 gap-4 lg:grid-cols-2 md:col-span-8 md:-order-1 md:gap-5">
              {cartProducts?.map((cartProduct) => (
                <CartItem key={cartProduct._id} {...cartProduct} />
              ))}
            </ul>
            <OrderSummery
              subTotal={subTotal}
              tax={tax}
              handleCheckOut={handleCheckout}
            />
          </div>
        </section>
      </main>
    </RouteGuard>
  );
};

export default CartPage;
