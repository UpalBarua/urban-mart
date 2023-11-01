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
exports.removeWishlistProduct = exports.insertWishlistProduct = exports.createNewWishlist = exports.getWishlistById = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const wishlist_model_1 = __importDefault(require("../models/wishlist-model"));
const schemas_1 = require("../utils/schemas");
const wishlistSchema = zod_1.z.object({
    userId: zod_1.z.string().refine((value) => (0, mongoose_1.isValidObjectId)(value)),
    products: zod_1.z.array(schemas_1.productSchema).optional(),
});
const getWishlistById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(userId)) {
            return res
                .status(400)
                .json({ message: 'The provided user ID is not valid' });
        }
        const foundWishlist = yield wishlist_model_1.default.findOne({ userId })
            .populate('products')
            .lean();
        if (foundWishlist) {
            return res.status(200).json(foundWishlist);
        }
        res.status(400).json({ message: 'Could not find the requested wishlist' });
    }
    catch (error) {
        next(error);
    }
});
exports.getWishlistById = getWishlistById;
const createNewWishlist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const validationResult = wishlistSchema.safeParse(body);
        if (!validationResult.success) {
            return res.status(400).json({
                message: 'The provided request body is not valid',
                error: validationResult.error,
            });
        }
        const existingWishlist = yield wishlist_model_1.default.findOne({ userId: body.userId });
        if (existingWishlist) {
            return res
                .status(403)
                .json({ message: 'Wishlist for this user already exists' });
        }
        const newWishlist = new wishlist_model_1.default(validationResult.data);
        const result = yield newWishlist.save();
        if (result) {
            return res.status(201).json(result);
        }
        res.status(400).json({ message: 'Failed to create a new wishlist' });
    }
    catch (error) {
        next(error);
    }
});
exports.createNewWishlist = createNewWishlist;
const insertWishlistProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { userId }, body: { product }, } = req;
        if (!(0, mongoose_1.isValidObjectId)(userId)) {
            return res
                .status(400)
                .json({ message: 'The provided user ID is not valid' });
        }
        if (!(0, mongoose_1.isValidObjectId)(product)) {
            return res
                .status(400)
                .json({ message: 'The provided product is not valid' });
        }
        const updatedWishlist = yield wishlist_model_1.default.updateOne({ userId }, { $push: { products: product } }, { new: true }).lean();
        if (updatedWishlist) {
            return res.status(200).json(updatedWishlist);
        }
        res.status(404).json({ message: 'Could not find the requested wishlist' });
    }
    catch (error) {
        next(error);
    }
});
exports.insertWishlistProduct = insertWishlistProduct;
const removeWishlistProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { userId }, query: { wishlistProductId }, } = req;
        if (!(0, mongoose_1.isValidObjectId)(userId)) {
            return res
                .status(400)
                .json({ message: 'The provided user ID is not valid' });
        }
        if (!(0, mongoose_1.isValidObjectId)(wishlistProductId)) {
            return res
                .status(400)
                .json({ message: 'The provided wishlist product ID is not valid' });
        }
        const updatedWishlist = yield wishlist_model_1.default.updateOne({ userId }, { $pull: { products: wishlistProductId } }).lean();
        if (updatedWishlist) {
            return res.status(204).json(updatedWishlist);
        }
        res.status(404).json({ message: 'Could not find the requested wishlist' });
    }
    catch (error) {
        next(error);
    }
});
exports.removeWishlistProduct = removeWishlistProduct;
