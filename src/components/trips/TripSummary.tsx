import { type ReactNode } from "react";
import { type WeatherData, type WeatherCondition } from "../../types/trip";

function WeatherIcon({ condition }: { condition: WeatherCondition }) {
  const icons: Record<WeatherCondition, ReactNode> = {
    sunny: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="28"
        height="28"
      >
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
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="28"
        height="28"
      >
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
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
    cloudy: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="28"
        height="28"
      >
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
    rainy: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="28"
        height="28"
      >
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        <line x1="8" y1="22" x2="8" y2="24" />
        <line x1="12" y1="22" x2="12" y2="24" />
        <line x1="16" y1="22" x2="16" y2="24" />
      </svg>
    ),
    stormy: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="28"
        height="28"
      >
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        <polyline points="13 16 11 20 15 20 13 24" />
      </svg>
    ),
    snowy: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="28"
        height="28"
      >
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        <line x1="8" y1="22" x2="8.01" y2="22" />
        <line x1="12" y1="22" x2="12.01" y2="22" />
        <line x1="16" y1="22" x2="16.01" y2="22" />
      </svg>
    ),
    clear: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="28"
        height="28"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  };

  return (
    <span className={`weather-icon weather-${condition}`}>
      {icons[condition]}
    </span>
  );
}

interface WeatherCardProps {
  title: string;
  weather: WeatherData;
  dayOrNight: "day" | "night";
}

function WeatherCard({ title, weather, dayOrNight }: WeatherCardProps) {
  return (
    <div className={`weather-card ${dayOrNight}-card`}>
      <h3 className="weather-card-title">{title}</h3>
      <div className="weather-temps">
        <div className="weather-temp-row">
          <span className="weather-temp-label">Hi:</span>
          <span className="weather-temp-value">{weather.highTemp}&deg;F</span>
        </div>
        <div className="weather-temp-row">
          <span className="weather-temp-label">Low:</span>
          <span className="weather-temp-value">{weather.lowTemp}&deg;F</span>
        </div>
      </div>
      <div className="weather-conditions">
        <span className="weather-conditions-label">Expected Weather</span>
        <div className="weather-icons-row">
          {weather.conditions.map((condition) => (
            <WeatherIcon key={condition} condition={condition} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface TripSummaryProps {
  tripName: string;
  totalNights: number;
  departDate: string;
  returnDate: string;
  dayWeather: WeatherData;
  nightWeather: WeatherData;
}

export default function TripSummary({
  tripName,
  totalNights,
  departDate,
  returnDate,
  dayWeather,
  nightWeather,
}: TripSummaryProps) {
  const formatShortDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "2-digit",
    });
  };

  return (
    <div className="trip-summary">
      <div className="trip-summary-header">
        <h1 className="trip-summary-title">{tripName}</h1>
        <div className="trip-summary-meta">
          <span className="trip-summary-nights">{totalNights} nights</span>
          <div className="trip-summary-dates">
            <span className="trip-summary-date">
              <span className="trip-summary-date-label">Depart</span>
              <span className="trip-summary-date-value">
                {formatShortDate(departDate)}
              </span>
            </span>
            <span className="trip-summary-date-separator">–</span>
            <span className="trip-summary-date">
              <span className="trip-summary-date-label">Return</span>
              <span className="trip-summary-date-value">
                {formatShortDate(returnDate)}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="weather-cards-row">
        <WeatherCard
          title="Overall Day Conditions"
          weather={dayWeather}
          dayOrNight="day"
        />
        <WeatherCard
          title="Overall Night Conditions"
          weather={nightWeather}
          dayOrNight="night"
        />
      </div>
    </div>
  );
}
