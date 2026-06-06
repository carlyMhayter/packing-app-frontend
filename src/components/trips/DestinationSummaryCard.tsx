import { useState } from "react";
import { type DestinationSummary, type WeatherCondition } from "../../types/trip";

function WeatherIcon({ condition }: { condition: WeatherCondition }) {
  const icons: Record<WeatherCondition, React.ReactNode> = {
    sunny: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
    partly_cloudy: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
    cloudy: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
    rainy: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        <line x1="8" y1="22" x2="8" y2="24" />
        <line x1="12" y1="22" x2="12" y2="24" />
        <line x1="16" y1="22" x2="16" y2="24" />
      </svg>
    ),
    stormy: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        <polyline points="13 16 11 20 15 20 13 24" />
      </svg>
    ),
    snowy: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        <line x1="8" y1="22" x2="8.01" y2="22" />
        <line x1="12" y1="22" x2="12.01" y2="22" />
        <line x1="16" y1="22" x2="16.01" y2="22" />
      </svg>
    ),
    clear: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  };

  const colors: Record<WeatherCondition, string> = {
    sunny: "#f5a623",
    partly_cloudy: "#7ed321",
    cloudy: "#9b9b9b",
    rainy: "#4a90e2",
    stormy: "#4a4a4a",
    snowy: "#b8b8b8",
    clear: "#9013fe",
  };

  return (
    <span className="daily-weather-icon" style={{ color: colors[condition] }}>
      {icons[condition]}
    </span>
  );
}

interface DestinationSummaryCardProps {
  destination: DestinationSummary;
  index: number;
}

export default function DestinationSummaryCard({
  destination,
  index,
}: DestinationSummaryCardProps) {
  const [expanded, setExpanded] = useState(false);

  const formatDayLabel = (dateStr: string, dayIndex: number) => {
    const date = new Date(dateStr);
    return `Day ${dayIndex + 1} — ${date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })}`;
  };

  return (
    <div className={`destination-summary-card ${expanded ? "is-expanded" : ""}`}>
      <div className="destination-summary-main">
        <div className="destination-summary-info">
          <h3 className="destination-summary-name">
            Destination {index + 1}: {destination.name}
          </h3>
          <p className="destination-summary-location">{destination.location}</p>
        </div>

        <div className="destination-summary-weather">
          <div className="destination-weather-block">
            <span className="destination-weather-label">Day</span>
            <div className="destination-weather-temps">
              <span>Hi {destination.dayWeather.highTemp}&deg;F</span>
              <span>Low {destination.dayWeather.lowTemp}&deg;F</span>
            </div>
          </div>

          <div className="destination-weather-block">
            <span className="destination-weather-label">Night</span>
            <div className="destination-weather-temps">
              <span>Hi {destination.nightWeather.highTemp}&deg;F</span>
              <span>Low {destination.nightWeather.lowTemp}&deg;F</span>
            </div>
          </div>
        </div>

        <div className="destination-summary-sun">
          <div className="sun-row">
            <span className="sun-label">Sunrise</span>
            <span className="sun-time">{destination.sunrise}</span>
          </div>
          <div className="sun-row">
            <span className="sun-label">Sunset</span>
            <span className="sun-time">{destination.sunset}</span>
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
          {destination.dailyWeather.map((day, dayIndex) => (
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
          ))}
        </div>
      )}
    </div>
  );
}
