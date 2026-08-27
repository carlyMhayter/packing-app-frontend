import { useState } from "react";
import type { TravelerClothingPreferences } from "../../../types/clothingPreferences.js";
import { sampleTravelerClothingPreferences } from "../travelerData.js";

export default function ClothingPreferenceSection() {
  const [clothing, setClothing] = useState<TravelerClothingPreferences>({
    ...sampleTravelerClothingPreferences.preferences,
  });

  return (
    <section className="trav-modal-section">
      <h4 className="trav-modal-section-heading">Clothing Preferences</h4>
      <p className="trav-modal-section-desc">
        How many clothing items does this traveler typically use each day?
      </p>
      <div className="clothing-preferences-list">
        {(
          [
            { key: "tops", label: "Tops per day" },
            { key: "bottoms", label: "Bottoms per day" },
            { key: "underwear", label: "Pairs of underwear per day" },
            { key: "socks", label: "Pairs of socks per day" },
            {
              key: "workoutDaysPerWeek",
              label: "Workout clothing days per week",
            },
          ] as { key: keyof ClothingPrefs; label: string }[]
        ).map(({ key, label }) => (
          <div key={key} className="clothing-preference-row">
            <span className="clothing-preference-label">{label}</span>
            <input
              type="text"
              inputMode="numeric"
              value={clothing[key] as string}
              onChange={(e) =>
                setClothing((prev) => ({
                  ...prev,
                  [key]: e.target.value,
                }))
              }
              className="clothing-preference-input"
            />
          </div>
        ))}
        <div className="clothing-preference-toggle-row">
          <span className="clothing-preference-label">
            Wear pajamas separate from normal clothing?
          </span>
          <div className="clothing-preference-toggle">
            <button
              type="button"
              className={clothing.pajamasSeparate ? "selected" : ""}
              onClick={() =>
                setClothing((prev) => ({
                  ...prev,
                  pajamasSeparate: true,
                }))
              }
              aria-pressed={clothing.pajamasSeparate}
            >
              Yes
            </button>
            <button
              type="button"
              className={!clothing.pajamasSeparate ? "selected" : ""}
              onClick={() =>
                setClothing((prev) => ({
                  ...prev,
                  pajamasSeparate: false,
                }))
              }
              aria-pressed={!clothing.pajamasSeparate}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
