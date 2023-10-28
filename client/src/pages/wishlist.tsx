import ProductCard from '@/components/product-card';
import Heading from '@/components/ui/heading';
import { useWishListContext } from '@/context/wishlist-context';
import type { Product } from '@/types/types';

const WishListPage = () => {
  const { wishlistProducts } = useWishListContext();

  return (
    <main className="pt-6 md:pt-8">
      <Heading>Wishlist</Heading>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-4">
        {wishlistProducts ? (
          wishlistProducts?.map((product: Product) => (
            <ProductCard key={product._id} {...product} />
          ))
        ) : (
          <p>No Products Found</p>
        )}
      </ul>
    </main>
  );
};

export default WishListPage;
