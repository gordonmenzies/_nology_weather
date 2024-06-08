import "./WeatherWidgit.scss";
import Condition from "../Condition/Condition";
import NewsWidgit from "../News/NewsWidgit";
import ForecastResponse from "../../types/ForecastResponse";
import LocationObject from "../../types/LocationObject";
import { useState, useEffect } from "react";
import Forecast from "../Forecast/Forecast";

type WeatherWidgitProps = {
  locationData: LocationObject;
};

const WeatherWidgit = ({ locationData }: WeatherWidgitProps) => {
  const [weatherData, setWeatherData] = useState<ForecastResponse>();
  const [showFeelsLike, setShowFeelsLike] = useState(false);
  const [showWindSpeed, setShowWindSpeed] = useState(false);
  const [displayValue, setDisplayValue] = useState<boolean>(false);

  const change = () => {
    if (displayValue == true) {
      setDisplayValue(false);
    } else {
      setDisplayValue(true);
    }
  };

  const accessForecast = async (locationData: LocationObject) => {
    let url = "http://api.weatherapi.com/v1/forecast.json?";
    let apiKey = `key=${import.meta.env.VITE_Weather_API_KEY}`;
    let q = `&q=${locationData.latitude},${locationData.longitude}`;
    let days = "&days=5";

    const response = await fetch(url + apiKey + q + days);
    const responseData = await response.json();
    setWeatherData(responseData);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    const daySuffix = (day: number): string => {
      if (day > 3 && day < 21) return "th"; // covers 4th to 20th
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${daySuffix(day)} ${month} ${year}`;
  };

  const greeting = (): string => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      return "Good morning";
    } else {
      return "Good afternoon";
    }
  };

  const getDayOfWeek = (dateString: string): string => {
    const date = new Date(dateString);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[date.getUTCDay()];
  };

  const reveal = (location: HTMLDivElement) => {
    if (location.parentElement?.className == "current__tempConditions") {
      showFeelsLike ? setShowFeelsLike(false) : setShowFeelsLike(true);
    } else {
      showWindSpeed ? setShowWindSpeed(false) : setShowWindSpeed(true);
    }
  };

  useEffect(() => {
    accessForecast(locationData);
  }, [locationData]);

  if (weatherData != null) {
    return (
      <div className="current">
        <div className="current__topLine">
          <p className="current__lastUpdated">{formatDate(weatherData.current.last_updated.split(" ", 1)[0])}</p>
          <p className="current__location">{weatherData.location.name}</p>
        </div>
        <div className="current__isDay">
          <p>
            {greeting()} it's {getDayOfWeek(weatherData.current.last_updated.split(" ", 1)[0])}
          </p>
        </div>
        <div className="current__variable">
          <button onClick={() => change()}>Left</button>
          {displayValue == true ? (
            <NewsWidgit />
          ) : (
            <div className="current__weather">
              <div className="current__tempConditions">
                <div className="current__displayContainer" onMouseEnter={(e) => reveal(e.currentTarget as HTMLDivElement)} onMouseLeave={(e) => reveal(e.currentTarget as HTMLDivElement)}>
                  {showFeelsLike ? (
                    <div>
                      <p className="current__title">feels like</p>
                      <p className="current__data">{weatherData.current.feelslike_c} °C</p>
                    </div>
                  ) : (
                    <div>
                      <p className="current__title">temp</p>
                      <p className="current__data">{weatherData.current.temp_c} °C</p>
                    </div>
                  )}
                </div>
                <div className="current__displayContainer">
                  <Condition code={weatherData.current.condition.code} text={weatherData.current.condition.text} icon={weatherData.current.condition.icon} />
                </div>
              </div>
              <div className="current__wind">
                <div className="current__displayContainer" onMouseEnter={(e) => reveal(e.currentTarget as HTMLDivElement)} onMouseLeave={(e) => reveal(e.currentTarget as HTMLDivElement)}>
                  {showWindSpeed ? (
                    <div>
                      <p className="current__title">direction</p>
                      <p className="current__data">{weatherData.current.wind_dir}</p>
                    </div>
                  ) : (
                    <div>
                      <p className="current__title">speed</p>
                      <p className="current__speed">{weatherData.current.wind_kph} kph</p>
                    </div>
                  )}
                </div>
                <div className="current__displayContainer">
                  <p className="current__title">chance of rain</p>
                  <p className="current__data">{weatherData.forecast.forecastday[0].day.daily_chance_of_rain} %</p>
                </div>
              </div>
            </div>
          )}
          <button onClick={() => change()}>Right</button>
        </div>
        <div>
          <Forecast forecastData={weatherData.forecast} getDayOfWeek={getDayOfWeek} />
        </div>
      </div>
    );
  }
};

export default WeatherWidgit;
