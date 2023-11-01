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
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';

const sortOptions = [
  { title: 'Ratings', value: 'ratingAvg' },
  { title: 'Prices', value: 'price' },
  { title: 'Sales', value: 'salesCount' },
] as const;

const Products = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [searchString, setSearchString] = useState(router.query.search || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [productSort, setProductSort] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilterOpen = () => {
    setIsFilterOpen((prevIsFilterOpen) => !prevIsFilterOpen);
  };

  const handleSelectCategory = (category: string) => {
    // event: ChangeEvent<HTMLInputElement>;
    // const { value: category } = event.target;

    // console.log(value);

    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        return prevSelectedCategories.filter((item) => item !== category);
      } else {
        return [...prevSelectedCategories, category];
      }
    });
  };

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['products', searchString],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`/products?search=${searchString}`);
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    queryClient.setQueryData(
      ['products', searchString],
      (prevProducts: Product[]) => {
        if (!prevProducts) {
          return prevProducts;
        }

        const sorted = prevProducts.sort(
          (a, b) => b[productSort] - a[productSort]
        );

        return sorted;
      }
    );
  }, [productSort]);

  return (
    <section className="space-y-4 py-5">
      <div className="flex justify-between items-center">
        <p className="text-xl font-medium">
          Showing{' '}
          <span className="text-green-500">{products.length || '0'}</span>{' '}
          Products
        </p>
        <div className="flex items-center gap-x-3">
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
              className="w-[18rem]"
            />
            <Button
              size="icon"
              variant="ghost"
              className="rounded-l-none w-12 absolute right-0 h-full shadow-none">
              <BsSearch className="text-xl" />
            </Button>
          </form>
          <Select onValueChange={(event) => setProductSort(event)}>
            <SelectTrigger className="w-[180px] py-5">
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
      <div className="grid grid-cols-3 gap-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : products.length ? (
          products?.map((product: Product) => (
            <ProductCard key={product._id} {...product} />
          ))
        ) : (
          <p className="text-xl font-bold text-center text-primary-300">
            No Products Found
          </p>
        )}
      </div>
    </section>
  );
};

export default Products;
