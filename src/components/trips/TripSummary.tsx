import { type TripPublic } from "../../types/trip";
import OverallConditions from "./OverallConditions";
import { formatShortDate } from "../../utils/trips";

import "./styles/tripSummary.css";

export default function TripSummary({
  createdAt,
  destinations,
  forecastTrip,
  departDate,
  name,
  updatedAt,
}: TripPublic) {
  return (
    <div className="trip-summary">
      <div className="trip-summary-header">
        <h1 className="trip-summary-title">{name}</h1>
        <span> Last updated: {updatedAt}</span>
        <span> Created at: {createdAt}</span>

        <span> </span>
        <div className="trip-summary-meta">
          <span className="trip-summary-nights">100 nights</span>
          <div className="trip-summary-dates">
            <span className="trip-summary-date">
              <span className="trip-summary-date-label">Depart</span>
              <span className="trip-summary-date-value">
                {/* {"12/3/25"} */}
                {formatShortDate(departDate)}
              </span>
            </span>
            <span className="trip-summary-date-separator">–</span>
            <span className="trip-summary-date">
              <span className="trip-summary-date-label">Return</span>
              <span className="trip-summary-date-value">
                {/* {"12/3/25"} */}
                {formatShortDate(departDate)}
              </span>
            </span>
          </div>
        </div>
      </div>
      <div>
        <OverallConditions forecastTrip={forecastTrip} />{" "}
        {/* <TravelersSection
          travelers={tripData.travelers}
          onAddTraveler={handleAddTraveler}
        /> */}
      </div>
    </div>
  );
}
