import { Router } from 'express';
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewById,
} from '../controllers/review-controllers';
import Review from '../models/review-model';

const router: Router = Router();

router.get('/', getAllReviews);
router.post('/', createReview);
router.get('/:productId', getReviewById);
router.delete('/', deleteReview);

// router.delete('/', async (req, res) => {
//   const result = await Review.deleteMany({});
//   res.send(result);
// });

export default router;
