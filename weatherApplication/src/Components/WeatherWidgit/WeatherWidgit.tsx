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

  const reveal = () => {
    showFeelsLike == false ? setShowFeelsLike(true) : setShowFeelsLike(false);
  };

  const getDayOfWeek = (dateString: string): string => {
    const date = new Date(dateString);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[date.getUTCDay()];
  };

  return (
    <div className="current">
      <div className="current__topLine">
        <p className="current__lastUpdated">{weatherData.current.last_updated}</p>
        <p className="current__location">{weatherData.location.name}</p>
      </div>
      <div className="current__isDay">
        <p>{getDayOfWeek(weatherData.current.last_updated.split(" ", 1)[0])}</p>
      </div>
      <div className="current__tempConditions">
        <div
          className="current__displayContainer"
          onClick={() => {
            reveal();
          }}
        >
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
        <div className="current__displayContainer">
          <p className="current__title">direction</p>
          <p className="current__data">{weatherData.current.wind_dir}</p>
        </div>
        <div className="current__displayContainer">
          <p className="current__title">speed</p>
          <p className="current__speed">{weatherData.current.wind_kph} kph</p>
        </div>
      </div>
      {weatherData != null ? <Forecast forecastData={weatherData.forecast} getDayOfWeek={getDayOfWeek} /> : <p> no forecast data</p>}
    </div>
  );
};

export default WeatherWidgit;
