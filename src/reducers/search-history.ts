import { createSlice } from "@reduxjs/toolkit";

type SearchHistoryType = string[];

const initialState = [] satisfies SearchHistoryType as SearchHistoryType;

const searchHistorySlice = createSlice({
  name: 'searchHistory',
  initialState,
  reducers: {
    addToSearchHistory: (state, action) => {
      state.push(action.payload);

    },
    resetSearchHistory: (state) => state.splice(0, state.length)
  },
})

export const { addToSearchHistory, resetSearchHistory } = searchHistorySlice.actions;
export default searchHistorySlice.reducer;
