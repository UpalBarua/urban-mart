import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import Product from '../models/product-model';
import { productSchema } from '../utils/schemas';

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
