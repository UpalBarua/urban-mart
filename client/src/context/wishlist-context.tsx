import axios from '@/api/axios';
import type { Product, Wishlist } from '@/types/types';
import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { createContext, useContext } from 'react';
import { useAuthContext } from './auth-context';

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
      queryClient.setQueryData(
        ['wishlist', user?._id],
        (prevWishlist: Wishlist) => {
          const isProductInWishlist = prevWishlist.products.some(
            (product) => product._id === wishlistProductId
          );

          if (isProductInWishlist) {
            return {
              ...prevWishlist,
              products: prevWishlist.products.filter(
                (product) => product._id !== wishlistProductId
              ),
            };
          }

          return {
            ...prevWishlist,
            products: [
              ...(prevWishlist.products || []),
              { _id: wishlistProductId },
            ],
          };
        }
      );
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
