import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BsSearch } from 'react-icons/bs';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const router = useRouter();
  const [searchString, setSearchString] = useState('');

  return (
    <form
      className="flex items-center relative w-9/12 mt-8 h-12 mx-auto sm:mx-0"
      onSubmit={(event) => {
        event.preventDefault();
        router.push(`/products?search=${searchString}`);
      }}>
      <Input
        placeholder="Search"
        type="text"
        value={searchString}
        onChange={(event) => setSearchString(event.target.value)}
        className="h-12 px-4 rounded-xl"
      />
      <Button
        size="icon"
        className="rounded-l-none rounded-r-xl absolute right-0 shadow-none top-0 h-full sm:h-full sm:w-14">
        <BsSearch className="text-xl" />
      </Button>
    </form>
  );
};

export default SearchBar;
