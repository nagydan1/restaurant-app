/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
import { MENU_URL } from '../constants';

const slice = createSlice({
  name: 'menu',
  initialState: {
    menuItems: [],
    loading: false,
  },
  reducers: {
    menuRequested: (state) => {
      state.loading = true;
    },
    menuRecieved: (state, action) => {
      state.menuItems = action.payload.menuItems;
      state.loading = false;
    },
    menuRequestFailed: (state) => {
      state.loading = false;
    },
  },
});

export default slice.reducer;

// Action Creators
const { menuRecieved, menuRequested, menuRequestFailed } = slice.actions;

export const loadMenu = () => apiCallBegan({
  url: MENU_URL,
  method: 'GET',
  onStart: menuRequested.type,
  onSuccess: menuRecieved.type,
  onError: menuRequestFailed.type,
});
