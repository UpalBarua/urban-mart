import axios from '@/api/axios';
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Product } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';

const sortOptions = [
  { title: 'Ratings', value: 'ratingAvg' },
  { title: 'Prices', value: 'price' },
  { title: 'Sales', value: 'salesCount' },
] as const;

type SortOptions = (typeof sortOptions)[number]['value'];

const Products = () => {
  const router = useRouter();

  const [searchString, setSearchString] = useState(router.query.search || '');
  const [productSort, setProductSort] = useState<SortOptions | ''>('');

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['products', searchString, productSort],
    queryFn: async () => {
      try {
        const { data } = await axios.get<Product[]>(
          `/products?search=${searchString}&sort=${productSort}`
        );
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <section className="space-y-5 py-5">
      <div className="flex flex-col sm:justify-between sm:flex-row sm:items-center gap-4">
        <p className="text-xl font-medium">
          Showing{' '}
          <span className="text-accent-500">{products.length || '0'}</span>{' '}
          Products
        </p>
        <div className="flex gap-2 flex-col sm:flex-row sm:items-center sm:gap-3">
          <form
            className="flex items-center relative"
            onSubmit={(event) => {
              event.preventDefault();
              refetch();
            }}>
            <Input
              placeholder="Search"
              type="text"
              value={searchString}
              onChange={(event) => setSearchString(event.target.value)}
              className="w-full sm:w-[18rem]"
            />
            <Button
              size="icon"
              variant="ghost"
              className="rounded-l-none w-12 absolute right-0 h-full shadow-none">
              <BsSearch className="text-xl" />
            </Button>
          </form>
          <Select onValueChange={(event: SortOptions) => setProductSort(event)}>
            <SelectTrigger className="w-full py-5 sm:w-36">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {sortOptions.map(({ value, title }) => (
                  <SelectItem key={value} value={value}>
                    {title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-56">
          <BiLoaderAlt className="text-5xl animate-spin text-primary-500" />
        </div>
      ) : products.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {products?.map((product: Product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-56">
          <p className="text-xl font-medium text-primary-400">
            No Products Found
          </p>
        </div>
      )}
    </section>
  );
};

export default Products;
