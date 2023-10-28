import { useContext, createContext } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutateFunction,
} from '@tanstack/react-query';
import { useAuthContext } from './auth-context';
import type { Product } from '@/types/types';
import axios from '@/api/axios';
import { AxiosResponse } from 'axios';

// NEEDS TO BE UPDATED
type Wishlist = {
  _id: string;
  userId: string;
  products: Product[];
};

type WishListContextProviderProps = {
  children: React.ReactNode;
};

type WishListContextValue = {
  wishlistProducts: Product[];
  isLoading: boolean;
  isError: boolean;
  toggleWishlistProduct: UseMutateFunction<
    AxiosResponse<any, any> | undefined,
    Error,
    string,
    void
  >;
  checkProductInWishlist: (wishlistProductId: string) => boolean;
};

const WishListContext = createContext<WishListContextValue | null>(null);

export const WishListContextProvider = ({
  children,
}: WishListContextProviderProps) => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  const {
    data: wishlist = {} as Wishlist,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['wishlist', user?._id],
    queryFn: async () => {
      try {
        const { data } = await axios.get<Wishlist>(`/wishlist/${user?._id}`);
        return data;
      } catch (error) {
        console.error(error);
      }
    },
    enabled: !!user?._id,
  });

  const checkProductInWishlist = (wishlistProductId: string) => {
    return wishlist.products?.some(
      (product) => product._id === wishlistProductId
    );
  };

  const { mutate: toggleWishlistProduct } = useMutation({
    mutationFn: async (wishlistProductId: string) => {
      const isProductInWishlist = checkProductInWishlist(wishlistProductId);

      if (isProductInWishlist) {
        return await axios.delete(
          `/wishlist/${user?._id}?wishlistProductId=${wishlistProductId}`
        );
      }

      await axios.put(`/wishlist/${user?._id}`, {
        product: wishlistProductId,
      });
    },
    onMutate: (wishlistProductId) => {
      queryClient.setQueryData(['wishlist'], (prevWishlist: Wishlist) => {
        const { products } = prevWishlist;

        const isProductInWishlist = products.some(
          (product) => product._id === wishlistProductId
        );

        if (isProductInWishlist) {
          return {
            ...prevWishlist,
            products: products.filter(
              (product) => product._id !== wishlistProductId
            ),
          };
        }

        return {
          ...prevWishlist,
          products: [...(products || []), { _id: wishlistProductId }],
        };
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['wishlist', user?._id] }),
    onError: (error) => console.error(error),
  });

  const value = {
    wishlistProducts: wishlist?.products,
    isLoading,
    isError,
    toggleWishlistProduct,
    checkProductInWishlist,
  };

  return (
    <WishListContext.Provider value={value}>
      {children}
    </WishListContext.Provider>
  );
};

export const useWishListContext = () => {
  const context = useContext(WishListContext);

  if (context === null) {
    throw new Error('Something went wrong in useWishListContext');
  }

  return context;
};
