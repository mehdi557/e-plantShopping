import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      // Check if item already exists in cart
      const existingItemIndex = state.items.findIndex(
        (item) => item.name === action.payload.name
      );
      
      if (existingItemIndex >= 0) {
        // If item exists, increase its quantity
        state.items[existingItemIndex].quantity += 1;
      } else {
        // If item doesn't exist, add it with quantity 1
        state.items.push({
          ...action.payload,
          quantity: 1
        });
      }
    },
    removeItem: (state, action) => {
      // Filter out the item to remove it from cart
      state.items = state.items.filter(item => item.name !== action.payload.name);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemIndex = state.items.findIndex(item => item.name === name);
      
      if (itemIndex >= 0) {
        // Update the quantity of the item
        state.items[itemIndex].quantity = quantity;
        
        // If quantity is 0 or less, remove the item
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.name !== name);
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;


