import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { z } from 'zod';
import Wishlist from '../models/wishlist-model';
import { productSchema } from '../utils/schemas';

const wishlistSchema = z.object({
  userId: z.string().refine((value) => isValidObjectId(value)),
  products: z.array(productSchema).optional(),
});

export const getWishlistById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
      return res
        .status(400)
        .json({ message: 'The provided user ID is not valid' });
    }

    const foundWishlist = await Wishlist.findOne({ userId })
      .populate('products')
      .lean();

    if (foundWishlist) {
      return res.status(200).json(foundWishlist);
    }

    res.status(400).json({ message: 'Could not find the requested wishlist' });
  } catch (error) {
    next(error);
  }
};

export const createNewWishlist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    const validationResult = wishlistSchema.safeParse(body);

    if (!validationResult.success) {
      return res.status(400).json({
        message: 'The provided request body is not valid',
        error: validationResult.error,
      });
    }

    const existingWishlist = await Wishlist.findOne({ userId: body.userId });

    if (existingWishlist) {
      return res
        .status(403)
        .json({ message: 'Wishlist for this user already exists' });
    }

    const newWishlist = new Wishlist(validationResult.data);
    const result = await newWishlist.save();

    if (result) {
      return res.status(201).json(result);
    }

    res.status(400).json({ message: 'Failed to create a new wishlist' });
  } catch (error) {
    next(error);
  }
};

export const insertWishlistProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { userId },
      body: { product },
    } = req;

    if (!isValidObjectId(userId)) {
      return res
        .status(400)
        .json({ message: 'The provided user ID is not valid' });
    }

    if (!isValidObjectId(product)) {
      return res
        .status(400)
        .json({ message: 'The provided product is not valid' });
    }

    const updatedWishlist = await Wishlist.updateOne(
      { userId },
      { $push: { products: product } },
      { new: true }
    ).lean();

    if (updatedWishlist) {
      return res.status(200).json(updatedWishlist);
    }

    res.status(404).json({ message: 'Could not find the requested wishlist' });
  } catch (error) {
    next(error);
  }
};

export const removeWishlistProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { userId },
      query: { wishlistProductId },
    } = req;

    if (!isValidObjectId(userId)) {
      return res
        .status(400)
        .json({ message: 'The provided user ID is not valid' });
    }

    if (!isValidObjectId(wishlistProductId)) {
      return res
        .status(400)
        .json({ message: 'The provided wishlist product ID is not valid' });
    }

    const updatedWishlist = await Wishlist.updateOne(
      { userId },
      { $pull: { products: wishlistProductId } }
    ).lean();

    if (updatedWishlist) {
      return res.status(204).json(updatedWishlist);
    }

    res.status(404).json({ message: 'Could not find the requested wishlist' });
  } catch (error) {
    next(error);
  }
};
