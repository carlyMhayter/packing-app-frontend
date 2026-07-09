import { type TripForecastPublic } from "../../types/trip";
import WeatherIcon from "../basic/weatherIcons";
import { aggregateConditions } from "../../utils/weatherCodes";
import "./styles/weatherCards.css";

export default function OverallConditions({ forecastTrip }: { forecastTrip: TripForecastPublic }) {
  const { dayConditions, dayHigh, dayLow, nightConditions, nightHigh, nightLow } = forecastTrip;

  const aggregateDaytimeCondtitions = aggregateConditions(
    Object.entries(dayConditions.conditions),
  );

  const aggregateNighttimeCondtitions = aggregateConditions(
    Object.entries(nightConditions.conditions),
  );

  return (
    <div className={`weather-card`}>
      <h3 className="weather-card-title">Overall Conditions</h3>
      <div className="overall-conditions-content">
        <div className="weather-summary-section">
          <h4>Daytime Summary</h4>
          <div className="weather-type-summary">
            <div className="temp-summary">
              <div className="weather-temps">
                <div className="weather-temp-row">
                  <span className="weather-temp-label">Highest:</span>
                  <span className="weather-temp-value">{dayHigh}&deg;F</span>
                </div>
                <div className="weather-temp-row">
                  <span className="weather-temp-label">Lowest:</span>
                  <span className="weather-temp-value">{dayLow}&deg;F</span>
                </div>
              </div>
            </div>
            <div className="common-conditions-stack">
              {aggregateDaytimeCondtitions.map((element: [string, number]) => {
                const percentage = Math.round(
                  (element[1] / dayConditions.total_hours) * 100,
                );

                return (
                  <div className="weather-summary-card">
                    <div>
                      <WeatherIcon condition={"sunny"} />
                    </div>
                    <div>{element[0]}</div>
                    <div>{percentage}% of the time</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="weather-summary-section">
          <h4>Nighttime Summary</h4>
          <div className="weather-type-summary">
            <div className="temp-summary">
              <div className="weather-temps">
                <div className="weather-temp-row">
                  <span className="weather-temp-label">Highest:</span>
                  <span className="weather-temp-value">{nightHigh}&deg;F</span>
                </div>
                <div className="weather-temp-row">
                  <span className="weather-temp-label">Lowest:</span>
                  <span className="weather-temp-value">{nightLow}&deg;F</span>
                </div>
              </div>
            </div>
            <div className="common-conditions-stack">
              {aggregateNighttimeCondtitions.map(
                (element: [string, number]) => {
                  const percentage = Math.round(
                    (element[1] / nightConditions.total_hours) * 100,
                  );

                  return (
                    <div className="weather-summary-card">
                      <div>
                        <WeatherIcon condition={"sunny"} />
                      </div>
                      <div>{element[0]}</div>
                      <div>{percentage}% of the time</div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
