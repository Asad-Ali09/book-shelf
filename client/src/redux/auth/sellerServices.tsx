import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const sellerURL = `${import.meta.env.VITE_SERVER_URL}/api/v1/books/seller`;

export type BookReturnType = {
  message: string;
  data: IBook;
};

export type addBookPropsType = {
  title: string;
  description: string;
  author: string;
  coverPhoto: string;
  price: number;
  quantity: number;
  genres: string[];
};

const addBook = createAsyncThunk(
  "authSlice/addBook",
  async (body: addBookPropsType, thunkAPI) => {
    try {
      const response = await axios.post<BookReturnType>(sellerURL, body);
      return response.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export type BooksReturnType = {
  message: string;
  data: IBook[];
};

const getAllSellerBooks = createAsyncThunk(
  "authSlice/getAllSellerBooks",
  async () => {
    const response = await axios.get<BooksReturnType>(`${sellerURL}`);
    return response.data.data;
  }
);

export { addBook, getAllSellerBooks };
