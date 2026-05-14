import { useEffect, useRef, useState } from "react";
import melbourneImg from "../../assets/locations/melbourne.jpeg";
import brisbaneImg from "../../assets/locations/brisbane.jpeg";
import sydneyImg from "../../assets/locations/sydney.jpeg";

const trips = [
  {
    city: "Sydney",
    nights: 7,
    departureMonth: "DEC",
    departureDay: 15,
    returnMonth: "DEC",
    returnDay: 22,
    highTemp: 89,
    lowTemp: 63,
    tripImg: sydneyImg,
  },
  {
    city: "Melbourne",
    nights: 5,
    departureMonth: "DEC",
    departureDay: 23,
    returnMonth: "DEC",
    returnDay: 31,
    highTemp: 82,
    lowTemp: 58,
    tripImg: melbourneImg,
  },
  {
    city: "Brisbane",
    nights: 4,
    departureMonth: "JAN",
    departureDay: 1,
    returnMonth: "JAN",
    returnDay: 6,
    highTemp: 91,
    lowTemp: 71,
    tripImg: brisbaneImg,
  },
];

/* ── weather icons ── */

function SunnyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="5" fill="#FBBF24" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="#FBBF24"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloudyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10c-.186 0-.367.012-.544.035A5.998 5.998 0 0 0 6.5 8.5c-2.485 0-4.5 2.015-4.5 4.5S4.015 17.5 6.5 17.5h11z"
        fill="#95A3B3"
      />
    </svg>
  );
}

function PartlyCloudyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="10" r="4" fill="#FBBF24" />
      <path
        d="M17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10c-.186 0-.367.012-.544.035A5.998 5.998 0 0 0 6.5 8.5c-2.485 0-4.5 2.015-4.5 4.5S4.015 17.5 6.5 17.5h11z"
        fill="#95A3B3"
      />
    </svg>
  );
}

function RainyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.5 17c2.485 0 4.5-2.015 4.5-4.5S19.985 8 17.5 8c-.186 0-.367.012-.544.035A5.998 5.998 0 0 0 6.5 6.5c-2.485 0-4.5 2.015-4.5 4.5S4.015 15.5 6.5 15.5h11z"
        fill="#95A3B3"
      />
      <path
        d="M8 18l-1 2m4-2l-1 2m4-2l-1 2"
        stroke="#4A90E2"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StormyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.5 14c2.485 0 4.5-2.015 4.5-4.5S19.985 5 17.5 5c-.186 0-.367.012-.544.035A5.998 5.998 0 0 0 6.5 3.5c-2.485 0-4.5 2.015-4.5 4.5S4.015 12.5 6.5 12.5h11z"
        fill="#95A3B3"
      />
      <path
        d="M13 16l-2 4h3l-1 4"
        stroke="#FBBF24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const allWeatherIcons = [
  { id: "sunny", component: SunnyIcon },
  { id: "cloudy", component: CloudyIcon },
  { id: "partly", component: PartlyCloudyIcon },
  { id: "rainy", component: RainyIcon },
  { id: "stormy", component: StormyIcon },
];

function getRandomIcons(count: number) {
  const shuffled = [...allWeatherIcons].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/* ── card ── */

export default function TripCards() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="trip-cards">
      {trips.map((trip, i) => {
        const icons = getRandomIcons(Math.floor(Math.random() * 4) + 1);
        return (
          <div
            key={trip.city}
            className={`trip-card ${visible ? "trip-card-landed" : ""}`}
            style={{ transitionDelay: `${i * 0.15}s` }}
          >
            {/* top bar */}
            <div className="trip-card-header">
              <span className="trip-card-city">{trip.city}</span>
              <span className="trip-card-nights">
                {trip.nights} night{trip.nights > 1 ? "s" : ""}
              </span>
            </div>

            {/* image */}
            <div className="trip-card-image">
              <img src={trip.tripImg} alt={trip.city} />
            </div>

            {/* date range */}
            <div className="trip-card-dates">
              <div className="trip-card-date-block">
                <span className="trip-card-month">{trip.departureMonth}</span>
                <span className="trip-card-day">{trip.departureDay}</span>
              </div>
              <span className="trip-card-date-dash">—</span>
              <div className="trip-card-date-block">
                <span className="trip-card-month">{trip.returnMonth}</span>
                <span className="trip-card-day">{trip.returnDay}</span>
              </div>
            </div>

            {/* temps */}
            <div className="trip-card-temps">
              <div className="trip-card-temp-row">
                <span className="trip-card-temp-label">HIGHEST TEMP</span>
                <span className="trip-card-temp-value">{trip.highTemp}°F</span>
              </div>
              <div className="trip-card-temp-row">
                <span className="trip-card-temp-label">LOWEST TEMP</span>
                <span className="trip-card-temp-value">{trip.lowTemp}°F</span>
              </div>
            </div>

            {/* weather icons */}
            <div className="trip-card-weather-icons">
              {icons.map((icon) => (
                <div key={icon.id} className="trip-card-weather-icon">
                  <icon.component />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
