/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
import { ORDER_URL } from '../constants';

const slice = createSlice({
  name: 'order',
  initialState: {
    orderItems: [],
    loading: false,
  },
  reducers: {
    orderRequested: (order) => {
      order.loading = true;
    },
    orderRecieved: (order, action) => {
      order.orderItems = action.payload.orders;
      order.loading = false;
      order.lastFetch = Date.now();
    },
    orderRequestFailed: (order) => {
      order.loading = false;
    },
  },
});

export default slice.reducer;

// Action Creators
const { orderRecieved, orderRequested, orderRequestFailed } = slice.actions;

export const loadOrder = () => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: ORDER_URL,
      method: 'GET',
      onStart: orderRequested.type,
      onSuccess: orderRecieved.type,
      onError: orderRequestFailed.type,
    }),
  );
};
