import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import FavouritesClient from '../lib/favourites-client'

const initialState = {
  data: [],
  loading: false,
  error: false
};

const FavouriteSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    startLoading: (state) => ({
      ...state,
      loading: true
    }),
    dataFetched: (state, action) => ({
      ...state,
      loading: false,
      data: action.payload
    }),
    dataFetchedWithError: (state) => ({
      ...state,
      loading: false,
      data: [],
      error: true,
    }),
  }
});

export const { startLoading, dataFetched, dataFetchedWithError } = FavouriteSlice.actions;
export const getFavouritesDataSlice = (state) => state.favourites;

export const fetchFavourites = createAsyncThunk(
  'favourites/fetchFavouritesList',
  async (_, thunkApi) => {
    thunkApi.dispatch(startLoading())
    const response = await FavouritesClient.fetchFavouritesList();

    if (response === false) {
      thunkApi.dispatch(dataFetchedWithError());
    }

    thunkApi.dispatch(dataFetched(response));
  }
);

export default FavouriteSlice.reducer;
