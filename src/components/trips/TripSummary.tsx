import type { TripPublic, TripPublicState } from "../../types/trip";
import { formatISOtoEasyRead } from "../../utils/formatDates";
import { formatShortDate, calculateNights } from "../../utils/trips";
import OverallConditions from "./OverallConditions";
import "./styles/tripSummary.css";

type TripSummaryProps = {
  name: string;
  arrival_date?: string | null;
  departure_date?: string | null;
  trip: TripPublicState;
};

export default function TripSummary({
  name,
  arrival_date,
  departure_date,
  trip,
}: TripSummaryProps) {
  const nights = calculateNights(arrival_date, departure_date);

  return (
    <div className="trip-summary-header">
      <div className="trip-summary-left">
        <div className="name-and-timestamps">
          <h1 className="trip-summary-title">{name}</h1>
          <div className="trip-summary-timestamps">
            <span>
              Last updated:
              {trip?.updated_at && formatISOtoEasyRead(trip?.updated_at)}
            </span>
            <span>
              Created at:{" "}
              {trip?.created_at && formatISOtoEasyRead(trip?.created_at)}
            </span>
          </div>
        </div>
        <div className="dates-data-container">
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
      {trip.forecast_trip && (
        <OverallConditions forecast_trip={trip?.forecast_trip} />
      )}
    </div>
  );
}
