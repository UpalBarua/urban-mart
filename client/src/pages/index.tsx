import axios from '@/api/axios';
import Banner from '@/components/banner';
import ProductCard from '@/components/product-card';
import { Product } from '@/types/types';
import Heading from '@/components/ui/heading';
import NewProducts from '@/components/new-products';
import BestSellerProducts from '@/components/best-seller-products';
import OnSaleProducts from '@/components/on-sale-products';

type HomePageProps = {
  products: Product[];
};

export const getStaticProps = async () => {
  try {
    const { data: products } = await axios.get<Product[]>('/products');

    return {
      props: {
        products,
      },
    };
  } catch (error) {
    console.log('Failed to fetch products: ', error);

    return {
      props: {
        products: [],
      },
    };
  }
};

const HomePage = ({ products }: HomePageProps) => {
  console.log(products);
  return (
    <main>
      <Banner />
      <NewProducts products={products.slice(0, 6)} />
      <BestSellerProducts products={products.slice(0, 6)} />
      <OnSaleProducts products={products.slice(0, 6)} />
    </main>
  );
};

export default HomePage;
