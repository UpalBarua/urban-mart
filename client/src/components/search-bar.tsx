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
      className="flex items-center w-[24rem] gap-x-1.5 mx-auto justify-center pb-10"
      onSubmit={(event) => {
        event.preventDefault();
        router.push(`/products?search=${searchString}`);
      }}>
      <Input
        placeholder="Search"
        type="text"
        value={searchString}
        onChange={(event) => setSearchString(event.target.value)}
        className="w-full px-5"
      />
      <Button>
        <BsSearch className="text-xl text-primary-800" />
        <span>Search</span>
      </Button>
    </form>
  );
};

export default SearchBar;
