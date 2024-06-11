import { TextField } from "@mui/material";
import { GoogleMapsApiContext } from '../../modules/google-maps-context'
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { addToSearchHistory } from "../../reducers/search-history";
import { addToSearchResults } from "../../reducers/search-results";
import { setSelectedPlace, resetSelectedPlace } from "../../reducers/place";

type ComponentProps = any;

type MapDispatchToProps = {
  addToSearchHistory: (payload: string) => void;
  addToSearchResults: (payload: string) => void;
  setSelectedPlace: (payload: { lat: number; long: number }) => void;
  resetSelectedPlace: () => void;
};

type AutoCompleteTextInputProps = MapDispatchToProps & ComponentProps;

const mapDispatchToProps = {
  addToSearchHistory,
  addToSearchResults,
  setSelectedPlace,
  resetSelectedPlace
};

const AutoCompleteTextInput: React.FC<AutoCompleteTextInputProps> = (props) => {
  const { places } = useContext(GoogleMapsApiContext);
  const [isMapsApiAvail, setIsMapsApiAvail] = useState<boolean>(false);
  const [inputPlaceHolder, setInputPlaceHolder] = useState<string>("Enter a place");
  const userInputRef = useRef<string>('');
  const autocomplete = useRef<google.maps.places.Autocomplete>();
  const textInputRef = useRef<HTMLInputElement>(null);
  const { addToSearchHistory, addToSearchResults, setSelectedPlace, resetSelectedPlace } = props;

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

    const { place_id, name } = placeResult;
    const { lat, lng } = placeResult.geometry.location.toJSON();
    setSelectedPlace({ lat, long: lng, placeId: place_id, name: name });
    addToSearchResults(placeResult.name); // If found place add to search results
    console.log(placeResult) // Pin on map
  }, []);

  // Reset selectedPlace onMount
  useEffect(() => {
    resetSelectedPlace();
  }, []);

  useEffect(() => {
    if (places === undefined) {
      setIsMapsApiAvail(false);
      setInputPlaceHolder('Autocomplete service is offline')
      return;
    }

    setInputPlaceHolder("Enter a place")
    autocomplete.current = new places.Autocomplete(textInputRef.current, {
      fields: ['place_id', 'name', 'geometry']
    });
    autocomplete.current.addListener('place_changed', onPlaceChanged);
    setIsMapsApiAvail(true);

    return () => {
      autocomplete.current = null;
    }
  }, [places]);

  // Probably can be improved to consume a generic children
  return (
    <TextField
      disabled={!isMapsApiAvail}
      label={isMapsApiAvail ? 'Search Place' : 'Maps is offline'}
      placeholder={inputPlaceHolder}
      inputRef={textInputRef}
      id='outlined-basic'
      variant='outlined'
      onChange={(e) => userInputRef.current = e.target.value}
      style={{ width: 500 }}
    />
  )
}

const AutoCompleteTextInputWrapper = React.memo(AutoCompleteTextInput);
const connector = connect<MapDispatchToProps, {}>(null, mapDispatchToProps);
export default connector(AutoCompleteTextInputWrapper);
