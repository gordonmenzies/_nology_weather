import "./Forecast.scss";
import ForecastType from "../../types/ForecastType";
import Condition from "../Condition/Condition";
import { useState } from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type ForecastProps = {
  forecastData: ForecastType;
  getDayOfWeek: (date: string) => string;
};

const Forecast = ({ getDayOfWeek, forecastData }: ForecastProps) => {
  const [displayValue, setDisplayValue] = useState<number>(0);

  const increment = () => {
    if (displayValue == 3) {
      setDisplayValue(0);
    } else {
      setDisplayValue(displayValue + 1);
    }
  };

  const decrement = () => {
    if (displayValue == 0) {
      setDisplayValue(3);
    } else {
      setDisplayValue(displayValue - 1);
    }
  };

  const renderSwitchSelection = () => {
    switch (displayValue) {
      case 0:
        return `average temperature`;
      case 1:
        return "max temp";
      case 2:
        return "chance of rain";
      case 3:
        return "condition";
    }
  };

  const renderSwitchData = () => {
    switch (displayValue) {
      case 0:
        return (
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
        );
      case 1:
        return (
          <div className="forecast__table">
            <div className="forecast__block">
              <div className="forecast__day">{getDayOfWeek(forecastData.forecastday[0].date).substring(0, 3)}</div>
              <div className="forecast__value">{forecastData.forecastday[0].day.maxtemp_c} °C</div>
            </div>
            <div className="forecast__block">
              <div className="forecast__day">{getDayOfWeek(forecastData.forecastday[1].date).substring(0, 3)}</div>
              <div className="forecast__value">{forecastData.forecastday[1].day.maxtemp_c} °C</div>
            </div>
            <div className="forecast__block">
              <div className="forecast__day">{getDayOfWeek(forecastData.forecastday[2].date).substring(0, 3)}</div>
              <div className="forecast__value">{forecastData.forecastday[2].day.maxtemp_c} °C</div>
            </div>
            <div className="forecast__block">
              <div className="forecast__day">{getDayOfWeek(forecastData.forecastday[3].date).substring(0, 3)}</div>
              <div className="forecast__value">{forecastData.forecastday[3].day.maxtemp_c} °C</div>
            </div>
            <div className="forecast__block">
              <div className="forecast__day">{getDayOfWeek(forecastData.forecastday[4].date).substring(0, 3)}</div>
              <div className="forecast__value">{forecastData.forecastday[4].day.maxtemp_c} °C</div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="forecast__table">
            <div className="forecast__block">
              <div className="forecast__day">{getDayOfWeek(forecastData.forecastday[0].date).substring(0, 3)}</div>
              <div className="forecast__value">{forecastData.forecastday[0].day.daily_chance_of_rain} %</div>
            </div>
            <div className="forecast__block">
              <div className="forecast__day">{getDayOfWeek(forecastData.forecastday[1].date).substring(0, 3)}</div>
              <div className="forecast__value">{forecastData.forecastday[1].day.daily_chance_of_rain} %</div>
            </div>
            <div className="forecast__block">
              <div className="forecast__day">{getDayOfWeek(forecastData.forecastday[2].date).substring(0, 3)}</div>
              <div className="forecast__value">{forecastData.forecastday[2].day.daily_chance_of_rain} %</div>
            </div>
            <div className="forecast__block">
              <div className="forecast__day">{getDayOfWeek(forecastData.forecastday[3].date).substring(0, 3)}</div>
              <div className="forecast__value">{forecastData.forecastday[3].day.daily_chance_of_rain} %</div>
            </div>
            <div className="forecast__block">
              <div className="forecast__day">{getDayOfWeek(forecastData.forecastday[4].date).substring(0, 3)}</div>
              <div className="forecast__value">{forecastData.forecastday[4].day.daily_chance_of_rain} %</div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="forecast__table">
            <div className="forecast__block">
              <div className="forecast__day">{getDayOfWeek(forecastData.forecastday[0].date).substring(0, 3)}</div>
              <Condition code={forecastData.forecastday[0].day.condition.code} text={forecastData.forecastday[0].day.condition.text} icon={forecastData.forecastday[0].day.condition.icon} />
            </div>
            <div className="forecast__block">
              <div className="forecast__day">{getDayOfWeek(forecastData.forecastday[1].date).substring(0, 3)}</div>
              <Condition code={forecastData.forecastday[1].day.condition.code} text={forecastData.forecastday[1].day.condition.text} icon={forecastData.forecastday[1].day.condition.icon} />
            </div>
            <div className="forecast__block">
              <div className="forecast__day">{getDayOfWeek(forecastData.forecastday[2].date).substring(0, 3)}</div>
              <Condition code={forecastData.forecastday[2].day.condition.code} text={forecastData.forecastday[2].day.condition.text} icon={forecastData.forecastday[2].day.condition.icon} />
            </div>
            <div className="forecast__block">
              <div className="forecast__day">{getDayOfWeek(forecastData.forecastday[3].date).substring(0, 3)}</div>
              <Condition code={forecastData.forecastday[3].day.condition.code} text={forecastData.forecastday[3].day.condition.text} icon={forecastData.forecastday[3].day.condition.icon} />
            </div>
            <div className="forecast__block">
              <div className="forecast__day">{getDayOfWeek(forecastData.forecastday[4].date).substring(0, 3)}</div>
              <Condition code={forecastData.forecastday[4].day.condition.code} text={forecastData.forecastday[4].day.condition.text} icon={forecastData.forecastday[4].day.condition.icon} />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="forecast">
      <div className="forecast__selection">
        <ChevronLeftIcon onClick={() => decrement()} />
        <p>{renderSwitchSelection()}</p>
        <ChevronRightIcon onClick={() => increment()} />
      </div>
      {renderSwitchData()}
    </div>
  );
};

export default Forecast;
