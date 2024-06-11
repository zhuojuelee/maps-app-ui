import { Provider } from 'react-redux';
import './App.css';
import AutocompleteTextInput from '../autocomplete';
import Map from '../map';
import FavouriteButton from '../favourites-button';
import SearchInfoControl from '../search-info-control';
import FavouritePlacesDrawer from '../favourites-drawer';
import { GoogleMapsApiContext } from '../../modules/google-maps-context';
import useGoogleMapsPlacesApi from '../../hooks/useGoogleMapsApi';
import store from './store';
import { Stack } from '@mui/material';

function App() {
  const googleMapsApi = useGoogleMapsPlacesApi();

  return (
    <>
      <Provider store={store}>
        <GoogleMapsApiContext.Provider value={googleMapsApi}>
          <h1 className='titleColors'>Maps App</h1>
          <h3 className='titleColors'>Begin by enterring a place!</h3>
          <Stack alignItems='center' justifyContent='center' direction='row' gap={1} padding={1} >
            <AutocompleteTextInput />
            <FavouriteButton />
          </Stack>
          <Map />
          <SearchInfoControl />
          <FavouritePlacesDrawer />
        </GoogleMapsApiContext.Provider>
      </Provider>
    </>
  )
}

export default App
