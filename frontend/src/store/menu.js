/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import { createSlice, createSelector } from '@reduxjs/toolkit';
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
    menuRequested: (menu) => {
      menu.loading = true;
    },
    menuRecieved: (menu, action) => {
      menu.menuItems = action.payload.menuItems;
      menu.loading = false;
      menu.lastFetch = Date.now();
    },
    menuRequestFailed: (menu) => {
      menu.loading = false;
    },
  },
});

export default slice.reducer;

// Selectors
export const getMenuItemById = (menuItemId) => createSelector(
  (menu) => menu.menuItems,
  (menuItems) => menuItems.filter((menuItem) => menuItem._id === menuItemId),
);

// Action Creators
const { menuRecieved, menuRequested, menuRequestFailed } = slice.actions;

export const loadMenu = () => (dispatch, getState) => {
  const { lastFetch } = getState().menu;
  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
  if (diffInMinutes < 100) return;

  return dispatch(
    apiCallBegan({
      url: MENU_URL,
      method: 'GET',
      onStart: menuRequested.type,
      onSuccess: menuRecieved.type,
      onError: menuRequestFailed.type,
    }),
  );
};
