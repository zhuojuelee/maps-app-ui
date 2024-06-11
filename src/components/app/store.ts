import { configureStore } from "@reduxjs/toolkit";
import searchHistoryReducer from "../../reducers/search-history";
import searchResultsReducer from "../../reducers/search-results";
import placeReducer from '../../reducers/place';
import favouritesReducer from "../../reducers/favourites";

export default configureStore({
  reducer: {
    searchHistory: searchHistoryReducer,
    searchResults: searchResultsReducer,
    selectedPlace: placeReducer,
    favourites: favouritesReducer,
  },
});
