import mongoose, { Document } from 'mongoose';

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

type ProductDocument = Document & {
  name: string;
  imageUrl: string;
  ratingAvg: number;
  reviewsCount: number;
  salesCount: number;
  price: number;
  stock: number;
  category: string;
  description: string;
  discount: number;
  isOnSale: boolean;
  isBestSeller: boolean;
  isNewProduct: boolean;
};

const productSchema = new mongoose.Schema<ProductDocument>(
  {
    name: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 100,
      match: [/^[a-zA-Z \-]+$/, 'Invalid product name'],
    },
    imageUrl: {
      type: String,
      required: true,
      match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, 'Invalid imageURL'],
    },
    ratingAvg: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    reviewsCount: {
      type: Number,
      required: true,
      min: 0,
    },
    salesCount: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    category: {
      type: String,
      enum: categories,
    },
    description: {
      type: String,
      required: true,
      minLength: 20,
      maxLength: 500,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 50,
    },
    isOnSale: {
      type: Boolean,
      default: false,
    },
    isBestSeller: {
      type: Boolean,
      default: false,
    },
    isNewProduct: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<ProductDocument>('Product', productSchema);

export default Product;
