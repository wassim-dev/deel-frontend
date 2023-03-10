import { useState } from 'react';
import './App.css';
import Autocomplete from './components/Autocomplete/Autocomplete';
import {
  fetchCurrenciesData,
  fetchLocationData,
} from './components/Autocomplete/helpers';

function App() {
  const [region, setRegion] = useState('');
  const [lang, setLang] = useState('');
  return (
    <div className="container">
      <h1>Deel frontend test</h1>
      <p>
        This is a TypeScript-based Autocomplete component for React that takes
        in various props such as value, className, placeholder, and onChange. It
        works by filtering options based on user input and displaying them in a
        dropdown list. Users can navigate through the options using the arrow
        keys, select an option by pressing Enter, or dismiss the list by
        pressing Escape or clicking outside of the component. The Autocomplete
        component also includes a loading indicator that displays while the
        options are being fetched.
      </p>
      <h2>Example :</h2>

      <label>Region:</label>
      <Autocomplete
        className="my-autocomplete"
        placeholder="Please enter a region"
        value={region}
        onChange={setRegion}
        loadData={fetchLocationData}
      />

      <label>Currency:</label>
      <Autocomplete
        className="my-autocomplete"
        placeholder="Please enter a currency"
        value={lang}
        onChange={setLang}
        loadData={fetchCurrenciesData}
      />
    </div>
  );
}

export default App;
