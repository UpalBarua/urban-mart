import mongoose, { Document } from 'mongoose';
type WishlistDocument = Document & {
    userId: mongoose.Schema.Types.ObjectId;
    products: mongoose.Schema.Types.ObjectId[];
};
declare const Wishlist: mongoose.Model<WishlistDocument, {}, {}, {}, mongoose.Document<unknown, {}, WishlistDocument> & mongoose.Document<any, any, any> & {
    userId: mongoose.Schema.Types.ObjectId;
    products: mongoose.Schema.Types.ObjectId[];
} & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default Wishlist;
