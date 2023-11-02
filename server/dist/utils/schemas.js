"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewSchema = exports.cartSchema = exports.cartItemSchema = exports.userSchema = exports.productSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const categories = [
    'Canned',
    'Beverages',
    'Fresh Produce',
    'Dairy',
    'Bakery',
    'Pantry Staples',
    'Snacks',
    'Frozen Foods',
];
exports.productSchema = zod_1.z.object({
    name: zod_1.z.string().min(5).max(100),
    imageUrl: zod_1.z.string().url(),
    ratingAvg: zod_1.z.number().min(0).max(5),
    reviewsCount: zod_1.z.number().min(0),
    salesCount: zod_1.z.number().min(0),
    price: zod_1.z.number().min(0),
    stock: zod_1.z.number().min(0),
    category: zod_1.z.enum(categories),
    description: zod_1.z.string().min(20).max(500),
    discount: zod_1.z.number().min(0).max(50).default(0),
    isOnSale: zod_1.z.boolean().default(false),
    isBestSeller: zod_1.z.boolean().default(false),
    isNewProduct: zod_1.z.boolean().default(false),
});
exports.userSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    userName: zod_1.z.string().min(3).max(20),
    photoURL: zod_1.z.string().url(),
});
exports.cartItemSchema = zod_1.z.object({
    quantity: zod_1.z.number().min(1).default(1),
    product: zod_1.z.string().refine((value) => {
        return mongoose_1.default.Types.ObjectId.isValid(value);
    }),
});
exports.cartSchema = zod_1.z.object({
    userId: zod_1.z.string().refine((value) => {
        return mongoose_1.default.Types.ObjectId.isValid(value);
    }),
    products: zod_1.z.array(exports.cartItemSchema),
});
exports.reviewSchema = zod_1.z.object({
    user: zod_1.z.string(),
    product: zod_1.z.string(),
    rating: zod_1.z.number().min(1).max(5),
    comment: zod_1.z.string(),
});
