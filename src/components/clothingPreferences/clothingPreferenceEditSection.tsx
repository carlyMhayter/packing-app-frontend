import { useEffect, useState } from "react";
import type { ClothingPref, ClothingPrefsAll } from "../../types/clothingPrefs";
import { ClothingPreferenceStandards } from "../../enums/enums";
import "../traveler/styles/travelerEdit.css";
import Tooltip from "../basic/tooltip";
type Props = {
  clothingPrefs: ClothingPref | null;
  travelerType: string;
};

// Local input types to allow empty strings during editing so that
// clearing a field does not immediately snap to 0 and introduce a leading zero
// when the user types again.
type ClothingDetailInput = {
  type: string;
  num_per_day: string;
  rewear_days: string;
};

type ClothingPrefsInput = {
  [K in keyof ClothingPrefsAll]: ClothingDetailInput;
};

function ClothingPreferenceEditSection({ clothingPrefs, travelerType }: Props) {
  const [localPrefs, setLocalPrefs] = useState<ClothingPrefsInput | null>(null);

  useEffect(() => {
    if (clothingPrefs?.preferences) {
      try {
        const inputData = {} as ClothingPrefsInput;

        (
          Object.keys(clothingPrefs.preferences) as (keyof ClothingPrefsAll)[]
        ).forEach((key) => {
          const item = clothingPrefs.preferences[key];
          inputData[key] = {
            type: item.type,
            num_per_day: String(item.num_per_day),
            rewear_days: key === "underwear" ? "0" : String(item.rewear_days),
          };
        });

        setLocalPrefs(inputData);
      } catch {
        console.error("Failed to parse clothing preferences");
        setLocalPrefs(null);
      }
    }
  }, [clothingPrefs]);

  if (!clothingPrefs || !localPrefs) {
    return <>Loading...</>;
  }

  const prefKeys = Object.keys(localPrefs) as (keyof ClothingPrefsInput)[];

  const handleInputChange = (
    key: keyof ClothingPrefsInput,
    field: keyof ClothingDetailInput,
    value: string,
  ) => {
    setLocalPrefs((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [key]: {
          ...prev[key],
          [field]: value,
        },
      };
    });
  };

  const handleReset = () => {
    const standard =
      ClothingPreferenceStandards[
        travelerType.toUpperCase() as keyof typeof ClothingPreferenceStandards
      ];
    if (!standard) return;

    const resetData = {} as ClothingPrefsInput;
    (Object.keys(standard) as (keyof typeof standard)[]).forEach((key) => {
      const item = standard[key];
      resetData[key as keyof ClothingPrefsInput] = {
        type: item.type,
        num_per_day: String(item.num_per_day),
        rewear_days: key === "underwear" ? "0" : String(item.rewear_days),
      };
    });

    setLocalPrefs(resetData);
  };

  return (
    <section className="trav-modal-section">
      <h4 className="trav-modal-section-heading">Clothing Preferences</h4>
      <p className="clothing-pref-desc">
        Customize the standard rewears and wears per day, if you&apos;d like!
      </p>
      <table className="clothing-pref-table">
        <thead>
          <tr className="clothing-pref-header-row">
            <th className="clothing-pref-header-cell">Type</th>
            <th className="clothing-pref-header-cell">
              <Tooltip
                content="Would you wear more than one pair of these per day?"
                position="bottom"
              >
                Wears per day
              </Tooltip>
            </th>
            <th className="clothing-pref-header-cell">
              <Tooltip
                content="How many wears before you wash this type of item?"
                position="bottom"
              >
                Wears before washing
              </Tooltip>
            </th>
          </tr>
        </thead>
        <tbody>
          {prefKeys.map((key) => {
            const item = localPrefs[key];
            const isUnderwear = key === "underwear";

            return (
              <tr key={key} className="clothing-pref-data-row">
                <td className="clothing-pref-type-cell">{item.type}</td>
                <td className="clothing-pref-input-cell">
                  <input
                    type="number"
                    value={item.num_per_day}
                    min={0}
                    onChange={(e) =>
                      handleInputChange(key, "num_per_day", e.target.value)
                    }
                    className="clothing-pref-input"
                  />
                </td>
                <td className="clothing-pref-input-cell">
                  <input
                    type="number"
                    value={isUnderwear ? "0" : item.rewear_days}
                    min={0}
                    disabled={isUnderwear}
                    onChange={(e) =>
                      handleInputChange(key, "rewear_days", e.target.value)
                    }
                    className="clothing-pref-input"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        type="button"
        className="sci-btn"
        onClick={handleReset}
        style={{ marginTop: "12px" }}
      >
        Reset to standard values
      </button>
    </section>
  );
}

export default ClothingPreferenceEditSection;
