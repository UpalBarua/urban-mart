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
exports.getUserByEmail = exports.createNewUser = void 0;
const user_model_1 = __importDefault(require("../models/user-model"));
const schemas_1 = require("../utils/schemas");
const zod_1 = require("zod");
const createNewUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const validationResult = schemas_1.userSchema.safeParse(body);
        if (!validationResult.success) {
            return res
                .status(400)
                .json({ message: 'Invalid body', error: validationResult.error });
        }
        const existingUser = yield user_model_1.default.findOne({
            email: validationResult.data.email,
        });
        if (existingUser) {
            return res.status(409).json({ message: 'Email is already in use' });
        }
        const newUser = new user_model_1.default(validationResult.data);
        const result = yield newUser.save();
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.createNewUser = createNewUser;
const getUserByEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const validationResult = zod_1.z.string().email().safeParse(email);
        if (!validationResult.success) {
            return res.status(400).json({ message: 'Invalid email address' });
        }
        const foundUser = yield user_model_1.default.findOne({ email }).lean();
        if (foundUser) {
            return res.status(200).json(foundUser);
        }
        res.status(404).json({ message: 'No user found' });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserByEmail = getUserByEmail;
