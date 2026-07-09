import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/dashboard.css";
import { fetchRecentTrips } from "../../../services/trips";
import { type Trip } from "../../../types/trip";
import DashboardSection from "./DashboardSection";

export default function TripSection() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecentTrips(4)
      .then((response: any) => {
        setTrips(response);
        setIsLoading(false);
      })
      .catch((err: Error) => console.error(err));
  }, []);

  if (isLoading) {
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

  if (trips.length > 0) {
    return (
      <DashboardSection title="Trips">
        <h3 className="upcoming-trips">Upcoming Trips</h3>
        {trips.map((trip, index) => (
          <a
            key={`${index}-trip-link`}
            href={`/trips/${trip.id}`}
            className="trip-section-link"
          >
            {trip.name}
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
  } else {
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
}
