import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getAllOrders } from "./orderServices";

type orderState = {
  loading: boolean;
  error: string | null;
  orders: IOrder[];
};

const initialState: orderState = {
  loading: false,
  error: null,
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.orders = action.payload.data;
      state.loading = false;
    });
    builder.addCase(getAllOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default orderSlice.reducer;
export const { setError } = orderSlice.actions;
