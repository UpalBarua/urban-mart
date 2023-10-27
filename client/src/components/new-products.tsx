import Heading from '@/components/ui/heading';
import type { Product } from '@/types/types';
import ProductCard from './product-card';

type NewProductsProps = {
  products: Product[];
};

const NewProducts = ({ products }: NewProductsProps) => {
  return (
    <section className="pb-16">
      <Heading>New Products</Heading>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            // addToCart={addToCart}
            // isOnCart={checkProductInCart(product._id || '')}
            // isProductInWishlist={checkProductInWishlist(product._id || '')}
            {...product}
          />
        ))}
      </ul>
    </section>
  );
};

export default NewProducts;
