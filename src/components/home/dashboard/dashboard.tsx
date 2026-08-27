import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { type RoutineSimple } from "../../../types/routine";
import type { TravelerSimple } from "../../../types/traveler";
import type { TripSimple } from "../../../types/trip";
import TravelerEditModal from "../../traveler/modals/editTravelerModal/TravelerEditModal";
import TripSection from "./TripSection";
import "./styles/dashboard.css";
import TravelerSection from "./TravelerSection";
import { getUserDashboard } from "../../../services/user";
function SectionLink({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  return (
    <button
      className="dashboard-section-title"
      onClick={() => navigate("/dashboard")}
      type="button"
    >
      {children}
    </button>
  );
}
// adding a comment, wow
export default function Dashboard() {
  const { user } = useAuth();
  const userId = user?.id ?? 1;
  const displayName = user?.name ?? user?.email?.split("@")[0] ?? "there";
  const [travelerModalOpen, setTravelerModalOpen] = useState(false);
  const [routineModalOpen, setRoutineModalOpen] = useState(false);
  const [routines, setRoutines] = useState<RoutineSimple[]>([]);
  const [travelers, setTravelers] = useState<TravelerSimple[]>([]);
  const [trips, setTrips] = useState<TripSimple[]>([]);

  const [editingRoutineId, setEditingRoutineId] = useState<string | null>(null);

  useEffect(() => {
    getUserDashboard(userId)
      .then((data) => {
        if (data && data.routines) {
          setRoutines(data.routines);
        }
        if (data && data.travelers) {
          setTravelers(data.travelers);
        }
        if (data && data.trips) {
          setTrips(data.trips);
        }
      })
      .catch((err) => console.error("Failed to load user dashboard:", err));
  }, []);

  return (
    <div className="dashboard">
      <h1 className="dashboard-welcome">Welcome {displayName}!</h1>

      <div className="dashboard-grid">
        <TripSection />

        {/* Travelers */}
        <TravelerSection />

        {/* Routines */}
        <div className="dashboard-section">
          <SectionLink>Routines</SectionLink>
          <div className="dashboard-section-body">
            {routines.map((routine) => (
              <button
                key={routine.id}
                className="dashboard-list-item dashboard-list-clickable"
                onClick={() => {
                  setEditingRoutineId(routine.id);
                  setRoutineModalOpen(true);
                }}
                type="button"
              >
                <span className="dashboard-icon-star">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    width="16"
                    height="16"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </span>
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
        </div>
        {/* <DestinationsSection /> */}
      </div>

      <TravelerEditModal
        open={travelerModalOpen}
        title={"Edit Traveler"}
        onClose={() => setTravelerModalOpen(false)}
      />

      <TravelerEditModal
        key={editingRoutineId ?? "new"}
        open={routineModalOpen}
        title="Edit Routine"
        onClose={() => setRoutineModalOpen(false)}
      />
    </div>
  );
}
