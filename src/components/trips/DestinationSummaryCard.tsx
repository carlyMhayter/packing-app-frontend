import { useState } from "react";
import "./styles/destinationSummary.css";
import type { DestinationPublic } from "../../types/destinations";
interface DestinationSummaryCardProps {
  destination: DestinationPublic;
}

export default function DestinationSummaryCard({
  destination,
}: DestinationSummaryCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`destination-summary-card ${expanded ? "is-expanded" : ""}`}
    >
      <div className="destination-summary-main">
        <div className="destination-summary-info">
          <h3 className="destination-summary-name">
            Destination {destination.order}: {destination.label}
          </h3>
          {/* <p className="destination-summary-location">{destination.location}</p> */}
        </div>

        <div className="destination-summary-weather">
          <div className="destination-weather-block">
            <span className="destination-weather-label">Day</span>
            <div className="destination-weather-temps">
              {/* <span>Hi {destination.dayWeather.highTemp}&deg;F</span>
              <span>Low {destination.dayWeather.lowTemp}&deg;F</span> */}
            </div>
          </div>

          <div className="destination-weather-block">
            <span className="destination-weather-label">Night</span>
            <div className="destination-weather-temps">
              {/* <span>Hi {destination.nightWeather.highTemp}&deg;F</span>
              <span>Low {destination.nightWeather.lowTemp}&deg;F</span> */}
            </div>
          </div>
        </div>

        <div className="destination-summary-sun">
          <div className="sun-row">
            <span className="sun-label">Sunrise</span>
            {/* <span className="sun-time">{destination.sunrise}</span> */}
          </div>
          <div className="sun-row">
            <span className="sun-label">Sunset</span>
            {/* <span className="sun-time">{destination.sunset}</span> */}
          </div>
        </div>

        <button
          className={`destination-summary-toggle ${expanded ? "is-expanded" : ""}`}
          onClick={() => setExpanded((prev) => !prev)}
          type="button"
          aria-label={expanded ? "Collapse details" : "Expand details"}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="24"
            height="24"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {expanded && (
        <div className="destination-daily-cards">
          {/* {destination.dailyWeather.map((day, dayIndex) => (
            <div key={day.date} className="destination-daily-card">
              <span className="daily-card-date">
                {formatDayLabel(day.date, dayIndex)}
              </span>
              <div className="daily-card-temps">
                <span className="daily-card-hi">{day.highTemp}&deg;F</span>
                <span className="daily-card-low">{day.lowTemp}&deg;F</span>
              </div>
              <div className="daily-card-conditions">
                {day.conditions.map((condition) => (
                  <WeatherIcon key={condition} condition={condition} />
                ))}
              </div>
            </div>
          ))} */}
        </div>
      )}
    </div>
  );
}
