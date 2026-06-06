import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// import { api } from "../../services/api"; // TODO: enable when backend endpoint is ready
import { type TripDetailData } from "../../types/trip";
import TripSummary from "./TripSummary";
import DestinationSummaryCard from "./DestinationSummaryCard";
import TravelersSection from "./TravelersSection";
import TravelerEditModal from "../modals/travelerEdit/TravelerEditModal";
import "./styles/tripDetail.css";

const mockTripData: TripDetailData = {
  trip: {
    id: "1",
    name: "Summer in Paris",
    start_date: "2026-06-15",
    end_date: "2026-06-22",
    updated_at: "2026-01-01T00:00:00Z",
    created_at: "2026-01-01T00:00:00Z",
  },
  overallDayWeather: {
    highTemp: 78,
    lowTemp: 53,
    conditions: ["sunny", "partly_cloudy"],
  },
  overallNightWeather: {
    highTemp: 68,
    lowTemp: 42,
    conditions: ["clear", "rainy"],
  },
  destinations: [
    {
      id: "1",
      name: "Paris",
      location: "Paris, France",
      arrivalDate: "2026-06-15",
      departureDate: "2026-06-22",
      dayWeather: {
        highTemp: 89,
        lowTemp: 65,
        conditions: ["sunny"],
      },
      nightWeather: {
        highTemp: 62,
        lowTemp: 43,
        conditions: ["clear"],
      },
      sunrise: "8:15am UTC",
      sunset: "6:15pm UTC",
      dailyWeather: [
        {
          date: "2026-06-15",
          highTemp: 85,
          lowTemp: 62,
          conditions: ["sunny"],
        },
        {
          date: "2026-06-16",
          highTemp: 88,
          lowTemp: 64,
          conditions: ["sunny", "partly_cloudy"],
        },
        {
          date: "2026-06-17",
          highTemp: 90,
          lowTemp: 66,
          conditions: ["partly_cloudy"],
        },
        {
          date: "2026-06-18",
          highTemp: 87,
          lowTemp: 63,
          conditions: ["cloudy", "rainy"],
        },
        {
          date: "2026-06-19",
          highTemp: 82,
          lowTemp: 60,
          conditions: ["rainy"],
        },
        {
          date: "2026-06-20",
          highTemp: 86,
          lowTemp: 61,
          conditions: ["partly_cloudy", "sunny"],
        },
        {
          date: "2026-06-21",
          highTemp: 91,
          lowTemp: 67,
          conditions: ["sunny"],
        },
      ],
    },
  ],
  travelers: [
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
  ],
};

function calculateNights(start: string, end: string): number {
  const d1 = new Date(start);
  const d2 = new Date(end);
  const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}

export default function TripDetailPage() {
  const { tripId } = useParams<{ tripId: string }>();
  const [tripData, setTripData] = useState<TripDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [travelerModalOpen, setTravelerModalOpen] = useState(false);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        // For now use mock data. Replace with actual API call when backend is ready.
        // const response = await api.request(`/trips/${tripId}`);
        // if (!response.ok) throw new Error("Failed to fetch trip");
        // const data = await response.json();
        // setTripData(data);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        setTripData(mockTripData);
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
          <div className="loading-dots">
            <span className="loading-dot" />
            <span className="loading-dot" />
            <span className="loading-dot" />
          </div>
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

  const totalNights = calculateNights(
    tripData.trip.start_date,
    tripData.trip.end_date,
  );

  return (
    <div className="trip-detail-page">
      <TripSummary
        tripName={tripData.trip.name}
        totalNights={totalNights}
        departDate={tripData.trip.start_date}
        returnDate={tripData.trip.end_date}
        dayWeather={tripData.overallDayWeather}
        nightWeather={tripData.overallNightWeather}
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

      <TravelersSection
        travelers={tripData.travelers}
        onAddTraveler={handleAddTraveler}
      />

      <TravelerEditModal
        open={travelerModalOpen}
        title="Add Traveler"
        onClose={() => setTravelerModalOpen(false)}
      />
    </div>
  );
}
