import mongoose, { Document } from 'mongoose';

type UserDocument = Document & {
  email: string;
  userName: string;
  photoURL: string;
  role: string;
};

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      match: [
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        'Invalid email format',
      ],
    },
    userName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
      match: [/^[a-zA-Z \-]+$/, 'Invalid userName'],
    },
    photoURL: {
      type: String,
      required: true,
      match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, 'Invalid photoURL'],
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

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
