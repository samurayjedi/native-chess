import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  menuOpen: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.menuOpen = !state.menuOpen;
    },
  },
});

export const { toggleDrawer } = appSlice.actions;
export default appSlice.reducer;
