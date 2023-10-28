import { Router } from 'express';
import {
  createNewWishlist,
  getWishlistById,
  insertWishlistProduct,
  removeWishlistProduct,
} from '../controllers/wishlist-controllers';

const router: Router = Router();

router.post('/', createNewWishlist);
router.get('/:userId', getWishlistById);
router.put('/:userId', insertWishlistProduct);
router.delete('/:userId', removeWishlistProduct);

export default router;
