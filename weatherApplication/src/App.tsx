import { useEffect, useState } from "react";
import WeatherWidgit from "./Components/WeatherWidgit/WeatherWidgit";
import News from "./Components/News/News";
import "./App.css";
import ForecastResponse from "./types/ForecastResponse";
import NewsResponse from "./types/NewsResponse";

type LocationObject = {
  latitude: number;
  longitude: number;
};

const App = () => {
  const [weatherData, setWeatherData] = useState<ForecastResponse>();
  const [newsData, setNewsData] = useState<NewsResponse | undefined>();

  let displayedData: Object;
  let otherDisplayedData: Object;

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

  const submitInput = () => {
    console.log("string");
  };

  const accessNews = async (): Promise<Object> => {
    let url = "https://newsapi.org/v2/everything?q=bitcoin&";
    let key = `apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;

    const response = await fetch(url + key);
    const responseData = await response.json();
    setNewsData(responseData);
    console.log(responseData);
    return responseData;
  };

  const accessForecast = async (locationData: LocationObject): Promise<Object> => {
    let url = "http://api.weatherapi.com/v1/forecast.json?";
    let apiKey = `key=${import.meta.env.VITE_Weather_API_KEY}`;
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
    accessNews();
  }, []);

  useEffect(() => {
    if (weatherData != null) {
      displayedData = weatherData;
    }
  }, [weatherData]);

  useEffect(() => {
    if (newsData != null) {
      otherDisplayedData = newsData;
    }
  }, [newsData]);

  return (
    <div>
      {weatherData != null ? <WeatherWidgit weatherData={weatherData} /> : <p> no weather data available</p>}
      <News submitInput={submitInput} newsData={newsData} />
    </div>
  );
};

export default App;
