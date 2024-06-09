import { useState, useEffect } from "react";
import { Loader } from '@googlemaps/js-api-loader';


const useGoogleMapsApi = () => {
  const [googleMapsPlacesApi, setGoogleMapsPlacesApi] = useState<google.maps.PlacesLibrary>();
  const [googleMapsMapsApi, setGoogleMapsMapsApi] = useState<google.maps.MapsLibrary>();

  useEffect(() => {
    const loadGoogleMapsApi = async () => {
      const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

      if (apiKey === undefined) {
        console.error("API Key not provided");
        return;
      }

      const loader = new Loader({
        apiKey,
        version: 'weekly',
        libraries: ['places', 'maps']
      });

      const googleMapsPlacesResponse = await loader.importLibrary('places');
      const googleMapsMapsResponse = await loader.importLibrary('maps');

      setGoogleMapsPlacesApi(googleMapsPlacesResponse);
      setGoogleMapsMapsApi(googleMapsMapsResponse);
    }

    loadGoogleMapsApi();
  }, []);

  return {
    places: googleMapsPlacesApi,
    maps: googleMapsMapsApi
  }
}

export default useGoogleMapsApi;