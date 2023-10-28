import axios from '@/api/axios';
import AppAd from '@/components/app-ad';
import Banner from '@/components/banner';
import BestSellerProducts from '@/components/best-seller-products';
import NewProducts from '@/components/new-products';
import OnSaleProducts from '@/components/on-sale-products';
import { Product } from '@/types/types';

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
  return (
    <main>
      <Banner />
      <NewProducts products={products.slice(0, 6)} />
      <BestSellerProducts products={products.slice(0, 6)} />
      <OnSaleProducts products={products.slice(0, 6)} />
      <AppAd />
    </main>
  );
};

export default HomePage;
