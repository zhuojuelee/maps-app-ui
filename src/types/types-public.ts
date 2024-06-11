export type SearchHistory = string[];
export type SearchResults = string[];

export type DrawerListData = SearchHistory | SearchResults;

// Server types
export type FavouritePlaceItem = {
  placeId: string;
  name: string;
  lat: number;
  lng: number;
};

export type FavouritesPlaceList = FavouritePlaceItem[];
export type SelectedPlace = {
  placeId: string;
  name: string;
  lat: number;
  long: number;
}
export type PlaceTemperature = number;

export type StateLatLng = {
  lat: number;
  long: number;
};
