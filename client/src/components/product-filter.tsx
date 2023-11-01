import { Input } from '@/components/ui/input';
import { BiFilterAlt } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';

type ProductFilterProps = {
  searchString: string;
  setSearchString: (val: string) => void;
  toggleFilterOpen: () => void;
};

const ProductFilter = ({
  searchString,
  setSearchString,
  toggleFilterOpen,
}: ProductFilterProps) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-bold">Filter Products</h2>
      <div className="flex flex-1 gap-2 items-center px-3 py-1 bg-white rounded-xl border-2 border-gray-200 lg:mb-8">
        <BsSearch className="text-xl text-gray-500" />
        <Input
          className="border-0 focus-visible:ring-0"
          placeholder="Search"
          type="text"
          value={searchString}
          onChange={(event) => setSearchString(event.target.value)}
        />
      </div>
      <button
        className="p-3 text-2xl text-white bg-green-400 rounded-md lg:hidden"
        type="button"
        onClick={toggleFilterOpen}>
        <BiFilterAlt />
      </button>
    </div>
  );
};

export default ProductFilter;
