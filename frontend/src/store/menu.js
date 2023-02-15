/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
import { MENU_URL } from '../constants';

const slice = createSlice({
  name: 'menu',
  initialState: {
    menuItems: [],
  },
  reducers: {
    menuRecieved: (state, action) => {
      state.menuItems = action.payload.menuItems;
    },
  },
});

export default slice.reducer;

// Action Creators
export const loadMenu = () => apiCallBegan({
  url: MENU_URL,
  method: 'GET',
  onSuccess: slice.actions.menuRecieved.type,
});
