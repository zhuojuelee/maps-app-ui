import { useState, useEffect } from "react";
import { Loader } from '@googlemaps/js-api-loader';


const useGoogleMapsPlacesApi = () => {
  const [googleMapsPlacesApi, setGoogleMapsPlacesApi] = useState<google.maps.PlacesLibrary>();

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
        libraries: ['places']
      });

      const googleMapsResponse = await loader.importLibrary('places');
      setGoogleMapsPlacesApi(googleMapsResponse);
    }

    loadGoogleMapsApi();
  }, []);

  return googleMapsPlacesApi;
}

export default useGoogleMapsPlacesApi;