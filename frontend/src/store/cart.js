/* eslint-disable no-param-reassign */
import { createSlice, createSelector } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
import { ORDER_URL } from '../constants';

const slice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    feedback: {},
  },
  reducers: {
    itemAdded: (cart, action) => {
      const existingCartItem = cart.items
        .find((item) => item.menuItemId === action.payload.menuItemId);
      if (existingCartItem) {
        existingCartItem.quantity += 1;
      } else {
        cart.items.push({
          menuItemId: action.payload.menuItemId,
          quantity: 1,
        });
      }
    },
    quantityIncremented: (cart, action) => {
      const cartItem = cart.items.find((item) => item.menuItemId === action.payload.menuItemId);
      cartItem.quantity += 1;
    },
    quantityDecremented: (cart, action) => {
      const cartItem = cart.items.find((item) => item.menuItemId === action.payload.menuItemId);
      if (cartItem.quantity > 1) cartItem.quantity -= 1;
    },
    itemRemoved: (cart, action) => {
      const cartItem = cart.items.find((item) => item.menuItemId === action.payload.menuItemId);
      const index = cart.items.indexOf(cartItem);
      cart.items.splice(index, 1);
    },
    allItemsRemoved: (cart) => {
      cart.items.splice(0);
    },
    cartSaved: (cart, action) => {
      cart.feedback = {
        severity: 'success',
        message: action.payload.message,
      };
      cart.items = [];
    },
    cartSaveFailed: (cart, action) => {
      cart.feedback = {
        severity: 'error',
        message: action.payload.message,
      };
    },
    resetFeedback: (cart) => {
      cart.feedback = {};
    },
  },
});

export const {
  itemAdded, quantityIncremented, quantityDecremented, itemRemoved, allItemsRemoved, resetFeedback,
} = slice.actions;
export default slice.reducer;

// Selectors
export const getCartCount = createSelector(
  (cartItems) => cartItems.map((cartItem) => cartItem.quantity),
  (quantities) => quantities.reduce((a, b) => a + b, 0),
);

// Action Creators
const { cartSaved, cartSaveFailed } = slice.actions;

export const sendOrder = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: ORDER_URL,
      method: 'POST',
      body: JSON.stringify({ cart: getState().cart.items }),
      onSuccess: cartSaved.type,
      onError: cartSaveFailed.type,
    }),
  );
};
