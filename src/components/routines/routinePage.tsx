import "./styles/RoutineEdit.css";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks.ts";
import {
  selectRoutine,
  fetchRoutineThunk,
  selectLoading,
  selectError,
  updateRoutineThunk,
} from "../../state/routineSlice.ts";
// import ClothingPreferenceSection from "./clothingPreferences/ClothingPreferenceSection.tsx";
import { useParams } from "react-router";
import { type RoutinePublic } from "../../types/routine.ts";
import { useAutoSave } from "../../hooks/useAutoSave.ts";
import SaverBar from "../basic/saverBar.tsx";

export default function RoutinePage() {
  const { routine_id } = useParams<{ routine_id: string }>();
  const routine = useAppSelector(selectRoutine);
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);
  const isLoading = useAppSelector(selectLoading);

  const [draft, setDraft] = useState<RoutinePublic | null>(null); // local form state
  // const didInit = useRef(false);
  const saveRoutineData = useCallback(
    async (submittedData: RoutinePublic) => {
      console.log("saveRoutineData:", submittedData);
      const dataToSubmit = {
        id: Number(routine_id),
        payload: {
          name: submittedData.name,
          created_at: submittedData.created_at,
          updated_at: new Date(),
          id: routine.id,
          description: submittedData.description,
          includes_hair_care: submittedData.includes_hair_care,
          includes_skin_care: submittedData.includes_skin_care,
          includes_body_care: submittedData.includes_body_care,
          includes_hygiene: submittedData.includes_hygiene,
          includes_nail_care: submittedData.includes_nail_care,
          includes_makeup: submittedData.includes_makeup,
          includes_makeup_tools: submittedData.includes_makeup_tools,
          includes_fragrance: submittedData.includes_fragrance,
          includes_feminine_hygiene: submittedData.includes_feminine_hygiene,
          is_master_from_template: submittedData.is_master_from_template,
          creator_id: submittedData.creator_id,
          parent_routine_id: submittedData.parent_routine_id,
          routine_steps: submittedData.routine_steps,
          travelers: submittedData.travelers,
          traveler_id: submittedData.traveler_id,
          trip_travelers: submittedData.trip_travelers,
        },
      };

      const result = await dispatch(updateRoutineThunk(dataToSubmit)).unwrap();
      return result;
    },
    [dispatch],
  );

  const handleSuccess = useCallback((savedDraft: RoutinePublic) => {
    console.log("Saved:", savedDraft);
  }, []);

  const { status, init } = useAutoSave(
    draft,
    saveRoutineData,
    handleSuccess,
    1000,
  );

  useEffect(() => {
    if (routine.id === 0) {
      dispatch(fetchRoutineThunk({ routine_id: Number(routine_id) }));
    }
  }, []);

  useEffect(() => {
    // console.log("routine in useEffect in RoutinePage", routine);
    // console.log("draft in useEffect in RoutinePage", draft);

    // if the routine has been fully loaded and the draft is empty
    if (!routine.isLoading && routine.id !== 0 && !draft) {
      // initialize the draft data
      const normalizedData: RoutinePublic = {
        name: routine.name,
        created_at: routine.created_at,
        updated_at: routine.updated_at,
        id: routine.id,
        description: routine.description,
        includes_hair_care: routine.includes_hair_care,
        includes_skin_care: routine.includes_skin_care,
        includes_body_care: routine.includes_body_care,
        includes_hygiene: routine.includes_hygiene,
        includes_nail_care: routine.includes_nail_care,
        includes_makeup: routine.includes_makeup,
        includes_makeup_tools: routine.includes_makeup_tools,
        includes_fragrance: routine.includes_fragrance,
        includes_feminine_hygiene: routine.includes_feminine_hygiene,
        is_master_from_template: routine.is_master_from_template,
        creator_id: routine.creator_id,
        parent_routine_id: routine.parent_routine_id,
        routine_steps: routine.routine_steps,
        travelers: routine.travelers,
        traveler_id: routine.traveler_id,
        trip_travelers: routine.trip_travelers,
      };
      setDraft(normalizedData);
      init(normalizedData);
    }
  }, [routine, draft, init]);

  // console.log("draft in routinePage", draft);
  // console.log("routine", routine);

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
        <label className="trav-modal-section-label" htmlFor="routine-name">
          Routine Name:
        </label>
        <p className="trav-modal-section-desc">
          Enter the full name of this routine.
        </p>
        <input
          id="routine-name"
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

      {/* <ClothingPreferenceSection /> */}

      {/* Routines */}
      <section className="trav-modal-section">
        <div className="trav-modal-section-heading-row">
          <h4 className="trav-modal-section-heading">
            Routines associated with this routine:
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
      </section>
    </div>
  );
}
