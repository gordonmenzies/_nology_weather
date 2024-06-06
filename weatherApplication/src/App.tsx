import { useEffect, useState } from "react";
import WeatherWidgit from "./Components/WeatherWidgit/WeatherWidgit";
import "./App.css";
import ForecastResponse from "./types/ForecastResponse";

type LocationObject = {
  latitude: number;
  longitude: number;
};

const App = () => {
  const [weatherData, setWeatherData] = useState<ForecastResponse>();

  let displayedData: Object;

  const accessLocation = (): Promise<LocationObject> => {
    return new Promise((resolve, reject) => {
      const success = (position: GeolocationPosition) => {
        const newPosition: LocationObject = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        resolve(newPosition);
      };

      const error = (error: GeolocationPositionError) => {
        console.warn(`ERROR(${error.code}): ${error.message}`);
        reject(error);
      };

      navigator.geolocation.getCurrentPosition(success, error);
    });
  };

  const accessForecast = async (locationData: LocationObject): Promise<Object> => {
    let url = "http://api.weatherapi.com/v1/forecast.json?";
    let apiKey = `key=${import.meta.env.VITE_API_KEY}`;
    let q = `&q=${locationData.latitude},${locationData.longitude}`;
    let days = "&days=5";

    const response = await fetch(url + apiKey + q + days);
    const responseData = await response.json();
    setWeatherData(responseData);
    return responseData;
  };

  const getData = async (): Promise<Object | null> => {
    let responseDataForecast;
    try {
      const location = await accessLocation();
      responseDataForecast = await accessForecast(location);
    } catch (error) {
      console.error("Failed to obtain location", error);
      return null;
    }
    return responseDataForecast;
  };

  useEffect(() => {
    getData();
    console.log("reached");
  }, []);

  useEffect(() => {
    if (weatherData != null) {
      displayedData = weatherData;
      console.log(displayedData);
    } else {
      console.error("no weather data to display");
    }
  }, [weatherData]);

  return <>{weatherData != null ? <WeatherWidgit weatherData={weatherData} /> : <p> no weather data available</p>}</>;
};

export default App;
