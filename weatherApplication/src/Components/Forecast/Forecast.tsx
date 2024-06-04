import "./Forecast.scss";
import ForecastData from "../../types/ForecastData";

type ForecastProps = {
  forecastData: ForecastData;
  getDayOfWeek: (date: string) => string;
};

const Forecast = ({ getDayOfWeek, forecastData }: ForecastProps) => {
  console.log(forecastData);
  return (
    <div className="forecast">
      <p> average temperature</p>
      <div className="forecast__table">
        <div className="forecast__block">
          <div className="forecast__day">{getDayOfWeek(forecastData.forecastday[0].date).substring(0, 3)}</div>
          <div className="forecast__value">{forecastData.forecastday[0].day.avgtemp_c} °C</div>
        </div>
        <div className="forecast__block">
          <div className="forecast__day">{getDayOfWeek(forecastData.forecastday[1].date).substring(0, 3)}</div>
          <div className="forecast__value">{forecastData.forecastday[1].day.avgtemp_c} °C</div>
        </div>
        <div className="forecast__block">
          <div className="forecast__day">{getDayOfWeek(forecastData.forecastday[2].date).substring(0, 3)}</div>
          <div className="forecast__value">{forecastData.forecastday[2].day.avgtemp_c} °C</div>
        </div>
        <div className="forecast__block">
          <div className="forecast__day">{getDayOfWeek(forecastData.forecastday[3].date).substring(0, 3)}</div>
          <div className="forecast__value">{forecastData.forecastday[3].day.avgtemp_c} °C</div>
        </div>
        <div className="forecast__block">
          <div className="forecast__day">{getDayOfWeek(forecastData.forecastday[4].date).substring(0, 3)}</div>
          <div className="forecast__value">{forecastData.forecastday[4].day.avgtemp_c} °C</div>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
