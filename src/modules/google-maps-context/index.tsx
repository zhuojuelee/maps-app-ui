import { createContext } from "react";

export type GoogleMapsPlacesApiValue = {
  places: google.maps.PlacesLibrary;
  maps: google.maps.MapsLibrary;
}

export const GoogleMapsApiContext =
  createContext<GoogleMapsPlacesApiValue | undefined>(undefined);
