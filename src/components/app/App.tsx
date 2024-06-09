import { Provider } from 'react-redux';
import './App.css';
import AutocompleteTextInput from '../autocomplete';
import Map from '../map';
import SearchHistoryDrawer from '../search-history-drawer';
import { GoogleMapsApiContext } from '../../modules/google-maps-context';
import useGoogleMapsPlacesApi from '../../hooks/useGoogleMapsApi';
import store from './store';

function App() {
  const googleMapsPlacesLibrary = useGoogleMapsPlacesApi();

  return (
    <>
      <Provider store={store}>
        <GoogleMapsApiContext.Provider value={googleMapsPlacesLibrary}>
          <h1 className='titleColors'>Maps App</h1>
          <h3 className='titleColors'>Begin by enterring a place!</h3>
          <AutocompleteTextInput />
          <Map />
          <SearchHistoryDrawer />
        </GoogleMapsApiContext.Provider>
      </Provider>
    </>
  )
}

export default App
