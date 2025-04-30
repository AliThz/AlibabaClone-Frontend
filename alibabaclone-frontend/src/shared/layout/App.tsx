import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../stores/store'
import NavBar from './NavBar'
import TransportationSearchBar from '@/features/transportations/TransportationSearchBar'
import agent from '../api/agent'
import { useEffect, useState } from 'react'
import { City } from '../models/city/city'
import { RootProvider } from 'react-day-picker'

function App() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   setLoading(true);
  //   agent.cities.list()
  //     .then(response => {
  //       console.log('API Response:', response);

  //       // Explicitly type and handle the response
  //       let citiesArray: City[];
  //       if (response && typeof response === 'object') {
  //         if ('data' in response) {
  //           // If response has a data property
  //           citiesArray = response.data as City[];
  //         } else {
  //           // If cities are in the first property of the object
  //           const firstValue = Object.values(response)[0];
  //           citiesArray = Array.isArray(firstValue) ? firstValue as City[] : [];
  //         }
  //       } else {
  //         citiesArray = [];
  //       }

  //       setCities(citiesArray);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       setError(error.message);
  //       setLoading(false);
  //     });
  // }, []);

  // // Debug log
  // console.log('Current cities state:', cities);

  // if (loading) return <div>Loading cities...</div>;
  // if (error) return <div>Error: {error}</div>;
  // if (!Array.isArray(cities)) return <div>Invalid data format</div>;
  // if (cities.length === 0) return <div>No cities found</div>;

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <TransportationSearchBar />
      </BrowserRouter>
    </>
  );
}

export default App
