import "./styles/travelerEdit.css";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks.ts";
import {
  selectTraveler,
  fetchTravelerThunk,
  selectLoading,
  selectError,
  updateTravelerThunk,
} from "../../state/travelerSlice.ts";
// import ClothingPreferenceSection from "./clothingPreferences/ClothingPreferenceSection.tsx";
import { useParams } from "react-router";
import TempSlider from "./tempPreferences/TempSlider.tsx";
import { TemperatureUnit } from "../../enums/enums.ts";
import { type TravelerPublic } from "../../types/travelers.ts";
import { useAutoSave } from "../../hooks/useAutoSave.ts";
import SaverBar from "../basic/saverBar.tsx";
import { convertTemperatures } from "../../utils/tempConversion.ts";
import ClothingPreferenceEditSection from "../clothingPreferences/clothingPreferenceEditSection.tsx";

export default function TravelerPage() {
  const { traveler_id } = useParams<{ traveler_id: string }>();
  const traveler = useAppSelector(selectTraveler);
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);
  const isLoading = useAppSelector(selectLoading);

  const [draft, setDraft] = useState<TravelerPublic | null>(null); // local form state
  // const didInit = useRef(false);
  const saveTravelerData = useCallback(
    async (submittedData: TravelerPublic) => {
      console.log("saveTravelerData:", submittedData);
      const dataToSubmit = {
        payload: {
          id: Number(traveler_id),
          name: submittedData.name,
          traveler_type: submittedData.traveler_type,
          temp_unit: submittedData.temp_unit,
          temp_pref: submittedData.temp_pref,
          is_active: submittedData.is_active,
          user_id: submittedData.user_id,
          trip_ids: submittedData.trip_ids,
          is_primary_for_user: submittedData.is_primary_for_user,
          clothing_preference: submittedData.clothing_preference,
          trip_travelers: submittedData.trip_travelers,
        },
      };

      const result = await dispatch(updateTravelerThunk(dataToSubmit)).unwrap();
      return result;
    },
    [dispatch],
  );

  const handleSuccess = useCallback((savedDraft: TravelerPublic) => {
    console.log("Saved:", savedDraft);
  }, []);

  const { status, init } = useAutoSave(
    draft,
    saveTravelerData,
    handleSuccess,
    1000,
  );

  useEffect(() => {
    if (traveler.id === 0) {
      dispatch(fetchTravelerThunk({ traveler_id: Number(traveler_id) }));
    }
  }, []);

  useEffect(() => {
    // console.log("traveler in useEffect in TravelerPage", traveler);
    // console.log("draft in useEffect in TravelerPage", draft);

    // if the traveler has been fully loaded and the draft is empty
    if (!traveler.isLoading && traveler.id !== 0 && !draft) {
      // initialize the draft data
      const normalizedData: TravelerPublic = {
        name: traveler.name,
        traveler_type: traveler.traveler_type,
        temp_unit: traveler.temp_unit,
        temp_pref: traveler.temp_pref,
        is_active: traveler.is_active,
        user_id: traveler.user_id,
        id: traveler.id,
        trip_ids: traveler.trip_ids,
        is_primary_for_user: traveler.is_primary_for_user ?? false,
        clothing_preference: traveler.clothing_preference,
        trip_travelers: traveler.trip_travelers,
      };
      setDraft(normalizedData);
      init(normalizedData);
    }
  }, [traveler, draft, init]);

  console.log(traveler);
  // if (!didInit.current && !traveler.isLoading && traveler.id !== 0) {
  //   didInit.current = true;
  //   const normalizedData: TravelerPublic = {
  //     name: traveler.name,
  //     traveler_type: traveler.traveler_type,
  //     temp_unit: traveler.temp_unit,
  //     temp_pref: traveler.temp_pref,
  //     is_active: traveler.is_active,
  //     user_id: traveler.user_id,
  //     id: traveler.id,
  //     trip_ids: traveler.trip_ids,
  //     is_primary_for_user: traveler.is_primary_for_user,
  //   };
  //   setDraft(normalizedData);
  //   init(normalizedData);
  // }

  const convertTemps = (
    toUnit: (typeof TemperatureUnit)[keyof typeof TemperatureUnit],
  ) => {
    if (toUnit === draft?.temp_unit) return;

    // get current temps from json
    const { hot, cold, cool, warm } = JSON.parse(draft!.temp_pref!);

    // transform all values

    // set back to json
    const newJSON = JSON.stringify({
      cold: convertTemperatures(cold, toUnit),
      cool: convertTemperatures(cool, toUnit),
      warm: convertTemperatures(warm, toUnit),
      hot: convertTemperatures(hot, toUnit),
    });
    // set state
    if (!draft) return;
    const newData = { ...draft, temp_unit: toUnit, temp_pref: newJSON };
    setDraft(newData);
  };

  // console.log("draft in travelerPage", draft);
  // console.log("traveler", traveler);

  if (isLoading) {
    return <>loading</>;
  }

  if (error) {
    return <>error</>;
  }

  return (
    <div className="trip-planner-container">
      <SaverBar status={status} />
      <section className="trav-modal-section">
        <label className="trav-modal-section-label" htmlFor="traveler-name">
          Traveler Name:
        </label>
        <p className="trav-modal-section-desc">
          Enter the full name of this traveler.
        </p>
        <input
          id="traveler-name"
          type="text"
          value={draft?.name ?? ""}
          onChange={(e) =>
            setDraft((prev) =>
              prev ? { ...prev, name: e.target.value } : null,
            )
          }
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
              className={`traveler-type-btn ${draft?.traveler_type === type ? "selected" : ""}`}
              onClick={() =>
                setDraft((prev) =>
                  prev ? { ...prev, traveler_type: type } : null,
                )
              }
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
              className={`unit-toggle-btn ${draft?.temp_unit === TemperatureUnit.CELSIUS ? "selected" : ""}`}
              onClick={() => convertTemps(TemperatureUnit.CELSIUS)}
              type="button"
              aria-pressed={draft?.temp_unit === TemperatureUnit.CELSIUS}
            >
              C
            </button>
            <button
              className={`unit-toggle-btn ${draft?.temp_unit === TemperatureUnit.FAHRENHEIT ? "selected" : ""}`}
              onClick={() => convertTemps(TemperatureUnit.FAHRENHEIT)}
              type="button"
              aria-pressed={draft?.temp_unit === TemperatureUnit.FAHRENHEIT}
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
          temperaturePreferences={
            draft?.temp_pref ? JSON.parse(draft.temp_pref) : {}
          }
          tempUnit={draft?.temp_unit ?? TemperatureUnit.FAHRENHEIT}
          onChange={(newTemps) =>
            setDraft((prev) =>
              prev ? { ...prev, temp_pref: JSON.stringify(newTemps) } : null,
            )
          }
        />
      </section>
      <ClothingPreferenceEditSection
        clothingPrefs={draft?.clothing_preference || null}
        travelerType={draft?.traveler_type || "adult"}
      />

      {/* Routines */}
      {/*  <section className="trav-modal-section">
        <div className="trav-modal-section-heading-row">
          <h4 className="trav-modal-section-heading">
            Routines associated with this traveler:
          </h4>
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
           {traveler.map((routine, i) => (
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
            ))} 
        </div>
      </section>*/}
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
    </div>
  );
}
