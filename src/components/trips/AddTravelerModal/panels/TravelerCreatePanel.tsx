import { useState } from "react";
import { TravelerType, TemperatureUnit } from "../../../../enums/enums";
import type { TravelerCreateDraft } from "../../../../types/forms/travelers";
import TempSlider, {
  type TempSliderValues,
} from "../../../traveler/tempPreferences/TempSlider.tsx";
import { convertTemperatures } from "../../../../utils/tempConversion";

interface TravelerCreatePanelProps {
  draft: TravelerCreateDraft;
  onChange: (updates: Partial<TravelerCreateDraft>) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
  error: string | null;
}

export default function TravelerCreatePanel({
  draft,
  onChange,
  onSave,
  onCancel,
  isSaving,
  error,
}: TravelerCreatePanelProps) {
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleUnitToggle = () => {
    const newUnit =
      draft.temp_unit === TemperatureUnit.FAHRENHEIT
        ? TemperatureUnit.CELSIUS
        : TemperatureUnit.FAHRENHEIT;

    onChange({
      temp_unit: newUnit,
      temps: {
        cold: convertTemperatures(draft.temps.cold, newUnit),
        cool: convertTemperatures(draft.temps.cool, newUnit),
        warm: convertTemperatures(draft.temps.warm, newUnit),
        hot: convertTemperatures(draft.temps.hot, newUnit),
      },
    });
  };

  const handleTempChange = (newTemps: TempSliderValues) => {
    onChange({ temps: newTemps });
  };

  const validate = (): boolean => {
    if (!draft.name.trim()) {
      setValidationError("Name is required");
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleSave = () => {
    if (validate()) {
      onSave();
    }
  };

  const displayError = error || validationError;

  return (
    <div className="traveler-create-panel">
      <button className="modal-back-btn" onClick={onCancel} type="button">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="18"
          height="18"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to list
      </button>

      <h3 className="panel-heading">Create New Traveler</h3>

      {displayError && <div className="panel-error">{displayError}</div>}

      {/* Name */}
      <section className="form-section">
        <label className="form-label" htmlFor="new-traveler-name">
          Name
        </label>
        <p className="form-desc">Enter the full name of this traveler.</p>
        <input
          id="new-traveler-name"
          type="text"
          value={draft.name}
          onChange={(e) => {
            onChange({ name: e.target.value });
            if (validationError) setValidationError(null);
          }}
          placeholder="e.g. Alice Johnson"
          className="modal-text-input"
          disabled={isSaving}
        />
      </section>

      {/* Traveler Type */}
      <section className="form-section">
        <h4 className="form-label">Traveler Type</h4>
        <p className="form-desc">Select what kind of traveler this is.</p>
        <div className="type-options">
          {(Object.values(TravelerType) as string[]).map((type) => (
            <button
              key={type}
              type="button"
              className={`type-btn ${draft.traveler_type === type ? "selected" : ""}`}
              onClick={() =>
                onChange({
                  traveler_type:
                    type as (typeof TravelerType)[keyof typeof TravelerType],
                })
              }
              aria-pressed={draft.traveler_type === type}
              disabled={isSaving}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {/* Temperature Preferences */}
      <section className="form-section">
        <div className="form-label-row">
          <h4 className="form-label">Temperature Preferences</h4>
          <div className="unit-toggle">
            <button
              className={`unit-toggle-btn ${
                draft.temp_unit === TemperatureUnit.CELSIUS ? "selected" : ""
              }`}
              onClick={handleUnitToggle}
              type="button"
              aria-pressed={draft.temp_unit === TemperatureUnit.CELSIUS}
              disabled={isSaving}
            >
              C
            </button>
            <button
              className={`unit-toggle-btn ${
                draft.temp_unit === TemperatureUnit.FAHRENHEIT ? "selected" : ""
              }`}
              onClick={handleUnitToggle}
              type="button"
              aria-pressed={draft.temp_unit === TemperatureUnit.FAHRENHEIT}
              disabled={isSaving}
            >
              F
            </button>
          </div>
        </div>
        <p className="form-desc">
          Set the temperature ranges this traveler considers cold, cool, warm,
          and hot.
        </p>
        <TempSlider
          temperaturePreferences={{ ...draft.temps, unit: draft.temp_unit }}
          tempUnit={draft.temp_unit}
          onChange={handleTempChange}
        />
      </section>

      <div className="panel-actions">
        <button
          className="btn-primary"
          onClick={handleSave}
          type="button"
          disabled={isSaving || !draft.name.trim()}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
        <button
          className="btn-text"
          onClick={onCancel}
          type="button"
          disabled={isSaving}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
