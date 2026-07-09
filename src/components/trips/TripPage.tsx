import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { type TripDetailData } from "../../types/trip";
import { getTripById, mapTripPublicToDetail } from "../../services/trips";
import TripSummary from "./TripSummary";
import DestinationSummaryCard from "./DestinationSummaryCard";
import TravelersSection from "./TravelersSection";
import TravelerEditModal from "../modals/travelerEdit/TravelerEditModal";
import "./styles/tripDetail.css";
import LoadingDots from "../basic/loading";

export default function TripPage() {
  const { tripId } = useParams<{ tripId: string }>();
  const [tripData, setTripData] = useState<TripDetailData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [travelerModalOpen, setTravelerModalOpen] = useState(false);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const publicTrip = await getTripById(tripId!);
        setTripData(mapTripPublicToDetail(publicTrip));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load trip");
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [tripId]);

  const handleAddTraveler = () => {
    setTravelerModalOpen(true);
  };

  if (loading) {
    return (
      <div className="trip-detail-page">
        <div className="trip-detail-loading">
          <LoadingDots />
        </div>
      </div>
    );
  }

  if (error || !tripData) {
    return (
      <div className="trip-detail-page">
        <div className="error-banner">{error || "Trip not found"}</div>
      </div>
    );
  }

  return (
    <div className="trip-detail-page">
      <TripSummary {...tripData} />

      <TravelersSection
        travelers={tripData.travelers}
        onAddTraveler={handleAddTraveler}
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
