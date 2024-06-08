import { createContext } from "react";

export type GoogleMapsPlacesApiValue = {
  places: google.maps.PlacesLibrary
}

export const GoogleMapsPlacesAPiContext =
  createContext<google.maps.PlacesLibrary | undefined>(undefined);
