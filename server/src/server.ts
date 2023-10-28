import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import errorHandler from './middlewares/error-handler';
import userRoutes from './routes/user-routes';
import productRoutes from './routes/product-routes';
import cartRoutes from './routes/cart-routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const uri = process.env.DB_URI || '';

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(errorHandler);

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.use((req: Request, res: Response) =>
  res.status(404).json({ message: 'not Found' })
);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'server running' });
});

mongoose
  .connect(uri)
  .then(() => {
    app.listen(port, () => {
      console.log(`[server] running on http://localhost:${port}/`);
    });
  })
  .catch((error) => {
    console.log(`[database] connection error: ${error}`);
    process.exit(1);
  });
