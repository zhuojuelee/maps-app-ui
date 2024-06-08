import { TextField } from "@mui/material";
import { GoogleMapsPlacesAPiContext } from '../../modules/google-maps-context'
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { addToSearchHistory } from "../../reducers/search-history";
import { addToSearchResults } from "../../reducers/search-results";


type MapDispatchToProps = {
  addToSearchHistory?: (payload: string) => void;
  addToSearchResults?: (payload: string) => void;
}

const mapDispatchToProps = { addToSearchHistory, addToSearchResults };

const AutoCompleteTextInput: React.FC<MapDispatchToProps> = (props) => {
  const placesLibrary = useContext(GoogleMapsPlacesAPiContext);
  const [inputPlaceHolder, setInputPlaceHolder] = useState<string>("Enter a place");
  const userInputRef = useRef<string>('');
  const autocomplete = useRef<google.maps.places.Autocomplete>();
  const textInputRef = useRef<HTMLInputElement>(null);
  const { addToSearchHistory, addToSearchResults } = props;

  const onPlaceChanged = useCallback(() => {
    // Add to search history redux store
    addToSearchHistory(userInputRef.current);

    // Get place
    const placeResult: google.maps.places.PlaceResult = autocomplete.current.getPlace();

    // Check for place
    if (placeResult === undefined) {
      console.log(`Unable to find place from ${userInputRef}`);
      return; // Unable to search result toast?
    }

    addToSearchResults(placeResult.name); // If found place add to search results
    console.log(placeResult) // Pin on map
  }, []);

  useEffect(() => {
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

  // Probably can be improved to consume a generic children
  return (
    <TextField
      placeholder={inputPlaceHolder}
      inputRef={textInputRef}
      id="outlined-basic"
      variant="outlined"
      onChange={(e) => userInputRef.current = e.target.value}
    />
  )
}

const AutoCompleteTextInputWrapper = React.memo(AutoCompleteTextInput);
const connector = connect<MapDispatchToProps, {}>(null, mapDispatchToProps);
export default connector(AutoCompleteTextInputWrapper);
