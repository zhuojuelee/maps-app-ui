import { useCallback, useState } from 'react';
import './App.css';
import AutocompleteTextInput from '../components/autocomplete';
import { GoogleMapsPlacesAPiContext } from '../modules/google-maps-context';
import useGoogleMapsPlacesApi from '../hooks/useGoogleMapsPlacesApi';

function App() {
  const [count, setCount] = useState(0)
  const googleMapsPlacesLibrary = useGoogleMapsPlacesApi();

  return (
    <>
      <GoogleMapsPlacesAPiContext.Provider value={googleMapsPlacesLibrary}>
        <AutocompleteTextInput />
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </GoogleMapsPlacesAPiContext.Provider>

    </>
  )
}

export default App
