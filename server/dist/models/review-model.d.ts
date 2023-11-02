import mongoose, { Document } from 'mongoose';
type ReviewDocument = Document & {
    user: mongoose.Schema.Types.ObjectId;
    product: mongoose.Schema.Types.ObjectId;
    rating: number;
    comment: string;
};
declare const Review: mongoose.Model<ReviewDocument, {}, {}, {}, mongoose.Document<unknown, {}, ReviewDocument> & mongoose.Document<any, any, any> & {
    user: mongoose.Schema.Types.ObjectId;
    product: mongoose.Schema.Types.ObjectId;
    rating: number;
    comment: string;
} & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default Review;
