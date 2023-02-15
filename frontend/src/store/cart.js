import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    itemAdded: (cart, action) => {
      const existingCartItem = cart.find((item) => item.menuItemId === action.payload.menuItemId);
      if (existingCartItem) {
        existingCartItem.quantity += 1;
      } else {
        cart.push({
          menuItemId: action.payload.menuItemId,
          quantity: 1,
        });
      }
    },
  },
});

export const { itemAdded } = slice.actions;
export default slice.reducer;
