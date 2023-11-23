import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';


export interface Memo {
  value: {
    id:string;
    title:string;
    contents:string;
    tags:string[];
    pin:boolean;
    backgroundColor:string;
    priority:string;
  };
}
export interface MemoState{
  value:Memo[];
}

const initialState: MemoState = {
  value: []
};
function fetchMemo(memo:Memo) {
  return new Promise<{ data: Memo }>((resolve) =>
    setTimeout(() => resolve({ data: memo }), 500)
  );
}

export const addAsync = createAsyncThunk(
  'memo/fetchMemo',
  async (memo: Memo) => {
    const response = await fetchMemo(memo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const memoSlice = createSlice({
  name: 'memo',
  initialState,
  reducers: {
    addMemo: (state, action : PayloadAction<Memo>) => {
      console.log(action.payload)
      state.value = [...state.value,action.payload];
      console.log(state.value)
    },
    changePin: (state,action:PayloadAction<string>) =>{
      for (let i=0; i<state.value.length; i++){
        if(state.value[i].value.id == action.payload){
            if(state.value[i].value.pin==true)
            state.value[i].value.pin = false;
            else
            state.value[i].value.pin=true;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAsync.pending, (state) => {
        console.log('pending')
      })
      .addCase(addAsync.fulfilled, (state, action) => {
        console.log('idle');
        state.value = [...state.value,action.payload];
      })
      .addCase(addAsync.rejected, (state) => {
        console.log('failed');
      });
  },
});

export const { addMemo,changePin} = memoSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectMemo = (state: RootState) => state.memo.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.


export default memoSlice.reducer;
