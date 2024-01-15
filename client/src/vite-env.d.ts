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
  genre: string;
  author: string;
  price: number;
  quantity: number;
  createdAt: Date;
  seller?: IUser;
}
