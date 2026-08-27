import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/dashboard.css";
import { fetchRecentTrips } from "../../../services/trips";
import { type TripPublic } from "../../../types/trip";
import DashboardSection from "./DashboardSection";
import { formatShortDate } from "../../../utils/trips";
import { useAuth } from "../../../contexts/AuthContext";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  loadRecentTrips,
  selectRecentTrips,
  selectTripsStatus,
} from "../../../state/trip/tripSlice";

export default function TripSection() {
  const { user } = useAuth();
  const userId = user?.id ?? 1;
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const trips = useAppSelector((state) => selectRecentTrips(state, 4));
  const status = useAppSelector(selectTripsStatus);

  useEffect(() => {
    dispatch(loadRecentTrips(userId));
  }, [dispatch, userId]);

  if (status === "loading" && trips.length === 0) {
    return (
      <DashboardSection title="Trips">
        <div className="dashboard-section-body">Loading.....</div>
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
  if (status === "failed") {
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
            <span className="trip-section-dates">
              {formatShortDate(trip.arrivalDate)} –{" "}
              {formatShortDate(trip.departDate)}
            </span>
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
