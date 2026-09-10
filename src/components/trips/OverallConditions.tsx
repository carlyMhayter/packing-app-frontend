import { type ForecastTripPublic } from "../../types/forecasts";
import { aggregateConditions } from "../../utils/weatherCodes";
import "./styles/weatherCards.css";
import WeatherIcon from "../weatherIcon/WeatherIcon";
import ConditionsWIcons from "./ConditionsWIcons";

export default function OverallConditions({
  forecast_trip,
}: {
  forecast_trip: ForecastTripPublic;
}) {
  const aggregateDaytimeCondtitions = aggregateConditions(
    Object.entries(forecast_trip.day_conditions.conditions),
  );

  const aggregateNighttimeCondtitions = aggregateConditions(
    Object.entries(forecast_trip.night_conditions.conditions),
  );

  return (
    <div className={`overall-conditions-section`}>
      <h3 className="weather-card-title">Projected Trip Weather Conditions</h3>
      <div className="overall-conditions-content">
        <div className="weather-summary-section day-card">
          <h4 className="overall-conditions-header">Daytime:</h4>
          <div className="weather-type-summary">
            <div className="temp-summary">
              <div className="weather-temps">
                <div className="weather-temp-row">
                  <span className="weather-temp-label">Highest:</span>
                  <span className="weather-temp-value high">
                    {forecast_trip.day_high}&deg;F
                  </span>
                </div>
                <div className="weather-temp-row">
                  <span className="weather-temp-label">Lowest:</span>
                  <span className="weather-temp-value low">
                    {forecast_trip.day_low}&deg;F
                  </span>
                </div>
              </div>
            </div>
            <div className="common-conditions-stack">
              <ConditionsWIcons
                aggregatedConditions={aggregateDaytimeCondtitions}
                totalHours={forecast_trip.day_conditions.total_hours}
              />
            </div>
          </div>
        </div>
        <div className="weather-summary-section night-card">
          <h4 className="overall-conditions-header">Nighttime:</h4>
          <div className="weather-type-summary">
            <div className="temp-summary">
              <div className="weather-temps">
                <div className="weather-temp-row">
                  <span className="weather-temp-label">Highest:</span>
                  <span className="weather-temp-value high">
                    {forecast_trip.night_high}&deg;F
                  </span>
                </div>
                <div className="weather-temp-row">
                  <span className="weather-temp-label">Lowest:</span>
                  <span className="weather-temp-value low">
                    {forecast_trip.night_low}&deg;F
                  </span>
                </div>
              </div>
            </div>
            <div className="common-conditions-stack">
              <ConditionsWIcons
                aggregatedConditions={aggregateNighttimeCondtitions}
                totalHours={forecast_trip.night_conditions.total_hours}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
