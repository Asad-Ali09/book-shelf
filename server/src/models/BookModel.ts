import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./UserModel";

interface IBook extends Document {
  title: string;
  description: string;
  coverPhoto: string;
  author: IUser["_id"];
  price: number;
  quantity: number;
  readonly createdAt: Date;
}

const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    trim: true,
    minlength: [3, "Title must be at least 3 characters"],
  },
  description: {
    type: String,
    required: [true, "Please provide description for book"],
    minlength: [10, "Description must be atleast 10 characters"],
  },
  coverPhoto: {
    type: String,
    required: [true, "PLease provide cover photo for book"],
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide an author"],
  },
  price: { type: Number, required: [true, "Please Provide price for book"] },
  quantity: { type: Number, default: 1 },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BookModel = mongoose.model<IBook>("Book", bookSchema);
export default BookModel;

export { IBook };
