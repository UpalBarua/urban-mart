import mongoose, { Document } from 'mongoose';
import z from 'zod';

type ProductDocument = Document & {
  title: string;
  imageUrl: string;
  ratingAvg: string;
  reviewsCount: string;
  salesCount: string;
  price: number;
  stock: number;
  seller: string;
  category: string;
  description: {
    main: string;
    list: string[];
  };
  discount: number;
  isNew: boolean;
  isOnSale: boolean;
  isBestSeller: boolean;
};

// ! Needs checking
// const imageUrlSchema = z.string().url().nonempty();
const imageUrlSchema = z.string();

const productSchema = new mongoose.Schema<Document>(
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
      type: String,
      required: true,
      default: 1.0,
    },
    reviewsCount: {
      type: String,
      required: true,
    },
    salesCount: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    seller: {
      type: String,
      required: true,
      default: 'kit kart',
    },
    category: {
      type: String,
    },
    description: {
      main: {
        type: String,
        required: true,
      },
      list: {
        type: [String],
        required: true,
      },
    },
    discount: Number,
    isOnSale: Boolean,
    isBestSeller: Boolean,
    isNew: Boolean,
  },
  {
    suppressReservedKeysWarning: true,
    timestamps: true,
  }
);

const Product = mongoose.model<ProductDocument>('Product', productSchema);

export default Product;
