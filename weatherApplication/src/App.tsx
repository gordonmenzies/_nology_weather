import { useEffect, useState } from "react";
import WeatherWidgit from "./Components/WeatherWidgit/WeatherWidgit";
import News from "./Components/News/News";
import "./App.css";
import ForecastResponse from "./types/ForecastResponse";
import NewsResponse from "./types/NewsResponse";
import LocationObject from "./types/LocationObject";

const App = () => {
  const defaultLocation = {
    latitude: 51.5072,
    longitude: 0.1276,
  };

  const [locationData, setLocationData] = useState<LocationObject>(defaultLocation);

  let displayLocation: LocationObject = defaultLocation;

  const accessLocation = () => {
    const success = (position: GeolocationPosition) => {
      const newPosition: LocationObject = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      console.log("new position", newPosition);
      setLocationData(newPosition);
    };

    const error = (error: GeolocationPositionError) => {
      console.warn(`ERROR(${error.code}): ${error.message}`);
    };
    navigator.geolocation.getCurrentPosition(success, error);
  };

  const submitInput = (input: string) => {
    return input;
  };

  useEffect(() => {
    accessLocation();
  }, []);

  // useEffect(() => {
  //   console.log("display location", displayLocation);
  // }, [locationData]);

  return (
    <div>
      {locationData ? <WeatherWidgit locationData={locationData} /> : <p> no weather data available</p>}
      <News />
    </div>
  );
};

export default App;
