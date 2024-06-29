import { createSlice, createSelector } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
    },
    clearCart(state) {
      state.items = [];
    },
    changeQuantity(state, action) {
      const { itemId, quantity } = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

// Селекторы для получения данных из состояния корзины

export const selectCartItems = (state) => state.cart.items;

export const selectTotalPrice = createSelector(
  [selectCartItems],
  (items) =>
    items.reduce(
      (total, item) => total + Number(item.quantity) * Number(item.price),
      0
    )
);

// Экспорт экшенов и редуктора
export const { addToCart, removeFromCart, clearCart, changeQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
