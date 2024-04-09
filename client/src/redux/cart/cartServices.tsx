import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

const orderURL = `${import.meta.env.VITE_SERVER_URL}/api/v1/orders`;

type OrderReturnType = {
  data: string; // trackingID
  message: string;
};

const placeOrder = createAsyncThunk<
  OrderReturnType,
  void,
  { state: RootState }
>("cart/placeOrder", async (_, thunkAPI) => {
  const state = thunkAPI.getState().cart;
  console.log(state);

  const books: { book: string; quantity: number }[] = [];
  state.cartItems.forEach((item) => {
    const obj = {
      book: item.book._id,
      quantity: item.quantity,
    };
    books.push(obj);
  });
  const shippingAddress =
    state.shippingDetails.address1 +
    " " +
    state.shippingDetails.city +
    " " +
    state.shippingDetails.country;
  const buyerName =
    state.shippingDetails.firstName + " " + state.shippingDetails.lastName;
  const shippingPrice = state.shippingPrice;

  const body = {
    books,
    shippingAddress,
    buyerName,
    shippingPrice,
  };

  console.log("before", body);

  try {
    const response = await axios.post<OrderReturnType>(orderURL, body);
    console.log("after", response.data);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export { placeOrder };
