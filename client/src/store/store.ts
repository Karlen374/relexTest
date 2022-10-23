import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authorization from 'src/store/slices/authorizationSlice';
import test from 'src/store/slices/testSlice';

export const store = configureStore({
  reducer: {
    authorization,
    test,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
