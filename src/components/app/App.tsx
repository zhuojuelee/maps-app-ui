import { Provider } from 'react-redux';
import './App.css';
import AutocompleteTextInput from '../autocomplete';
import { GoogleMapsPlacesAPiContext } from '../../modules/google-maps-context';
import useGoogleMapsPlacesApi from '../../hooks/useGoogleMapsPlacesApi';
import store from './store';

function App() {
  const googleMapsPlacesLibrary = useGoogleMapsPlacesApi();

  return (
    <>
      <Provider store={store}>
        <GoogleMapsPlacesAPiContext.Provider value={googleMapsPlacesLibrary}>
          <h1 className='titleColors'>Maps App</h1>
          <h3 className='titleColors'>Begin by enterring a place!</h3>
          <AutocompleteTextInput />
        </GoogleMapsPlacesAPiContext.Provider>
      </Provider>
    </>
  )
}

export default App
