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

export type PlaceTemperature = number;
