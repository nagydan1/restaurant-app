/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
import { ORDER_URL } from '../constants';

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
    quantityIncremented: (cart, action) => {
      const cartItem = cart.find((item) => item.menuItemId === action.payload.menuItemId);
      cartItem.quantity += 1;
    },
    quantityDecremented: (cart, action) => {
      const cartItem = cart.find((item) => item.menuItemId === action.payload.menuItemId);
      if (cartItem.quantity > 1) cartItem.quantity -= 1;
    },
    itemRemoved: (cart, action) => {
      const cartItem = cart.find((item) => item.menuItemId === action.payload.menuItemId);
      const index = cart.indexOf(cartItem);
      cart.splice(index, 1);
    },
    allItemsRemoved: (cart) => {
      cart.splice(0);
    },
  },
});

export const {
  itemAdded, quantityIncremented, quantityDecremented, itemRemoved, allItemsRemoved,
} = slice.actions;
export default slice.reducer;

// Action Creators
export const sendOrder = () => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: ORDER_URL,
      method: 'POST',
      body: JSON.stringify({ cart: getState().cart }),
    }),
  );
};
