import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { selectCurrentUser } from "../../state/appSlice";
import {
  loadTripById,
  selectTripDetailById,
  selectTripsStatus,
} from "../../state/tripSlice";
// import { getTripById, mapTripPublicToDetail } from "../../services/trips";
import TripSummary from "./TripSummary";
import DestinationSummaryCard from "./DestinationSummaryCard";
import TravelersSection from "./TravelersSection";
import TravelerEditModal from "../traveler/modals/editTravelerModal/TravelerEditModal";
import "./styles/tripDetail.css";
import LoadingDots from "../basic/loading";

export default function TripPage() {
  const { tripId } = useParams<{ tripId: string }>();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const userId = user?.id ?? 1;
  const [travelerModalOpen, setTravelerModalOpen] = useState(false);

  const tripData = {};
  const status = useAppSelector(selectTripsStatus);

  useEffect(() => {
    if (tripId) {
      dispatch(loadTripById({ tripId, userId }));
    }
  }, [dispatch, tripId, userId]);

  if (!tripData && status === "loading") {
    return (
      <div className="trip-detail-page">
        <div className="trip-detail-loading">
          <LoadingDots />
        </div>
      </div>
    );
  }

  // Show error ONLY if we have no cached data AND we failed
  if (!tripData && status === "failed") {
    return (
      <div className="trip-detail-page">
        <div className="error-banner">Failed to load trip</div>
      </div>
    );
  }

  // If we have cached data, render it immediately (even if refreshing in background)
  if (!tripData) {
    return (
      <div className="trip-detail-page">
        <div className="error-banner">Trip not found</div>
      </div>
    );
  }

  return (
    <div className="trip-detail-page">
      <TripSummary {...tripData} />

      <TravelersSection
        travelers={tripData.travelers}
        onAddTraveler={() => setTravelerModalOpen(true)}
      />

      <div className="destinations-section">
        <h2 className="section-title">Destinations</h2>
        <div className="destinations-list">
          {tripData.destinations.map((destination, index) => (
            <DestinationSummaryCard
              key={destination.id}
              destination={destination}
              index={index}
            />
          ))}
        </div>
      </div>

      <TravelerEditModal
        open={travelerModalOpen}
        title="Add Traveler"
        onClose={() => setTravelerModalOpen(false)}
      />
    </div>
  );
}
