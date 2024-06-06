import "./WeatherWidgit.scss";
import Forecast from "../Forecast/Forecast";
import Condition from "../Condition/Condition";
import ForecastResponse from "../../types/ForecastResponse";

import { useState } from "react";

type WeatherWidgitProps = {
  weatherData: ForecastResponse;
};

const WeatherWidgit = ({ weatherData }: WeatherWidgitProps) => {
  const [showFeelsLike, setShowFeelsLike] = useState(false);
  const [showWindSpeed, setShowWindSpeed] = useState(false);

  console.log(weatherData.forecast);

  function formatDate(dateString: string): string {
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
  }

  const getDayOfWeek = (dateString: string): string => {
    const date = new Date(dateString);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[date.getUTCDay()];
  };

  const reveal = (location: HTMLDivElement) => {
    console.log(location);
    if (location.parentElement?.className == "current__tempConditions") {
      showFeelsLike ? setShowFeelsLike(false) : setShowFeelsLike(true);
    } else {
      showWindSpeed ? setShowWindSpeed(false) : setShowWindSpeed(true);
    }
  };

  return (
    <div className="current">
      <div className="current__topLine">
        <p className="current__lastUpdated">{formatDate(weatherData.current.last_updated.split(" ", 1)[0])}</p>
        <p className="current__location">{weatherData.location.name}</p>
      </div>
      <div className="current__isDay">
        <p>{getDayOfWeek(weatherData.current.last_updated.split(" ", 1)[0])}</p>
      </div>
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
      {weatherData != null ? <Forecast forecastData={weatherData.forecast} getDayOfWeek={getDayOfWeek} /> : <p> no forecast data</p>}
    </div>
  );
};

export default WeatherWidgit;
