import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
import AddTripActivities from "./AddTripActivities";
import "./styles/tripDetail.css";
import LoadingDots from "../basic/loading";
import destinations from "../../services/destinations";
import type { DestinationPublic } from "../../types/destinations";
import { generatePackingListThunk } from "../../state/packingListSlice";
import {
  ActivityContextTags,
  ActivityIndoorLocationTags,
  ActivityOutdoorLocationTags,
} from "../../enums/enums";
import type { ActivityPublic } from "../../types/activities";
import type { GeneratePackingListPayload } from "../../types/packingLists";
import { selectActivities } from "../../state/activitySlice";

export default function TripPage() {
  const { trip_id } = useParams<{ trip_id: string }>();
  const navigate = useNavigate();
  const trip = useAppSelector(selectTrip);
  const error = useAppSelector(selectTripsError);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const user_id = user?.id ?? 1;
  const isLoading = useAppSelector(selectTripsIsLoading);
  const activities = useAppSelector(selectActivities);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedActivityIds, setSelectedActivityIds] = useState<number[]>([]);

  useEffect(() => {
    if (trip.id === 0) {
      dispatch(loadTripThunk({ trip_id: Number(trip_id), user_id }));
    }
  }, []);

  const handleMakeList = async () => {
    const context_tags = selectedTags.filter((tag) =>
      (Object.values(ActivityContextTags) as string[]).includes(tag),
    );
    const indoor_tags = selectedTags.filter((tag) =>
      (Object.values(ActivityIndoorLocationTags) as string[]).includes(tag),
    );
    const outdoor_tags = selectedTags.filter((tag) =>
      (Object.values(ActivityOutdoorLocationTags) as string[]).includes(tag),
    );

    const selectedActivities = activities.filter((a: ActivityPublic) =>
      selectedActivityIds.includes(a.id),
    );
    const selected_activity_keys = selectedActivities.map((a) => a.key);

    const traveler_ids =
      trip.travelers?.map((t) => t.id).filter((id): id is number => id !== undefined) ??
      [];

    const payload: GeneratePackingListPayload = {
      trip_id: Number(trip_id),
      category_details: {
        context_tags,
        indoor_tags,
        outdoor_tags,
        selected_activities: selected_activity_keys,
        traveler_ids,
      },
    };

    const result = await dispatch(generatePackingListThunk(payload));
    if (generatePackingListThunk.fulfilled.match(result)) {
      navigate(`/trips/${trip_id}/lists/all`);
    }
  };

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
        arrival_date={trip.destinations?.[0]?.arrival_date ?? trip.arrival_date}
        departure_date={
          trip.destinations?.[destinations.length]?.departure_date ??
          trip.departure_date
        }
        trip={trip}
      />
      <TravelersSection tripId={trip_id ? Number(trip_id) : 0} />
      <button type="button" onClick={handleMakeList}>
        Make List
      </button>
      <AddTripActivities
        selectedTags={selectedTags}
        selectedActivityIds={selectedActivityIds}
        onTagsChange={setSelectedTags}
        onActivityIdsChange={setSelectedActivityIds}
      />
      <div className="destinations-section">
        <h2 className="section-title">Destinations</h2>
        <div className="destinations-list">
          {trip.destinations &&
            trip.destinations.map(
              (destination: DestinationPublic, index: number) => (
                <DestinationSummaryCard
                  key={destination.id}
                  destination={destination}
                  forecast={
                    trip?.forecast_trip?.forecast_destinations[index] || null
                  }
                />
              ),
            )}
        </div>
      </div>
    </div>
  );
}
