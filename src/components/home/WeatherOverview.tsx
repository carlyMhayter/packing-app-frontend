import { useState } from "react";

/* ── weather icons ── */

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
      <path d="M13 16l-2 4h3l-1 4" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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

function SnowflakeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14M8 2l2 3-2 3M16 2l-2 3 2 3M8 16l2 3-2 3M16 16l-2 3 2 3M2 8l3 2 3-2M2 16l3-2 3 2M16 8l3 2 3-2M16 16l3-2 3 2"
        stroke="#4A90E2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── shared checkbox list ── */

function CheckboxList({
  items,
  checked,
  onToggle,
}: {
  items: string[];
  checked: Set<string>;
  onToggle: (item: string) => void;
}) {
  return (
    <div className="recommendation-list">
      {items.map((item) => (
        <label
          key={item}
          className={`recommendation-item ${checked.has(item) ? "is-checked" : ""}`}
        >
          <span className="recommendation-checkbox">
            {checked.has(item) ? (
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="2" />
                <path d="M6 12l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="2" />
              </svg>
            )}
          </span>
          <input
            type="checkbox"
            checked={checked.has(item)}
            onChange={() => onToggle(item)}
          />
          <span className="recommendation-text">{item}</span>
        </label>
      ))}
    </div>
  );
}

/* ── data ── */

const rainItems = ["raincoat / poncho", "rainhat", "umbrella"];
const coldItems = ["sweater", "sweatshirt", "warm hat", "gloves"];

/* ── component ── */

export default function WeatherOverview() {
  const [rainChecked, setRainChecked] = useState<Set<string>>(new Set());
  const [coldChecked, setColdChecked] = useState<Set<string>>(new Set());

  const toggleRain = (item: string) => {
    setRainChecked((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  };

  const toggleCold = (item: string) => {
    setColdChecked((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  };

  return (
    <div className="weather-overview">
      <p className="weather-overview-intro">
        And we'll compile the weather conditions.
      </p>

      {/* Rain recommendations */}
      <div className="packing-section">
        <div className="packing-section-left">
          <div className="packing-icons">
            <div className="packing-icon">
              <RainyIcon />
            </div>
            <div className="packing-icon">
              <StormyIcon />
            </div>
            <div className="packing-icon">
              <SunnyIcon />
            </div>
          </div>
          <h3 className="packing-condition">Thunderstorms, Rain expected:</h3>
          <div className="packing-card">
            <span className="packing-card-label">Consider packing:</span>
            <CheckboxList items={rainItems} checked={rainChecked} onToggle={toggleRain} />
          </div>
        </div>
        <p className="packing-note">…and we'll make recommendations.</p>
      </div>

      {/* Cold recommendations */}
      <div className="packing-section">
        <div className="packing-section-left">
          <div className="packing-condition-row">
            <div className="packing-icon">
              <SnowflakeIcon />
            </div>
            <p className="packing-condition-text">
              Nighttime temps will hit below 60°F during your trip. You reported
              that you feel cold at around 62°F.
            </p>
          </div>
          <div className="packing-card">
            <span className="packing-card-label">Consider packing:</span>
            <CheckboxList items={coldItems} checked={coldChecked} onToggle={toggleCold} />
          </div>
        </div>
        <p className="packing-note">
          Never worry about over/under packing for weather!
        </p>
      </div>
    </div>
  );
}
