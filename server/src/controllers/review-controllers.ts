import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import Review from '../models/review-model';
import { reviewSchema } from '../utils/schemas';

export const getAllReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const foundReviews = await Review.find({})
      .populate(['product', 'user'])
      .lean();

    if (foundReviews) {
      return res.status(200).json(foundReviews);
    }

    res.status(404).json({ message: 'Reviews not found' });
  } catch (error) {
    next(error);
  }
};

export const getReviewById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;

    if (!isValidObjectId(productId)) {
      res.status(400).json({ message: 'Invalid productId' });
    }

    const foundReviews = await Review.find({ product: productId })
      .populate(['product', 'user'])
      .lean();

    if (foundReviews) {
      return res.status(200).json(foundReviews);
    }

    res.status(404).json({ message: 'Reviews not found' });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.query;

    if (!isValidObjectId(productId)) {
      return res.status(400).json({ message: 'Invalid id' });
    }

    // console.log(
    //   await Review.findOne({ product: productId })
    //     .populate(['product', 'user'])
    //     .lean()
    // );

    const deleteResult = await Review.deleteOne({ product: productId });

    if (deleteResult.deletedCount > 0) {
      return res.status(200).json(deleteResult);
    }

    res.status(404).json({ message: 'No review found' });
  } catch (error) {
    next(error);
  }
};

export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    const validationResult = reviewSchema.safeParse(body);

    if (!validationResult.success) {
      return res
        .status(400)
        .json({ message: 'Invalid body', error: validationResult.error });
    }

    const newReview = new Review(validationResult.data);
    const result = await newReview.save();

    if (result) {
      return res.status(201).json(result);
    }

    return res.status(400).json({ message: 'Failed to create review' });
  } catch (error) {
    next(error);
  }
};
