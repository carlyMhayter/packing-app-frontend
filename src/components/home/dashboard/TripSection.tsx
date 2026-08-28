import { useNavigate } from "react-router-dom";
import "./styles/dashboard.css";
import DashboardSection from "./DashboardSection";
// import { formatShortDate } from "../../../utils/trips";
import { useAppSelector } from "../../../hooks/reduxHooks";

import {
  selectAuthError,
  selectAuthLoading,
  // selectCurrentUser,
  selectTrips,
} from "../../../state/appSlice";

export default function TripSection() {
  // const user = useAppSelector(selectCurrentUser);
  const trips = useAppSelector(selectTrips);
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <DashboardSection title="Trips">
        <div className="dashboard-section-body">Loading.....</div>
        <div className="dashboard-section-footer"></div>
      </DashboardSection>
    );
  }
  console.log("trips:", trips);
  if (!isLoading && trips.length === 0) {
    return (
      <DashboardSection title="Trips">
        <div className="dashboard-section-body">
          {trips.map((trip) => (
            <p>{trip.name}</p>
          ))}
        </div>
        <div className="dashboard-section-footer">
          <button
            className="sci-btn"
            onClick={() => navigate("/trip_planner")}
            type="button"
          >
            + Add New Trip
          </button>
        </div>
      </DashboardSection>
    );
  }

  // Error state
  if (error) {
    return (
      <DashboardSection title="Trips">
        <div className="dashboard-section-body">
          <p className="dashboard-error">Failed to load trips.</p>
        </div>
        <div className="dashboard-section-footer">
          <button
            className="sci-btn"
            onClick={() => navigate("/trip_planner")}
            type="button"
          >
            + Add New Trip
          </button>
        </div>
      </DashboardSection>
    );
  }

  // Data state
  if (trips.length > 0) {
    return (
      <DashboardSection title="Trips">
        <h3 className="upcoming-trips">Upcoming Trips</h3>
        {trips.map((trip) => (
          <a
            key={trip.id}
            href={`/trips/${trip.id}`}
            className="trip-section-link"
          >
            <span className="trip-section-name">{trip.name}</span>
            {/* <span className="trip-section-dates">
              {formatShortDate(trip.arrivalDate)} –{" "}
              {formatShortDate(trip.departDate)}
            </span> */}
          </a>
        ))}
        <div className="dashboard-section-footer">
          <button
            className="sci-btn"
            onClick={() => navigate("/trip_planner")}
            type="button"
          >
            + Add New Trip
          </button>
          {trips.length >= 4 && (
            <a href="/trips" className="trip-section-see-all">
              See Past Trips
            </a>
          )}
        </div>
      </DashboardSection>
    );
  }

  return (
    <DashboardSection title="Trips">
      <p className="dashboard-empty-line">No trips yet!</p>
      <p className="dashboard-empty-line">Let&apos;s get started!</p>
      <div className="dashboard-section-footer">
        <button
          className="sci-btn"
          onClick={() => navigate("/trip_planner")}
          type="button"
        >
          + Add New Trip
        </button>
      </div>
    </DashboardSection>
  );
}
