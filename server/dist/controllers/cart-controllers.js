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
exports.removeCartItem = exports.setCartItemQuantity = exports.insertCartItem = exports.createNewCart = exports.getCartById = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const cart_model_1 = __importDefault(require("../models/cart-model"));
const schemas_1 = require("../utils/schemas");
const getCartById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(userId)) {
            return res
                .status(400)
                .json({ message: 'The provided user ID is not valid' });
        }
        const foundCart = yield cart_model_1.default.findOne({ userId })
            .populate('products.product')
            .lean();
        if (foundCart) {
            return res.status(200).json(foundCart);
        }
        res.status(404).json({ message: 'Could not find the requested cart' });
    }
    catch (error) {
        next(error);
    }
});
exports.getCartById = getCartById;
const createNewCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const validationResult = schemas_1.cartSchema.safeParse(body);
        if (!validationResult.success) {
            return res.status(400).json({
                message: 'The provided request body is not valid',
                error: validationResult.error,
            });
        }
        const existingCart = yield cart_model_1.default.findOne({ userId: body.userId });
        if (existingCart) {
            return res
                .status(403)
                .json({ message: 'Cart for this user already exists' });
        }
        const newCart = new cart_model_1.default(validationResult.data);
        const result = yield newCart.save();
        if (result) {
            return res.status(201).json(result);
        }
        res.status(400).json({ message: 'Failed to create new cart' });
    }
    catch (error) {
        next(error);
    }
});
exports.createNewCart = createNewCart;
const insertCartItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body, params: { userId }, } = req;
        if (!(0, mongoose_1.isValidObjectId)(userId)) {
            return res
                .status(400)
                .json({ message: 'The provided user ID is not valid' });
        }
        const validationResult = schemas_1.cartItemSchema.safeParse(body);
        if (!validationResult.success) {
            return res.status(400).json({
                message: 'The provided request body is not valid',
                error: validationResult.error,
            });
        }
        const updatedCart = yield cart_model_1.default.updateOne({ userId }, { $push: { products: body } }, { new: true }).lean();
        if (updatedCart) {
            return res.status(200).json(updatedCart);
        }
        res.status(404).json({ message: 'Could not find the requested cart' });
    }
    catch (error) {
        next(error);
    }
});
exports.insertCartItem = insertCartItem;
const setCartItemQuantity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { userId }, query: { cartItemId }, body: { quantity }, } = req;
        if (!(0, mongoose_1.isValidObjectId)(userId)) {
            return res
                .status(400)
                .json({ message: 'The provided user ID is not valid' });
        }
        if (!(0, mongoose_1.isValidObjectId)(cartItemId)) {
            return res
                .status(400)
                .json({ message: 'The provided cart item ID is not valid' });
        }
        const validationResult = zod_1.z.number().min(1).safeParse(quantity);
        if (!validationResult.success) {
            return res
                .status(400)
                .json({ message: 'The provided request body is not valid' });
        }
        const updatedCart = yield cart_model_1.default.updateOne({ userId, 'products._id': cartItemId }, { $set: { 'products.$.quantity': validationResult.data } }, { new: true });
        if (updatedCart) {
            return res.status(201).json(updatedCart);
        }
        res.status(404).json({ message: 'Could not find the requested cart' });
    }
    catch (error) {
        next(error);
    }
});
exports.setCartItemQuantity = setCartItemQuantity;
const removeCartItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { userId }, query: { cartItemId }, } = req;
        if (!(0, mongoose_1.isValidObjectId)(userId)) {
            return res
                .status(400)
                .json({ message: 'The provided user ID is not valid' });
        }
        if (!(0, mongoose_1.isValidObjectId)(cartItemId)) {
            return res
                .status(400)
                .json({ message: 'The provided cart item ID is not valid' });
        }
        const updatedCart = yield cart_model_1.default.updateOne({ userId }, { $pull: { products: { _id: cartItemId } } });
        if (updatedCart) {
            res.status(204).json(updatedCart);
        }
        res.status(404).json({ message: 'Could not find the requested cart' });
    }
    catch (error) {
        next(error);
    }
});
exports.removeCartItem = removeCartItem;
