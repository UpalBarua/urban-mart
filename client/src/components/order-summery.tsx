import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BsFillCreditCard2BackFill } from 'react-icons/bs';
import { MdAddShoppingCart } from 'react-icons/md';

const SHIPPING = 20;

type OrderSummeryProps = {
  subTotal: number;
  tax: number;
  handleCheckOut: () => void;
};

const OrderSummery = ({ subTotal, tax, handleCheckOut }: OrderSummeryProps) => {
  return (
    <div className="col-span-12 p-5 md:w-[22rem] bg-white dark:bg-primary-950 rounded-xl border border-primary-50 dark:border-primary-800 shadow-sm md:sticky md:top-16 md:col-span-4 md:ms-auto md:p-6">
      <h2 className="pb-4 text-2xl font-medium capitalize">Order Summery</h2>
      <div className="flex justify-between items-center pb-2">
        <p>Subtotal</p>
        <p>${subTotal?.toFixed(2)}</p>
      </div>
      <div className="flex justify-between items-center pb-2">
        <p>Shipping</p>
        <p>${SHIPPING}</p>
      </div>
      <div className="flex justify-between items-center pb-2">
        <p>Tax</p>
        <p>${tax?.toFixed(2)}</p>
      </div>
      <div className="flex justify-between items-center text-xl font-semibold">
        <p>Total Price</p>
        <p>${subTotal + SHIPPING + tax}</p>
      </div>
      <div className="flex flex-col gap-2.5 pt-7">
        <Button onClick={handleCheckOut} size="lg">
          <BsFillCreditCard2BackFill />
          <span>Proceed to Checkout</span>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href={'products'}>
            <MdAddShoppingCart />
            <span>Continue Shopping</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default OrderSummery;
