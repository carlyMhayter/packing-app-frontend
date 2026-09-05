import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { selectCurrentUser } from "../../state/appSlice";
import {
  loadTripThunk,
  selectTripsIsLoading,
  selectTrip,
  selectTripsError,
} from "../../state/tripSlice";
import TripSummary from "./TripSummary";
import DestinationSummaryCard from "./DestinationSummaryCard";
import TravelersSection from "./TravelersSection";

import "./styles/tripDetail.css";
import LoadingDots from "../basic/loading";

export default function TripPage() {
  const { trip_id } = useParams<{ trip_id: string }>();
  const trip = useAppSelector(selectTrip);
  const error = useAppSelector(selectTripsError);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const user_id = user?.id ?? 1;
  const isLoading = useAppSelector(selectTripsIsLoading);

  useEffect(() => {
    if (trip.id === 0) {
      dispatch(loadTripThunk({ trip_id: Number(trip_id), user_id }));
    }
  }, []);

  if (isLoading) {
    return (
      <div className="trip-detail-page">
        <div className="trip-detail-loading">
          <LoadingDots />
        </div>
      </div>
    );
  }

  if (!isLoading && error) {
    return (
      <div className="trip-detail-page">
        <div className="error-banner">Failed to load trip</div>
      </div>
    );
  }
  console.log("trip", trip);
  return (
    <div className="trip-detail-page">
      <TripSummary
        name={trip.name ?? ""}
        arrival_date={trip.arrival_date}
        departure_date={trip.departure_date}
        updated_at={trip.updated_at}
        created_at={trip.created_at}
      />
      <TravelersSection tripId={trip_id ? Number(trip_id) : 0} />

      <div className="destinations-section">
        <h2 className="section-title">Destinations</h2>
        <div className="destinations-list">
          {trip.destinations &&
            trip.destinations.map((destination) => (
              <DestinationSummaryCard
                key={destination.id}
                destination={destination}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
