import { Document, Schema, model } from "mongoose";
import { IUser } from "./UserModel";

type bookObjType = {
  bookID: Schema.Types.ObjectId;
  title: string;
  coverPhoto: string;
  price: number;
  author: string;
};

interface IOrder extends Document {
  books: {
    book: bookObjType;
    quantity: number;
    // seller?: IUser["_id"];
    status: "pending" | "completed" | "cancelled";
  }[];
  //   buyer: IUser["_id"];
  seller?: IUser["_id"];
  buyerName: string;
  totalPrice: number;
  shippingAddress: string;
  status: "pending" | "completed" | "cancelled";
  createdAt: Date;
  shippingPrice?: number;
  discriminator: "seller" | "buyer";
  linkedTo?: Schema.Types.ObjectId; // to distinguish between seller and buyer order
}

const orderSchema = new Schema<IOrder>({
  books: [
    {
      book: {
        bookID: {
          type: Schema.Types.ObjectId,
          ref: "Book",
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        coverPhoto: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        author: {
          type: String,
          required: true,
        },
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      status: {
        type: String,
        enum: ["pending", "completed", "cancelled"],
        default: "pending",
      },
    },
  ],
  buyerName: {
    type: String,
    required: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },
  discriminator: {
    type: String,
    enum: ["seller", "buyer"],
    required: true,
  },
  linkedTo: {
    type: Schema.Types.ObjectId,
    ref: "Order",
  },
  shippingPrice: {
    type: Number,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = model<IOrder>("Order", orderSchema);
export default Order;

export { IOrder, bookObjType };
