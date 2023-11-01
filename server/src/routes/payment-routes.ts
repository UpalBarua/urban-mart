import { Router } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import type { Product } from '../utils/schemas';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_API_KEY || '', {});

const router: Router = Router();

router.post('/create-checkout-session', async (req, res) => {
  const { products } = req.body;

  const line_items = products.map(
    ({ product, quantity }: { product: Product; quantity: number }) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            images: [product.imageUrl],
            description: product.description,
          },
          unit_amount: product.price * 100,
        },
        quantity,
      };
    }
  );

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.status(200).json({ url: session.url });
});

export default router;
