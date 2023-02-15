/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { apiCallBegan } from './api';
import { MENU_URL } from '../constants';

const slice = createSlice({
  name: 'menu',
  initialState: {
    menuItems: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    menuRequested: (state) => {
      state.loading = true;
    },
    menuRecieved: (state, action) => {
      state.menuItems = action.payload.menuItems;
      state.loading = false;
      state.lastFetch = Date.now();
    },
    menuRequestFailed: (state) => {
      state.loading = false;
    },
  },
});

export default slice.reducer;

// Action Creators
const { menuRecieved, menuRequested, menuRequestFailed } = slice.actions;

export const loadMenu = () => (dispatch, getState) => {
  const { lastFetch } = getState();
  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
  if (diffInMinutes < 100) return;

  dispatch(
    apiCallBegan({
      url: MENU_URL,
      method: 'GET',
      onStart: menuRequested.type,
      onSuccess: menuRecieved.type,
      onError: menuRequestFailed.type,
    }),
  );
};
