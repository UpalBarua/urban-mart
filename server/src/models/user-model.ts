import mongoose, { Document } from 'mongoose';

type UserDocument = Document & {
  email: string;
  userName: string;
  role: string;
};

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      validate: {
        validator: (value: string) =>
          /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value),
        message: 'Invalid email format',
      },
    },
    userName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    role: {
      type: String,
      required: true,
      default: 'user',
      enum: ['user', 'admin'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<UserDocument>('User', userSchema);
