import { Router } from 'express';
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewById,
} from '../controllers/review-controllers';

const router: Router = Router();

router.get('/', getAllReviews);
router.post('/', createReview);
router.get('/:productId', getReviewById);
router.delete('/:productId', deleteReview);

export default router;
