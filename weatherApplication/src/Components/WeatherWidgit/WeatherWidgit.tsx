import "./WeatherWidgit.scss";
import Forecast from "../Forecast/Forecast";

type WeatherWidgitProps = {
  weatherData: Object | null;
};

const WeatherWidgit = ({ weatherData }: WeatherWidgitProps) => {
  return (
    <div>
      <div>
        <div className="current__lastUpdated">last updated</div>
        <div className="current__location">location</div>
      </div>
      <div className="current__isDay">
        <p>is day</p>
      </div>
      <div>
        <div className="current__temp">
          <p>temp</p>
        </div>
        <div className="current__condition">
          <p>condition</p>
        </div>
      </div>
      <div>
        <div className="current__windDirection">
          <p>wind direction</p>
        </div>
        <div className="current__speed">
          <p>speed</p>
        </div>
      </div>
      {weatherData != null ? <Forecast forecastData={weatherData.forecast} /> : <p> no forecast data</p>}
    </div>
  );
};

export default WeatherWidgit;

// temp c
// click
// temp f

// is day

// wind mph
// click
// wind kph

// wind direction

// feels like c
// click
// feels like f
