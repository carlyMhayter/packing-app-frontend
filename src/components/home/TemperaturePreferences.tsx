import { useState } from "react";

const coldWeatherItems = [
  "sweater",
  "sweatshirt",
  "warm hat",
  "gloves",
];

export default function TemperaturePreferences() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (item: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  };

  return (
    <div className="temp-preferences">
      <div className="temp-preferences-row">
        <div className="temp-preferences-notice">
          <p>
            Nighttime temps will hit below 60°F during your trip. You reported
            that you feel cold at around 62°F.
          </p>
        </div>

        <div className="temp-preferences-arrow">
          <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 50 C 40 50, 60 10, 100 20"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <polygon points="95,15 105,22 100,25" fill="currentColor" />
          </svg>
        </div>

        <div className="temp-preferences-card">
          <h4 className="temp-preferences-card-title">
            Consider adding to your list:
          </h4>
          <div className="recommendation-list">
            {coldWeatherItems.map((item) => (
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
                  onChange={() => toggle(item)}
                />
                <span className="recommendation-text">{item}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="temp-preferences-text">
        <p>We consider your personal preferences for each traveler.</p>
        <p>Use our standard values, or customize your own!</p>
      </div>
    </div>
  );
}
