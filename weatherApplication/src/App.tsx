import { useEffect, useState } from "react";
import WeatherWidgit from "./Components/WeatherWidgit/WeatherWidgit";
import News from "./Components/News/NewsWidgit";
import "./App.css";
import LocationObject from "./types/LocationObject";

const App = () => {
  const defaultLocation = {
    latitude: 51.5072,
    longitude: 0.1276,
  };

  const [locationData, setLocationData] = useState<LocationObject>(defaultLocation);

  const accessLocation = () => {
    const success = (position: GeolocationPosition) => {
      const newPosition: LocationObject = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setLocationData(newPosition);
    };

    const error = (error: GeolocationPositionError) => {
      console.warn(`ERROR(${error.code}): ${error.message}`);
    };
    navigator.geolocation.getCurrentPosition(success, error);
  };

  useEffect(() => {
    accessLocation();
  }, []);

  return <div>{locationData ? <WeatherWidgit locationData={locationData} /> : <p> no weather data available</p>}</div>;
};

export default App;
