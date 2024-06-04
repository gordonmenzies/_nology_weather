import "./WeatherWidgit.scss";
import Forecast from "../Forecast/Forecast";
import Condition from "../Condition/Condition";
import ForecastResponse from "../../types/ForecastResponse";

type WeatherWidgitProps = {
  weatherData: ForecastResponse;
};

const WeatherWidgit = ({ weatherData }: WeatherWidgitProps) => {
  function getDayOfWeek(dateString: string): string {
    const date = new Date(dateString);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[date.getUTCDay()];
  }

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
        <p className="current__temp">{weatherData.current.temp_c} °C</p>
        <Condition code={weatherData.current.condition.code} text={weatherData.current.condition.text} icon={weatherData.current.condition.icon} />
      </div>
      <div className="current__wind">
        <p className="current__windDirection">{weatherData.current.wind_dir}</p>
        <p className="current__speed">{weatherData.current.wind_kph} kph</p>
      </div>
      {weatherData != null ? <Forecast forecastData={weatherData.forecast} getDayOfWeek={getDayOfWeek} /> : <p> no forecast data</p>}
    </div>
  );
};

export default WeatherWidgit;
