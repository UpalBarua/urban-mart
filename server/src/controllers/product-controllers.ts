import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import Product from '../models/product-model';
import { isValidObjectId } from 'mongoose';

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

const productSchema = z.object({
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

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    const validationResult = productSchema.safeParse(body);

    if (!validationResult.success) {
      return res.status(400).json({
        message: 'Invalid data provided',
        error: validationResult.error,
      });
    }

    const newProduct = new Product(validationResult.data);
    const result = await newProduct.save();

    if (result) {
      return res.status(201).json(result);
    }

    res.status(400).json({ message: 'No product created' });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid product id' });
    }

    const product = await Product.findOne({ _id: id }).lean();

    if (product) {
      return res.status(200).json(product);
    }

    res.status(404).json({ message: 'No product found' });
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find({}).lean();

    if (products) {
      return res.status(200).json(products);
    }

    res.status(404).json({ message: 'No product found' });
  } catch (error) {
    next(error);
  }
};
