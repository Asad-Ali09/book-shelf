/// <reference types="vite/client" />

// User Type
interface IUser {
  _id: string;
  name: string;
  email: string;
}

interface IBook {
  _id: string;
  title: string;
  description: string;
  coverPhoto: string;
  genres: string[];
  author: string;
  price: number;
  quantity: number;
  createdAt: Date;
  seller?: IUser;
}

type RIBook = Required<IBook>;

type shippingDetailsType = {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state?: string;
  zip: number;
  country: string;
};

interface IOrder {
  _id: string;
  books: {
    book: OrderBookType;
    quantity: number;
    status: "pending" | "completed" | "cancelled";
  }[];
  buyerName: string;
  totalPrice: number;
  shippingAddress: string;
  status: "pending" | "completed" | "cancelled";
  createdAt: Date;
}

type OrderBooksType = IOrder["books"];

type OrderBookType = {
  _id: string;
  bookID: string;
  title: string;
  coverPhoto: string;
  author: string;
  price: number;
  quantity: number;
};
