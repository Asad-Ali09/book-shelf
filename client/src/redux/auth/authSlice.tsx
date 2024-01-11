import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { loginUser, signUp } from "./authServices";

//TODO: load user data from local storage
const user: IUser = {
  _id: "",
  name: "",
  email: "",
};

export interface AuthType {
  user: IUser;
  myBooks: any[];
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
    builder.addMatcher(isAnyOf(loginUser.pending, signUp.pending), (state) => {
      state.loading = true;
      state.error = null;
    });
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
      isAnyOf(loginUser.rejected, signUp.rejected),
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export default authSlice.reducer;
export const { setError } = authSlice.actions;
