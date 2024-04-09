import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import bookReducer from "./books/bookSlice";
import cartReducer from "./cart/cartSlice";
import orderReducer from "./orders/orderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
    cart: cartReducer,
    orders: orderReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
