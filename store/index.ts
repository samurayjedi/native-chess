import { configureStore } from '@reduxjs/toolkit';
import chess from './chess';

const store = configureStore({
  reducer: {
    chess,
  },
  devTools: true,
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ThunkGetters = { state: RootState };
