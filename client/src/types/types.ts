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
