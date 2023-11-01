import mongoose from 'mongoose';
import { z } from 'zod';

const categories = [
  'Canned',
  'Beverages',
  'Fresh Produce',
  'Dairy',
  'Bakery',
  'Pantry Staples',
  'Snacks',
  'Frozen Foods',
] as const;

export const productSchema = z.object({
  name: z.string().min(5).max(100),
  imageUrl: z.string().url(),
  ratingAvg: z.number().min(0).max(5),
  reviewsCount: z.number().min(0),
  salesCount: z.number().min(0),
  price: z.number().min(0),
  stock: z.number().min(0),
  category: z.enum(categories),
  description: z.string().min(20).max(500),
  discount: z.number().min(0).max(50).default(0),
  isOnSale: z.boolean().default(false),
  isBestSeller: z.boolean().default(false),
  isNewProduct: z.boolean().default(false),
});

export type Product = z.infer<typeof productSchema>;

export const userSchema = z.object({
  email: z.string().email(),
  userName: z.string().min(3).max(20),
  photoURL: z.string().url(),
});

export const cartItemSchema = z.object({
  quantity: z.number().min(1).default(1),
  product: z.string().refine((value) => {
    return mongoose.Types.ObjectId.isValid(value);
  }),
});

export const cartSchema = z.object({
  userId: z.string().refine((value) => {
    return mongoose.Types.ObjectId.isValid(value);
  }),
  products: z.array(cartItemSchema),
});

export const reviewSchema = z.object({
  user: z.string(),
  product: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string(),
});
