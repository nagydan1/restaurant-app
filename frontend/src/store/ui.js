/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'ui',
  initialState: {
    drawerOpen: false,
  },
  reducers: {
    drawerToggle: (ui, action) => {
      if (action.payload.drawerOpen === true) ui.drawerOpen = true;
      else ui.drawerOpen = false;
    },
  },
});

export const { drawerToggle } = slice.actions;
export default slice.reducer;
