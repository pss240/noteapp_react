import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchCount } from './navAPI';

export interface NavState {
  value: string[];
}

const initialState: NavState = {
  value: ['Notes','Coding','Exercise','Quotes'],
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    add: (state, action : PayloadAction<string>) => {
      state.value = [...state.value,action.payload];
    },
    del: (state,action:PayloadAction<string>) => {
      state.value = state.value.filter((tag)=>tag!=action.payload);
    },
  },
});

export const { add, del } = navSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectNav = (state: RootState) => state.nav.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.


export default navSlice.reducer;
