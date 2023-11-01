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
const express_1 = require("express");
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const stripe = new stripe_1.default(process.env.STRIPE_API_KEY || '', {});
const router = (0, express_1.Router)();
router.post('/create-checkout-session', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { products } = req.body;
    const line_items = products.map(({ product, quantity }) => {
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: product.name,
                    images: [product.imageUrl],
                    description: product.description,
                },
                unit_amount: product.price * 100,
            },
            quantity,
        };
    });
    const session = yield stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/checkout-success`,
        cancel_url: `${process.env.CLIENT_URL}/cart`,
    });
    res.status(200).json({ url: session.url });
}));
exports.default = router;
