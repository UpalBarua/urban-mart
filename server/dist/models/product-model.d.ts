import mongoose, { Document } from 'mongoose';
type ProductDocument = Document & {
    name: string;
    imageUrl: string;
    ratingAvg: number;
    reviewsCount: number;
    salesCount: number;
    price: number;
    stock: number;
    category: string;
    description: string;
    discount: number;
    isOnSale: boolean;
    isBestSeller: boolean;
    isNewProduct: boolean;
};
declare const Product: mongoose.Model<ProductDocument, {}, {}, {}, mongoose.Document<unknown, {}, ProductDocument> & mongoose.Document<any, any, any> & {
    name: string;
    imageUrl: string;
    ratingAvg: number;
    reviewsCount: number;
    salesCount: number;
    price: number;
    stock: number;
    category: string;
    description: string;
    discount: number;
    isOnSale: boolean;
    isBestSeller: boolean;
    isNewProduct: boolean;
} & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default Product;
