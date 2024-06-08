import { createSlice } from "@reduxjs/toolkit";

type SearchResults = string[];

const initialState = [] satisfies SearchResults as SearchResults;

const searchResultsSlice = createSlice({
  name: 'searchResults',
  initialState,
  reducers: {
    addToSearchResults: (state, action) => {
      state.push(action.payload);
      console.log(state.toString())
    },
    resetSearchResults: (state) => state.splice(0, state.length)
  },
})

export const { addToSearchResults, resetSearchResults } = searchResultsSlice.actions;
export default searchResultsSlice.reducer;
