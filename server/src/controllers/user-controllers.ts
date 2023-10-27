import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import User from '../models/user-model';

const emailSchema = z.string().email();

const userSchema = z.object({
  email: emailSchema,
  userName: z.string().min(3).max(20),
  photoURL: z.string().url(),
});

export const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    const validationResult = userSchema.safeParse(body);

    if (!validationResult.success) {
      return res
        .status(400)
        .json({ message: 'Invalid body', error: validationResult.error });
    }

    const existingUser = await User.findOne({
      email: validationResult.data.email,
    });

    if (existingUser) {
      return res.status(409).json({ message: 'Email is already in use' });
    }

    const newUser = new User(validationResult.data);
    const result = await newUser.save();

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.params;

    const validationResult = emailSchema.safeParse(email);

    if (!validationResult.success) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    const foundUser = await User.findOne({ email }).lean();

    if (foundUser) {
      return res.status(200).json(foundUser);
    }

    res.status(404).json({ message: 'No user found' });
  } catch (error) {
    next(error);
  }
};
