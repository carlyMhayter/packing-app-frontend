import { type ForecastTripPublic } from "../../types/forecasts";
import { aggregateConditions } from "../../utils/weatherCodes";

function WeatherIcon({ condition }: { condition: string }) {
  return <span>{condition}</span>;
}
import "./styles/weatherCards.css";

export default function OverallConditions({
  forecastTrip,
}: {
  forecastTrip: ForecastTripPublic;
}) {
  const {
    day_conditions,
    day_high,
    day_low,
    night_conditions,
    night_high,
    night_low,
  } = forecastTrip;

  const aggregateDaytimeCondtitions = aggregateConditions(
    Object.entries(day_conditions.conditions),
  );

  const aggregateNighttimeCondtitions = aggregateConditions(
    Object.entries(night_conditions.conditions),
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
                  <span className="weather-temp-value">{day_high}&deg;F</span>
                </div>
                <div className="weather-temp-row">
                  <span className="weather-temp-label">Lowest:</span>
                  <span className="weather-temp-value">{day_low}&deg;F</span>
                </div>
              </div>
            </div>
            <div className="common-conditions-stack">
              {aggregateDaytimeCondtitions.map((element: [string, number]) => {
                const percentage = Math.round(
                  (element[1] / day_conditions.total_hours) * 100,
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
                  <span className="weather-temp-value">{night_high}&deg;F</span>
                </div>
                <div className="weather-temp-row">
                  <span className="weather-temp-label">Lowest:</span>
                  <span className="weather-temp-value">{night_low}&deg;F</span>
                </div>
              </div>
            </div>
            <div className="common-conditions-stack">
              {aggregateNighttimeCondtitions.map(
                (element: [string, number]) => {
                  const percentage = Math.round(
                    (element[1] / night_conditions.total_hours) * 100,
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
