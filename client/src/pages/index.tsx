import axios from '@/api/axios';
import TopReviews from '@/components/top-reviews';
import AppAd from '@/components/app-ad';
import Banner from '@/components/banner';
import BestSellerProducts from '@/components/best-seller-products';
import NewProducts from '@/components/new-products';
import OnSaleProducts from '@/components/on-sale-products';
import FeaturedProducts from '@/components/ui/featured-cards';
import { Product } from '@/types/types';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BsSearch } from 'react-icons/bs';
import SearchBar from '@/components/search-bar';

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
      <FeaturedProducts products={products.slice(0, 6)} />
      <NewProducts products={products.slice(0, 6)} />
      <BestSellerProducts products={products.slice(0, 6)} />
      <OnSaleProducts products={products.slice(0, 6)} />
      <AppAd />
      <TopReviews />
    </main>
  );
};

export default HomePage;
