import { TextField } from "@mui/material";
import { GoogleMapsPlacesAPiContext } from '../../modules/google-maps-context'
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";


const AutoCompleteTextInput: React.FC = (props) => {
  const placesLibrary = useContext(GoogleMapsPlacesAPiContext);
  const [inputPlaceHolder, setInputPlaceHolder] = useState<string>("Enter a place");
  const autocomplete = useRef<google.maps.places.Autocomplete>();
  const textInputRef = useRef<HTMLInputElement>(null);

  const onPlaceChanged = useCallback(() => {
    const placeResult: google.maps.places.PlaceResult = autocomplete.current.getPlace();
    console.log(placeResult);
  }, []);

  useEffect(() => {
    console.log(placesLibrary)
    if (placesLibrary === undefined) {
      setInputPlaceHolder('Autocomplete service is offline')
      return;
    }

    setInputPlaceHolder("Enter a place")
    autocomplete.current = new placesLibrary.Autocomplete(textInputRef.current, {
      fields: ['place_id', 'name', 'geometry']
    });
    autocomplete.current.addListener('place_changed', onPlaceChanged);

    return () => {
      autocomplete.current = null;
    }
  }, [placesLibrary]);

  return (
    <TextField
      placeholder={inputPlaceHolder}
      inputRef={textInputRef}
      id="outlined-basic"
      variant="outlined"
    />
  )
}

export default React.memo(AutoCompleteTextInput);
