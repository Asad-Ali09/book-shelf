import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface cartType {
  cartItems: {
    book: RIBook;
    quantity: number;
  }[];
  shippingAddress: any;
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

const initialState: cartType = {
  cartItems: [],
  shippingAddress: {},
  itemsPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
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
      let authors: string[] = [];
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
  },
});

export default cartSlice.reducer;
export const {
  addItemToCart,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  calcTotalPrice,
} = cartSlice.actions;
