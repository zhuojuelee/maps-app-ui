import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { FavouritesClient } from '../lib/favourites-client'

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
    addFavouritePlace: (state, action) => {
      data: state.data.push(action.payload);
    }
  }
});

export const { startLoading, dataFetched, dataFetchedWithError, addFavouritePlace }
  = FavouriteSlice.actions;
export const getFavouritesDataSlice = (state) => state.favourites;

export const fetchFavouritesThunk = createAsyncThunk(
  'favourites/fetchFavouritesList',
  async (_, thunkApi) => {
    thunkApi.dispatch(startLoading())
    console.log('thunk')

    const response = await FavouritesClient.fetchFavouritesList();

    if (response === false) {
      thunkApi.dispatch(dataFetchedWithError());
      return;
    }

    thunkApi.dispatch(dataFetched(response));
  }
);

export default FavouriteSlice.reducer;
