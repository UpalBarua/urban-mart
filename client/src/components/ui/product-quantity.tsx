import { SetStateAction } from 'react';
import { GrFormAdd, GrFormSubtract } from 'react-icons/gr';

interface ProductQuantityProps {
  setProductQuantity: (prevProductQuantity: SetStateAction<number>) => void;
  productQuantity: number;
}

function ProductQuantity({
  setProductQuantity,
  productQuantity,
}: ProductQuantityProps) {
  const handleProductQuantity = (type: 'inc' | 'dec') => {
    setProductQuantity((prevProductQuantity) => {
      if (type === 'inc') {
        return prevProductQuantity + 1;
      }

      if (type === 'dec' && prevProductQuantity > 1) {
        return prevProductQuantity - 1;
      }

      return prevProductQuantity;
    });
  };

  return (
    <div className="flex gap-1 items-center px-2 w-max bg-white rounded-lg shadow-sm border border-primary-50 dark:bg-primary-950 dark:border-primary-800">
      <button
        className="p-1 text-lg rounded-full hover:shadow hover:bg-primary-50/50 outline-0"
        onClick={(event) => {
          event.preventDefault();
          handleProductQuantity('dec');
        }}>
        <GrFormSubtract />
      </button>
      <input
        className="text-center border-0 appearance-none focus:ring-0 font-medium dark:bg-primary-950"
        type="number"
        min="1"
        max="100"
        onChange={(event) => setProductQuantity(+event.target.value)}
        onClick={(event) => event.preventDefault()}
        value={productQuantity.toString().padStart(2, '0')}
      />
      <button
        className="p-1 text-lg rounded-full hover:shadow hover:bg-primary-50/50 outline-0"
        onClick={(event) => {
          event.preventDefault();
          handleProductQuantity('inc');
        }}>
        <GrFormAdd />
      </button>
    </div>
  );
}

export default ProductQuantity;
