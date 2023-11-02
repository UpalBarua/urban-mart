"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const error_handler_1 = __importDefault(require("./middlewares/error-handler"));
const user_routes_1 = __importDefault(require("./routes/user-routes"));
const product_routes_1 = __importDefault(require("./routes/product-routes"));
const cart_routes_1 = __importDefault(require("./routes/cart-routes"));
const wishlist_routes_1 = __importDefault(require("./routes/wishlist-routes"));
const review_routes_1 = __importDefault(require("./routes/review-routes"));
const payment_routes_1 = __importDefault(require("./routes/payment-routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
const uri = process.env.DB_URI || '';
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(error_handler_1.default);
app.use('/api/users', user_routes_1.default);
app.use('/api/products', product_routes_1.default);
app.use('/api/carts', cart_routes_1.default);
app.use('/api/wishlist', wishlist_routes_1.default);
app.use('/api/reviews', review_routes_1.default);
app.use('/api/payment', payment_routes_1.default);
app.use((req, res) => res.status(404).json({ message: 'not Found' }));
app.get('/', (req, res) => {
    res.status(200).json({ message: 'server running' });
});
mongoose_1.default
    .connect(uri)
    .then(() => {
    app.listen(port, () => {
        console.log(`[server] running on http://localhost:${port}/`);
    });
})
    .catch((error) => {
    console.log(`[database] connection error: ${error}`);
    process.exit(1);
});
