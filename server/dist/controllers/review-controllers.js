"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReview = exports.deleteReview = exports.getReviewById = exports.getAllReviews = void 0;
const mongoose_1 = require("mongoose");
const review_model_1 = __importDefault(require("../models/review-model"));
const schemas_1 = require("../utils/schemas");
const getAllReviews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundReviews = yield review_model_1.default.find({})
            .populate(['product', 'user'])
            .lean();
        if (foundReviews) {
            return res.status(200).json(foundReviews);
        }
        res.status(404).json({ message: 'Reviews not found' });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllReviews = getAllReviews;
const getReviewById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(productId)) {
            res.status(400).json({ message: 'Invalid productId' });
        }
        const foundReviews = yield review_model_1.default.find({ product: productId })
            .populate(['product', 'user'])
            .lean();
        if (foundReviews) {
            return res.status(200).json(foundReviews);
        }
        res.status(404).json({ message: 'Reviews not found' });
    }
    catch (error) {
        next(error);
    }
});
exports.getReviewById = getReviewById;
const deleteReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.query;
        if (!(0, mongoose_1.isValidObjectId)(productId)) {
            return res.status(400).json({ message: 'Invalid id' });
        }
        // console.log(
        //   await Review.findOne({ product: productId })
        //     .populate(['product', 'user'])
        //     .lean()
        // );
        const deleteResult = yield review_model_1.default.deleteOne({ product: productId });
        if (deleteResult.deletedCount > 0) {
            return res.status(200).json(deleteResult);
        }
        res.status(404).json({ message: 'No review found' });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteReview = deleteReview;
const createReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const validationResult = schemas_1.reviewSchema.safeParse(body);
        if (!validationResult.success) {
            return res
                .status(400)
                .json({ message: 'Invalid body', error: validationResult.error });
        }
        const newReview = new review_model_1.default(validationResult.data);
        const result = yield newReview.save();
        if (result) {
            return res.status(201).json(result);
        }
        return res.status(400).json({ message: 'Failed to create review' });
    }
    catch (error) {
        next(error);
    }
});
exports.createReview = createReview;
