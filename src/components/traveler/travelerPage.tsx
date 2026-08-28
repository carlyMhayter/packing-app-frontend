import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks.ts";
import {
  selectTraveler,
  fetchTravelerThunk,
  selectLoading,
  selectError,
} from "../../state/travelerSlice.ts";
// import ClothingPreferenceSection from "./clothingPreferences/ClothingPreferenceSection.tsx";
import { useParams } from "react-router";
import TempSlider from "./tempPreferences/TempSlider.tsx";
import { FormStateValues, TemperatureUnit } from "../../enums/enums.ts";
import { type TravelerUpdateForm } from "../../types/traveler.ts";

export default function TravelerPage() {
  const traveler = useAppSelector(selectTraveler);
  const dispatch = useAppDispatch();
  const { traveler_id } = useParams<{ traveler_id: string }>();
  const isLoading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const unit = traveler.temp_unit;
  const tempPrefs = JSON.parse(traveler.temp_pref);
  const [draft, setDraft] = useState<TravelerUpdateForm | null>(null); // local form state
  const [saveStatus, setSaveStatus] = useState<
    (typeof FormStateValues)[keyof typeof FormStateValues]
  >(FormStateValues.idle);
  const [lastSaved, setLastSaved] = useState<TravelerUpdateForm | null>(null); // for dirty-checking

  const convertTemps = (toUnit: "F" | "C") => {
    // if (toUnit === unit) return;
    // const convert = (val: number) =>
    //   toUnit === "C"
    //     ? Math.round(((val - 32) * 5) / 9)
    //     : Math.round((val * 9) / 5 + 32);
    // setTemps({
    //   cold: convert(temps.cold),
    //   cool: convert(temps.cool),
    //   warm: convert(temps.warm),
    //   hot: convert(temps.hot),
    // });
    // setUnit(toUnit);
  };

  useEffect(() => {
    console.log("useEffect1");
    console.log("traveler_id", traveler_id);
    dispatch(fetchTravelerThunk({ traveler_id: Number(traveler_id) }));

    if (traveler && !draft) {
      // hydrate once on load
      const draftData = {
        name: traveler.name,
        traveler_type: traveler.traveler_type,
        is_active: traveler.is_active,
        is_primary_for_user: traveler.is_primary_for_user,
        updated_at: Date.now(),
        temp_unit: unit,
        temp_pref: tempPrefs,
      };

      setDraft(draftData);
      setLastSaved(draftData);
    }
  }, []);

  console.log("traveler", traveler);
  if (isLoading) {
    return <>loading</>;
  }

  if (error) {
    return <>error</>;
  }

  return (
    <div className="trip-planner-container">
      <>
        {traveler.name}
        Name
        <section className="trav-modal-section">
          <label className="trav-modal-section-label" htmlFor="traveler-name">
            {traveler.name}
          </label>
          <p className="trav-modal-section-desc">
            Enter the full name of this traveler.
          </p>
          <input
            id="traveler-name"
            type="text"
            value={traveler.name ?? ""}
            // onChange={(e) =>
            //
            // setTravelerData((prev) =>
            //   prev ? { ...prev, name: e.target.value } : null,
            // )
            // }
            className="modal-text-input"
          />
        </section>
        {/* Traveler Type */}
        <section className="trav-modal-section">
          <h4 className="trav-modal-section-heading">Traveler Type</h4>
          <p className="trav-modal-section-desc">
            Select what kind of traveler this is so we can pack accordingly.
          </p>
          <div className="traveler-type-options">
            {(["adult", "child", "infant", "pet"] as const).map((type) => (
              <button
                key={type}
                type="button"
                className={`traveler-type-btn ${traveler.traveler_type === type ? "selected" : ""}`}
                // onClick={() =>
                //   setTravelerData((prev) => (prev ? { ...prev, type } : null))
                // }
                aria-pressed={traveler.traveler_type === type}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </section>
        {/* Temperature Preferences  */}
        <section className="trav-modal-section">
          <div className="trav-modal-section-heading-row">
            <h4 className="trav-modal-section-heading">
              Temperature Preferences
            </h4>
            <div className="unit-toggle">
              <button
                className={`unit-toggle-btn ${unit === TemperatureUnit.CELSIUS ? "selected" : ""}`}
                // onClick={() => convertTemps("C")}
                type="button"
                aria-pressed={unit === TemperatureUnit.CELSIUS}
              >
                C
              </button>
              <button
                className={`unit-toggle-btn ${unit === TemperatureUnit.FAHRENHEIT ? "selected" : ""}`}
                onClick={() => convertTemps("F")}
                type="button"
                aria-pressed={unit === TemperatureUnit.FAHRENHEIT}
              >
                F
              </button>
            </div>
          </div>
          <p className="trav-modal-section-desc">
            Set the temperature ranges this traveler considers cold, cool, warm,
            and hot.
          </p>
          <TempSlider
            temperaturePreferences={tempPrefs}
            tempUnit={unit}
            // onChange={(newTemps) => setTravelerData((prev) => prev ? { ...prev, temperaturePreferences: ...newTemps } : null)}
            //             onChange={(newTemps) => setTravelerData((prev) => prev ? { ...prev, temperaturePreferences: ...newTemps } : null)}
            onChange={() => {}}
          />
        </section>
        {/* <ClothingPreferenceSection /> */}
        Medications
        {/* <section className="trav-modal-section">
          <h4 className="trav-modal-section-heading">Medications</h4>
          <p className="trav-modal-section-desc">
            List any medications this traveler needs to bring so they don&apos;t
            get forgotten.
          </p>
          <div className="tag-list">
            {medications.map((med, i) => (
              <span key={i} className="tag-item">
                {med}
                <button
                  className="tag-remove"
                  onClick={() => removeMedication(i)}
                  type="button"
                  aria-label={`Remove ${med}`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    width="10"
                    height="10"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
          <div className="tag-add-row">
            <input
              type="text"
              value={newMed}
              onChange={(e) => setNewMed(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addMedication();
              }}
              placeholder="Add medication..."
              className="tag-add-input"
            />
            <button
              className="tag-add-btn"
              onClick={addMedication}
              type="button"
              aria-label="Add medication"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                width="14"
                height="14"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        </section>

        {/* Routines */}
        <section className="trav-modal-section">
          <div className="trav-modal-section-heading-row">
            <h4 className="trav-modal-section-heading">Current Routines</h4>
            <button
              className="sci-btn"
              // onClick={onNavigateNext}
              type="button"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                width="14"
                height="14"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New Routine
            </button>
          </div>
          <p className="trav-modal-section-desc">
            Daily routines (like morning or evening hygiene) so we can pack the
            right items for each day.
          </p>

          <div className="tag-list">
            {/* {traveler.map((routine, i) => (
              <div key={routine.id} className="routine-button">
                <span>{routine.name}</span>
                <Tooltip content="Edit routine">
                  <button
                    className="tag-edit"
                    onClick={() => onEditRoutine(routine.id)}
                    type="button"
                    aria-label={`Edit ${routine.name}`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      width="10"
                      height="10"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </button>
                </Tooltip>
                <button
                  className="tag-remove"
                  onClick={() => removeRoutine(i)}
                  type="button"
                  aria-label={`Remove ${routine.name}`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    width="10"
                    height="10"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            ))} */}
          </div>
        </section>
        {/* Previous Trips
        <section className="trav-modal-section">
          <h4 className="trav-modal-section-heading">Previous Trips</h4>
          <p className="trav-modal-section-desc">
            Previous trips will appear here.
          </p>
        </section> */}
        {/* {onSave && (
          <div className="modal-footer">
            <button
              className="btn-main"
              type="button"
              onClick={() =>
                onSave({ name, type: travelerType, temps, unit, medications })
              }
            >
              Save Traveler
            </button>
          </div>
        )} */}
      </>
    </div>
  );
}
