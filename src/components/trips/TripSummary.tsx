import { formatShortDate, calculateNights } from "../../utils/trips";

import "./styles/tripSummary.css";

type TripSummaryProps = {
  name: string;
  arrival_date?: string | null;
  departure_date?: string | null;
  updated_at?: string | null;
  created_at?: string | null;
};

export default function TripSummary({
  name,
  arrival_date,
  departure_date,
  updated_at,
  created_at,
}: TripSummaryProps) {
  const nights = calculateNights(arrival_date, departure_date);

  return (
    <div className="trip-summary">
      <div className="trip-summary-header">
        <h1 className="trip-summary-title">{name}</h1>
        <span> Last updated: {updated_at}</span>
        <span> Created at: {created_at}</span>

        <span> </span>
        <div className="trip-summary-meta">
          <span className="trip-summary-nights">{nights} nights</span>
          <div className="trip-summary-dates">
            <span className="trip-summary-date">
              <span className="trip-summary-date-label">Depart</span>
              <span className="trip-summary-date-value">
                {formatShortDate(arrival_date)}
              </span>
            </span>
            <span className="trip-summary-date-separator">–</span>
            <span className="trip-summary-date">
              <span className="trip-summary-date-label">Return</span>
              <span className="trip-summary-date-value">
                {formatShortDate(departure_date)}
              </span>
            </span>
          </div>
        </div>
      </div>
      <div>{/* TODO: wire forecastTrip from TripDetailData */}</div>
    </div>
  );
}
