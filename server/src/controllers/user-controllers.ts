import { Request, Response } from 'express';
import User from '../models/user-model';
import { z } from 'zod';

const emailSchema = z.string().email();

const userSchema = z.object({
  email: emailSchema,
  userName: z.string().min(3).max(20),
});

export const createNewUser = async (req: Request, res: Response) => {
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

    const createdUser = await User.create(validationResult.data);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json(error);
  }
};
