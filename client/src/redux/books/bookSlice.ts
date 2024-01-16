import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getAllBooks } from "./bookServices";

export interface bookSliceType {
  books: IBook[];
  loading: boolean;
  error: string | null;
}

const initialState: bookSliceType = {
  books: [],
  loading: false,
  error: null,
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllBooks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllBooks.fulfilled, (state, action) => {
      state.books = action.payload.data;
      state.loading = false;
    });
    builder.addCase(getAllBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default bookSlice.reducer;

export const { setError } = bookSlice.actions;
