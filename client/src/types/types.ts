export type User = {
  _id: string;
  email: string;
  userName: string;
  photoURL: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Product = {
  _id: string;
  description: string;
  name: string;
  imageUrl: string;
  ratingAvg: number;
  reviewsCount: number;
  salesCount: number;
  price: number;
  stock: number;
  category: string;
  discount: number;
  isNewProduct: boolean;
  isOnSale: boolean;
  isBestSeller: boolean;
};

export type Cart = {
  _id: string;
  userId: string;
  products: {
    product: Product;
    quantity: number;
    _id: 'string';
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Wishlist = {
  _id: string;
  userId: string;
  products: Product[];
  __v: 0;
};
