import { type TripPublic } from "../../types/trip";
import { formatShortDate, calculateNights } from "../../utils/trips";

import "./styles/tripSummary.css";

export default function TripSummary({ ...trip }: TripPublic) {
  const nights = calculateNights(trip.arrival_date, trip.departure_date);

  return (
    <div className="trip-summary">
      <div className="trip-summary-header">
        <h1 className="trip-summary-title">{trip.name}</h1>
        <span> Last updated: {trip.updated_at}</span>
        <span> Created at: {trip.created_at}</span>

        <span> </span>
        <div className="trip-summary-meta">
          <span className="trip-summary-nights">{nights} nights</span>
          <div className="trip-summary-dates">
            <span className="trip-summary-date">
              <span className="trip-summary-date-label">Depart</span>
              <span className="trip-summary-date-value">
                {formatShortDate(trip.arrival_date)}
              </span>
            </span>
            <span className="trip-summary-date-separator">–</span>
            <span className="trip-summary-date">
              <span className="trip-summary-date-label">Return</span>
              <span className="trip-summary-date-value">
                {formatShortDate(trip.departure_date)}
              </span>
            </span>
          </div>
        </div>
      </div>
      <div>{/* TODO: wire forecastTrip from TripDetailData */}</div>
    </div>
  );
}
