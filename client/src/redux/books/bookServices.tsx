import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const sellerURL = `${import.meta.env.VITE_SERVER_URL}/api/v1/books`;

type booksReturnType = {
  message: string;
  data: Required<IBook>[];
};

const getAllBooks = createAsyncThunk("books/getAllBooks", async () => {
  const response = await axios.get<booksReturnType>(`${sellerURL}`);
  return response.data;
});

export { getAllBooks };
