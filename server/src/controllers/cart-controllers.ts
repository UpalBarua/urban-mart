import type { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import Cart from '../models/cart-model';
import { cartItemSchema, cartSchema } from '../utils/schemas';
import { z } from 'zod';

export const getCartById = async (
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

    const foundCart = await Cart.findOne({ userId })
      .populate('products.product')
      .lean();

    if (foundCart) {
      return res.status(200).json(foundCart);
    }

    res.status(404).json({ message: 'Could not find the requested cart' });
  } catch (error) {
    next(error);
  }
};

export const createNewCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    const validationResult = cartSchema.safeParse(body);

    if (!validationResult.success) {
      return res.status(400).json({
        message: 'The provided request body is not valid',
        error: validationResult.error,
      });
    }

    const existingCart = await Cart.findOne({ userId: body.userId });

    if (existingCart) {
      return res
        .status(403)
        .json({ message: 'Cart for this user already exists' });
    }

    const newCart = new Cart(validationResult.data);
    const result = await newCart.save();

    if (result) {
      return res.status(201).json(result);
    }

    res.status(400).json({ message: 'Failed to create new cart' });
  } catch (error) {
    next(error);
  }
};

export const insertCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body,
      params: { userId },
    } = req;

    if (!isValidObjectId(userId)) {
      return res
        .status(400)
        .json({ message: 'The provided user ID is not valid' });
    }

    const validationResult = cartItemSchema.safeParse(body);

    if (!validationResult.success) {
      return res.status(400).json({
        message: 'The provided request body is not valid',
        error: validationResult.error,
      });
    }

    const updatedCart = await Cart.updateOne(
      { userId },
      { $push: { products: body } },
      { new: true }
    ).lean();

    if (updatedCart) {
      return res.status(200).json(updatedCart);
    }

    res.status(404).json({ message: 'Could not find the requested cart' });
  } catch (error) {
    next(error);
  }
};

export const setCartItemQuantity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { userId },
      query: { cartItemId },
      body: { quantity },
    } = req;

    if (!isValidObjectId(userId)) {
      return res
        .status(400)
        .json({ message: 'The provided user ID is not valid' });
    }

    if (!isValidObjectId(cartItemId)) {
      return res
        .status(400)
        .json({ message: 'The provided cart item ID is not valid' });
    }

    const validationResult = z.number().min(1).safeParse(quantity);

    if (!validationResult.success) {
      return res
        .status(400)
        .json({ message: 'The provided request body is not valid' });
    }

    const updatedCart = await Cart.updateOne(
      { userId, 'products._id': cartItemId },
      { $set: { 'products.$.quantity': validationResult.data } },
      { new: true }
    );

    if (updatedCart) {
      return res.status(201).json(updatedCart);
    }

    res.status(404).json({ message: 'Could not find the requested cart' });
  } catch (error) {
    next(error);
  }
};

export const removeCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { userId },
      query: { cartItemId },
    } = req;

    if (!isValidObjectId(userId)) {
      return res
        .status(400)
        .json({ message: 'The provided user ID is not valid' });
    }

    if (!isValidObjectId(cartItemId)) {
      return res
        .status(400)
        .json({ message: 'The provided cart item ID is not valid' });
    }

    const updatedCart = await Cart.updateOne(
      { userId },
      { $pull: { products: { _id: cartItemId } } }
    );

    if (updatedCart) {
      res.status(204).json(updatedCart);
    }

    res.status(404).json({ message: 'Could not find the requested cart' });
  } catch (error) {
    next(error);
  }
};
