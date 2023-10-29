import mongoose, { Document } from 'mongoose';

type ReviewDocument = Document & {
  user: mongoose.Schema.Types.ObjectId;
  product: mongoose.Schema.Types.ObjectId;
  rating: number;
  comment: string;
};

const ReviewSchema = new mongoose.Schema<ReviewDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model<ReviewDocument>('Review', ReviewSchema);
export default Review;
