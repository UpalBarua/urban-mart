import axios from '@/api/axios';
import type { Cart, Product } from '@/types/types';
import {
  type UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { createContext, useContext } from 'react';
import { useAuthContext } from './auth-context';

type CartContextProviderProps = {
  children: React.ReactNode;
};

type CartContextProps = {
  cartProducts: {
    product: Product;
    quantity: number;
    _id: string;
  }[];
  isLoading: boolean;
  isError: boolean;
  addToCart: UseMutateFunction<
    void,
    Error,
    {
      product: Product;
      quantity: number;
    },
    void
  >;
  removeCartItem: UseMutateFunction<void, Error, string, void>;
  setCartItemQuantity: UseMutateFunction<
    void,
    Error,
    {
      cartItemId: string;
      quantity: number;
    },
    void
  >;
  checkProductInCart: (productId: string) => boolean;
};

const CartContext = createContext<CartContextProps | null>(null);

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  const {
    data: cart = {} as Cart,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['cart', user?._id],
    queryFn: async () => {
      try {
        const { data } = await axios.get<Cart>(`/carts/${user?._id}`);
        return data;
      } catch (error) {
        console.error(error);
      }
    },
    enabled: !!user?._id,
  });

  console.log(cart);

  const checkProductInCart = (productId: string) => {
    return cart.products?.some(({ product }) => product?._id === productId);
  };

  const { mutate: addToCart } = useMutation({
    mutationFn: async ({
      product,
      quantity,
    }: {
      product: Product;
      quantity: number;
    }) => {
      if (checkProductInCart(product?._id)) return;

      await axios.put(`/carts/${user?._id}`, {
        product: product?._id,
        quantity,
      });
    },
    onMutate: (newCartItem) => {
      queryClient.setQueryData(['cart'], (oldCart: Cart) => ({
        ...oldCart,
        products: [...(oldCart?.products || []), newCartItem],
      }));
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
    onError: (error) => console.error(error),
  });

  const { mutate: removeCartItem } = useMutation({
    mutationFn: async (cartItemId: string) => {
      await axios.delete(`/carts/${user?._id}?cartItemId=${cartItemId}`);
    },
    onMutate: (cartItemId) => {
      queryClient.setQueryData(['cart'], (oldCart: Cart) => ({
        ...oldCart,
        products: oldCart.products.filter((item) => item._id !== cartItemId),
      }));
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
    onError: (error) => console.error(error),
  });

  const { mutate: setCartItemQuantity } = useMutation({
    mutationFn: async ({
      cartItemId,
      quantity,
    }: {
      cartItemId: string;
      quantity: number;
    }) => {
      await axios.patch(`/carts/${user?._id}?cartItemId=${cartItemId}`, {
        quantity,
      });
    },
    onMutate: ({ cartItemId, quantity }) => {
      queryClient.setQueryData(['cart'], (oldCart: Cart) => ({
        ...oldCart,
        products: oldCart.products.map((cartItem) =>
          cartItem._id === cartItemId ? { ...cartItem, quantity } : cartItem
        ),
      }));
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
    onError: (error) => console.error(error),
  });

  const value = {
    cartProducts: cart?.products,
    isLoading,
    isError,
    addToCart,
    removeCartItem,
    setCartItemQuantity,
    checkProductInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error('Something went wrong in useCartContext');
  }

  return context;
};
