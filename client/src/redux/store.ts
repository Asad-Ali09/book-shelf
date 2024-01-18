import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import bookReducer from "./books/bookSlice";
import cartReducer from "./cart/cartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
