import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import navReducer from '../features/nav/navSlice'
import selectedTagReducer from '../features/nav/selectedTagSlice'
import memoReducer from '../features/memo/memoSlice';
export const store = configureStore({
  reducer: {
    nav: navReducer,
    selectedTag:selectedTagReducer,
    memo:memoReducer,
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
