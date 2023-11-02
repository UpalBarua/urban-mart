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
exports.getAllProducts = exports.getProductById = exports.createProduct = void 0;
const mongoose_1 = require("mongoose");
const product_model_1 = __importDefault(require("../models/product-model"));
const schemas_1 = require("../utils/schemas");
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const validationResult = schemas_1.productSchema.safeParse(body);
        if (!validationResult.success) {
            return res.status(400).json({
                message: 'Invalid data provided',
                error: validationResult.error,
            });
        }
        const newProduct = new product_model_1.default(validationResult.data);
        const result = yield newProduct.save();
        if (result) {
            return res.status(201).json(result);
        }
        res.status(400).json({ message: 'No product created' });
    }
    catch (error) {
        next(error);
    }
});
exports.createProduct = createProduct;
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            return res.status(400).json({ message: 'Invalid product id' });
        }
        const product = yield product_model_1.default.findOne({ _id: id }).lean();
        if (product) {
            return res.status(200).json(product);
        }
        res.status(404).json({ message: 'No product found' });
    }
    catch (error) {
        next(error);
    }
});
exports.getProductById = getProductById;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        let sortOptions = {};
        const { search, sort } = req.query;
        if (search) {
            query = { $text: { $search: search } };
        }
        if (sort) {
            sortOptions = { [sort]: -1 };
        }
        const products = yield product_model_1.default.find(query).sort(sortOptions);
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getAllProducts = getAllProducts;
