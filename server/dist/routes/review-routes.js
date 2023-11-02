"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_controllers_1 = require("../controllers/review-controllers");
const router = (0, express_1.Router)();
router.get('/', review_controllers_1.getAllReviews);
router.post('/', review_controllers_1.createReview);
router.get('/:productId', review_controllers_1.getReviewById);
router.delete('/', review_controllers_1.deleteReview);
// router.delete('/', async (req, res) => {
//   const result = await Review.deleteMany({});
//   res.send(result);
// });
exports.default = router;
