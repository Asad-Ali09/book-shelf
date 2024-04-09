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
