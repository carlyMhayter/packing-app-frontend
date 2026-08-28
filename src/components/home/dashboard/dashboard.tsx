import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { type RoutineSimple } from "../../../types/routine";
// import type { TravelerSimple } from "../../../types/traveler";
// import type { TripSimple } from "../../../types/trip";
// import TravelerEditModal from "../../traveler/modals/editTravelerModal/TravelerEditModal";
import TripSection from "./TripSection";
import "./styles/dashboard.css";
import TravelerSection from "./TravelerSection";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  selectCurrentUser,
  fetchBasicUserDataThunk,
  selectTravelers,
} from "../../../state/appSlice";

// function SectionLink({ children }: { children: React.ReactNode }) {
//   const navigate = useNavigate();
//   return (
//     <button
//       className="dashboard-section-title"
//       onClick={() => navigate("/dashboard")}
//       type="button"
//     >
//       {children}
//     </button>
//   );
// }
// adding a comment, wow
export default function Dashboard() {
  const user = useAppSelector(selectCurrentUser);
  const displayName = user?.first_name ?? user?.email?.split("@")[0] ?? "there";
  // const [travelerModalOpen, setTravelerModalOpen] = useState(false);
  // const [routineModalOpen, setRoutineModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const travelers = useAppSelector(selectTravelers);

  // const [editingRoutineId, setEditingRoutineId] = useState<number | null>(null);

  useEffect(() => {
    if (user?.id) {
      console.log("useEffect");
      dispatch(fetchBasicUserDataThunk({ user_id: user.id }));
    } else {
      return;
    }
  }, [user]);
  console.log(user);
  return (
    <div className="dashboard">
      <h1 className="dashboard-welcome">Welcome {displayName}!</h1>

      <div className="dashboard-grid">
        <TripSection />

        {/* Travelers */}
        <TravelerSection travelers={travelers} />

        {/* Routines */}
        {/* <div className="dashboard-section">
          <SectionLink>Routines</SectionLink>
          <div className="dashboard-section-body">
            {routines.map((routine: RoutineSimple) => (
              <button
                key={routine.id}
                className="dashboard-list-item dashboard-list-clickable"
                onClick={() => {
                  setEditingRoutineId(routine.id);
                  setRoutineModalOpen(true);
                }}
                type="button"
              >

                <span className="dashboard-list-text">{routine.name}</span>
              </button>
            ))}
            <button
              className="dashboard-list-add"
              onClick={() => {
                setEditingRoutineId(null);
                setRoutineModalOpen(true);
              }}
              type="button"
            >
              <span className="dashboard-icon-plus">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  width="14"
                  height="14"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
              <span className="dashboard-list-text">add a routine</span>
            </button>
          </div>
        </div> */}
        {/* <DestinationsSection /> */}
      </div>

      {/* <TravelerEditModal
        open={travelerModalOpen}
        title={"Edit Traveler"}
        onClose={() => setTravelerModalOpen(false)}
      /> */}

      {/* <TravelerEditModal
        key={editingRoutineId ?? "new"}
        open={routineModalOpen}
        title="Edit Routine"
        onClose={() => setRoutineModalOpen(false)}
      /> */}
    </div>
  );
}
