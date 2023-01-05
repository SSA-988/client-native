import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1, checked: true });
      }
    },
    removeFromCart: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      state.cart = removeItem;
    },
    incrementQuantity: (state, action) => {
        const item = state.cart.find((item) => item.id === action.payload.id);
        item.quantity++;
      },
      decrementQuantity: (state, action) => {
        const item = state.cart.find((item) => item.id === action.payload.id);
        if (item.quantity === 1) {
          const removeItem = state.cart.filter(
            (item) => item.id !== action.payload.id
          );
          state.cart = removeItem;
        } else {
          item.quantity--;
        }
      },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  cleanCart,
} = cartSlice.actions;

export default cartSlice.reducer;
