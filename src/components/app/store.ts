import { configureStore } from "@reduxjs/toolkit";
import searchHistoryReducer from "../../reducers/search-history";
import searchResultsReducer from "../../reducers/search-results";

export default configureStore({
  reducer: {
    searchHistory: searchHistoryReducer,
    searchResults: searchResultsReducer
  },
});
