import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const orderURL = `${import.meta.env.VITE_SERVER_URL}/api/v1/orders`;

const getAllOrders = createAsyncThunk("orders/getAllOrders", async () => {
  const response = await axios.get<{ data: IOrder[] }>(orderURL);
  return response.data;
});

export { getAllOrders };
