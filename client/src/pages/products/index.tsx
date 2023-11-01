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
import { BsSearch } from 'react-icons/bs';

const sortOptions = ['default', 'ratings', 'prices', 'sales'];

const Products = () => {
  const router = useRouter();

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
    queryKey: ['products'],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`/products?search=${searchString}`);
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });

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
                {sortOptions.map((option: string) => (
                  <SelectItem key={option} value={option}>
                    {option}
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
