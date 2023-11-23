import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface SelectedTagState {
  value: string;
}

const initialState: SelectedTagState = {
  value: 'Notes',
};

export const selectedTagSlice = createSlice({
  name: 'selectedTag',
  initialState,
  reducers: {
    change: (state, action : PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { change } = selectedTagSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectselectedTag = (state: RootState) => state.selectedTag.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.


export default selectedTagSlice.reducer;
