import { Router } from 'express';
import {
  getCartById,
  createNewCart,
  insertCartItem,
  setCartItemQuantity,
  removeCartItem,
} from '../controllers/cart-controllers';

const router: Router = Router();

router.post('/', createNewCart);
router.get('/:userId', getCartById);
router.put('/:userId', insertCartItem);
router.patch('/:userId', setCartItemQuantity);
router.delete('/:userId', removeCartItem);

export default router;
