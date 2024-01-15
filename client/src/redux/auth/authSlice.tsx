import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { loginUser, logout, signUp } from "./authServices";
import { BookReturnType, addBook, getAllSellerBooks } from "./sellerServices";

//TODO: load user data from local storage
const user: IUser = {
  _id: "",
  name: "",
  email: "",
};

export interface AuthType {
  user: IUser;
  myBooks: IBook[];
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthType = {
  user,
  myBooks: [], // TODO: set type of myBooks to BookType[]
  isLoggedIn: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Can't logout";
    });
    builder.addCase(
      addBook.fulfilled,
      (state, action: PayloadAction<BookReturnType>) => {
        state.myBooks.unshift(action.payload.data);
        state.loading = false;
      }
    );
    builder.addCase(
      getAllSellerBooks.fulfilled,
      (state, action: PayloadAction<IBook[]>) => {
        state.myBooks = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(getAllSellerBooks.rejected, (state, action) => {
      state.error = action.error.message || "Can't get books";
      state.loading = false;
    });
    builder.addMatcher(
      isAnyOf(
        loginUser.pending,
        signUp.pending,
        logout.pending,
        addBook.pending,
        getAllSellerBooks.pending
      ),
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );
    builder.addMatcher(
      isAnyOf(loginUser.fulfilled, signUp.fulfilled),
      (state, action) => {
        const user = action.payload.data;
        state.loading = false;
        state.user = user;
        localStorage.setItem("user", JSON.stringify(user));
        state.isLoggedIn = true;
      }
    );
    builder.addMatcher(
      isAnyOf(loginUser.rejected, signUp.rejected, addBook.rejected),
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export default authSlice.reducer;
export const { setError } = authSlice.actions;
