import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: {
      items: [],
    },
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cart.items.find(
        (item) => item.id === newItem.id
      );
      if (existingItem) {
        existingItem.count =
          existingItem.count + newItem.count <= 5
            ? existingItem.count + newItem.count
            : 5;
      } else {
        state.cart.items.push({ ...newItem, count: newItem.count });
      }
    },
    updateItem: (state, action) => {
      const updatedItem = action.payload;
      const updatedItems = state.cart.items.map((item) =>
        item.id === updatedItem.id
          ? {
              ...item,
              count:
                updatedItem.updateType === "add"
                  ? item.count < 5
                    ? item.count + 1
                    : item.count
                  : item.count > 1
                  ? item.count - 1
                  : item.count,
            }
          : item
      );
      state.cart.items = updatedItems;
    },
    deleteItem: (state, action) => {
      const deleteItem = action.payload;
      const updatedItems = state.cart.items.filter(
        (item) => item.id !== deleteItem
      );
      state.cart.items = updatedItems;
    },
    clearCart: (state, action) => {
      state.cart.items.length = 0;
    },
  },
});

export default CartSlice.reducer;
export const { addItem, deleteItem, clearCart, updateItem } = CartSlice.actions;
