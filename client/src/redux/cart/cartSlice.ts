import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { placeOrder } from "./cartServices";

export interface cartType {
  cartItems: {
    book: RIBook;
    quantity: number;
  }[];
  shippingDetails: shippingDetailsType;
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  loading: boolean;
  orderID?: string;
  error?: string | null;
}

const initialShippingDetails: shippingDetailsType = {
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: 0,
  country: "",
};

const initialState: cartType = {
  cartItems: [],
  shippingDetails: initialShippingDetails,
  itemsPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<RIBook>) => {
      const newItem = action.payload;

      let isNew = true;
      // increment quantity if item already exists
      state.cartItems.forEach((item) => {
        if (item.book._id === newItem._id) {
          item.quantity++;
          isNew = false;
        }
      });
      // Push in array is new item
      if (isNew) {
        state.cartItems.push({ book: newItem, quantity: 1 });
      }
      cartSlice.caseReducers.calcTotalPrice(state);
    },
    removeItem: (state, action: PayloadAction<RIBook>) => {
      const itemToRemove = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.book._id !== itemToRemove._id
      );
      cartSlice.caseReducers.calcTotalPrice(state);
    },
    increaseQuantity: (state, action: PayloadAction<RIBook>) => {
      const itemToIncrease = action.payload;
      state.cartItems.forEach((item) => {
        if (item.book._id === itemToIncrease._id) {
          item.quantity++;
        }
      });
      cartSlice.caseReducers.calcTotalPrice(state);
    },
    decreaseQuantity: (state, action: PayloadAction<RIBook>) => {
      const itemToDecrease = action.payload;
      const index = state.cartItems.findIndex(
        (item) => item.book._id === itemToDecrease._id
      );
      if (state.cartItems[index].quantity > 1) {
        state.cartItems[index].quantity--;
        cartSlice.caseReducers.calcTotalPrice(state);
        return;
      }
      cartSlice.caseReducers.removeItem(state, action);
    },
    calcTotalPrice: (state) => {
      let total = 0;
      const authors: string[] = [];
      state.cartItems.forEach((item) => {
        if (!authors.includes(item.book.seller._id)) {
          authors.push(item.book.seller._id);
        }
        total += item.book.price * item.quantity;
      });
      state.itemsPrice = total;
      state.shippingPrice = authors.length * 5;
      state.totalPrice = state.itemsPrice + state.shippingPrice;
    },
    setShippingDetails: (state, action: PayloadAction<shippingDetailsType>) => {
      state.shippingDetails = action.payload;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.itemsPrice = 0;
      state.shippingPrice = 0;
      state.totalPrice = 0;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(placeOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      state.orderID = action.payload.data;
      cartSlice.caseReducers.clearCart(state);
      state.loading = false;
    });
    builder.addCase(placeOrder.rejected, (state, action) => {
      state.error = action.error.message || "Something went wrong";
      state.loading = false;
    });
  },
});

export default cartSlice.reducer;
export const {
  addItemToCart,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  calcTotalPrice,
  setShippingDetails,
  setError,
} = cartSlice.actions;
