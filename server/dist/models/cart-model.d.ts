import mongoose, { Document } from 'mongoose';
type CartDocument = Document & {
    userId: mongoose.Schema.Types.ObjectId;
    products: {
        product: mongoose.Schema.Types.ObjectId;
        quantity: number;
    }[];
};
declare const Cart: mongoose.Model<CartDocument, {}, {}, {}, mongoose.Document<unknown, {}, CartDocument> & mongoose.Document<any, any, any> & {
    userId: mongoose.Schema.Types.ObjectId;
    products: {
        product: mongoose.Schema.Types.ObjectId;
        quantity: number;
    }[];
} & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default Cart;
