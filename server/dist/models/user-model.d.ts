import mongoose, { Document } from 'mongoose';
type UserDocument = Document & {
    email: string;
    userName: string;
    photoURL: string;
    role: string;
};
declare const User: mongoose.Model<UserDocument, {}, {}, {}, mongoose.Document<unknown, {}, UserDocument> & mongoose.Document<any, any, any> & {
    email: string;
    userName: string;
    photoURL: string;
    role: string;
} & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default User;
