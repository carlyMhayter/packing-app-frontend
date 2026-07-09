import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRecentTrips } from "../../services/trips";
import { type TripPublic } from "../../types/trip";
import LoadingDots from "../basic/loading";
import "./styles/tripDetail.css";

export default function TripsListPage() {
  const [trips, setTrips] = useState<TripPublic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecentTrips(100)
      .then((data) => {
        setTrips(data);
        setIsLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading)
    return (
      <div className="trip-detail-page">
        <div className="trip-detail-loading">
          <LoadingDots />
        </div>
      </div>
    );

  if (error)
    return (
      <div className="trip-detail-page">
        <div className="error-banner">{error}</div>
        <button
          className="btn-main"
          onClick={() => window.location.reload()}
          type="button"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="trip-detail-page">
      <h1 className="section-title">Your Trips</h1>
      {trips.length === 0 ? (
        <div>
          <p>No trips yet — plan your first trip!</p>
          <button
            className="btn-main"
            onClick={() => navigate("/trip_planner")}
            type="button"
          >
            Plan a Trip
          </button>
        </div>
      ) : (
        <div className="destinations-list">
          {trips.map((trip) => (
            <a
              key={trip.id}
              href={`/trips/${trip.id}`}
              className="trip-section-link"
            >
              <span>{trip.name}</span>
              <span>
                {trip.arrivalDate} – {trip.departDate}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
