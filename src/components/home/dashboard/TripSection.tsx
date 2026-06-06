import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/dashboard.css";
import { SectionLink } from "./SectionLink";
import { fetchRecentTrips } from "../../../services/trips";
import { type Trip } from "../../../types/trip";

export default function TripSection() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRecentTrips(5)
      .then((response: Any) => {
        console.log("Fetched trips:", response);
        setTrips(response);
        setIsLoading(false);
      })
      .catch((err: Error) => console.error(err));
  }, []);

  if (isLoading) {
    return (
      <div className="dashboard-section">
        <SectionLink>Trips</SectionLink>
        <div className="dashboard-section-body">Loading.....</div>
      </div>
    );
  }
  console.log("Trips to display:", trips);
  console.log("Trips length:", trips.length);
  console.log("Trips isLoading:", isLoading);

  if (trips.length > 0) {
    return (
      <div className="dashboard-section">
        <SectionLink>Trips</SectionLink>
        <div className="dashboard-section-body">
          {trips.map((trip, index) => (
            <a
              key={`${index}-trip-link`}
              href={`/trips/${trip.id}`}
              className="trip-section-link"
            >
              {trip.name}
            </a>
          ))}
          <button
            className="dashboard-add-btn"
            onClick={() => navigate("/trip_planner")}
            aria-label="Plan a new trip"
            type="button"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="dashboard-section">
        <SectionLink>Trips</SectionLink>
        <div className="dashboard-section-body">
          <p className="dashboard-empty-line">No trips yet!</p>
          <p className="dashboard-empty-line">Let&apos;s get started!</p>
          <button
            className="dashboard-add-btn"
            onClick={() => navigate("/trip_planner")}
            aria-label="Plan a new trip"
            type="button"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
}
