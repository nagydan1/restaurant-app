/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
import { ORDER_URL } from '../constants';

const slice = createSlice({
  name: 'order',
  initialState: {
    orderItems: [],
    loading: false,
    lastFetch: null,
    feedback: {},
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
    orderRequestFailed: (order, action) => {
      order.loading = false;
      order.feedback = {
        severity: 'error',
        message: action.payload.message,
      };
    },
    orderDeleted: (order, action) => {
      order.orderItems = order.orderItems.filter(
        (orderItem) => orderItem._id !== action.payload._id,
      );
      order.loading = false;
      order.feedback = {
        severity: 'success',
        message: action.payload.message,
      };
    },
    resetFeedback: (order) => {
      order.feedback = {};
    },
  },
});

export const { resetFeedback } = slice.actions;
export default slice.reducer;

// Action Creators
const {
  orderRecieved, orderRequested, orderRequestFailed, orderDeleted,
} = slice.actions;

export const loadOrder = () => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: ORDER_URL,
      method: 'GET',
      onStart: orderRequested.type,
      onSuccess: orderRecieved.type,
      onError: orderRequestFailed.type,
    }),
  );
};

export const deleteOrder = (orderItemId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: ORDER_URL + orderItemId,
      method: 'DELETE',
      onStart: orderRequested.type,
      onSuccess: orderDeleted.type,
      onError: orderRequestFailed.type,
    }),
  );
};
