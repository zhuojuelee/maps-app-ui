import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPlace: {
    lat: 3.138506,
    long: 101.68699
  }
};

const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    setSelectedPlace: (state, action) => ({
      ...state,
      selectedPlace: {
        lat: action.payload.lat,
        long: action.payload.long
      }
    }),
    resetSelectedPlace: (state) => ({
      ...state,
      ...initialState
    })
  }
});

export const { setSelectedPlace, resetSelectedPlace } = placeSlice.actions;
export default placeSlice.reducer;
