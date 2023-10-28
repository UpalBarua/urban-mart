import mongoose, { Document } from 'mongoose';

type WishlistDocument = Document & {
  userId: mongoose.Schema.Types.ObjectId;
  products: mongoose.Schema.Types.ObjectId[];
};

const wishlistSchema = new mongoose.Schema<WishlistDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  ],
});

const Wishlist = mongoose.model<WishlistDocument>('Wishlist', wishlistSchema);
export default Wishlist;
