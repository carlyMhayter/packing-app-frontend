import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Tooltip from "../../basic/tooltip";
import DestinationCard from "./DestinationCard";
import "./styles/tripPlanner.css";
import {
  type CreateDestinationData,
  type DestinationUpdate,
} from "../../../types/trip";
import {
  getDateinYYYYMMDD,
  addDays,
  validateTrip,
} from "../../../utils/trips.js";
function getAutoLabel(index: number, total: number): string {
  if (total === 1) return "Starting Destination";
  if (index === 0) return "Starting Destination";
  if (index === total - 1) return "Ending Destination";
  return "Destination";
}
import { createTrip } from "../../../services/trips";
import LoadingDots from "../../basic/loading";

export default function TripPlanner() {
  const [tripName, setTripName] = useState("");
  const [destinations, setDestinations] = useState<CreateDestinationData[]>([]);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const navigate = useNavigate();

  const addDestination = () => {
    const id = `dest-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const currentDate = getDateinYYYYMMDD(new Date());
    const newDestination: CreateDestinationData = {
      arrivalDate: currentDate,
      departureDate: addDays(currentDate, 1),
      nights: 1,
      id,
      label: "",
      order: destinations.length,
      laundry: null,
    };
    setDestinations((prev) => [...prev, newDestination]);
  };

  const removeDestination = (id: string) => {
    setDestinations((prev) => prev.filter((d) => d.id !== id));
  };

  const handleOnChange = (id: string, value: DestinationUpdate | null) => {
    setDestinations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...value } : d)),
    );
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number,
  ) => {
    e.dataTransfer.setData("text/plain", String(index));
    e.dataTransfer.effectAllowed = "move";
    setDraggingId(destinations[index].id);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number,
  ) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    const rect = e.currentTarget.getBoundingClientRect();
    const midpoint = rect.top + rect.height / 2;
    const dropIndex = e.clientY < midpoint ? index : index + 1;
    setDragOverIndex(dropIndex);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dragIndex = Number(e.dataTransfer.getData("text/plain"));
    if (
      dragOverIndex === null ||
      dragOverIndex === dragIndex ||
      dragOverIndex === dragIndex + 1
    ) {
      setDraggingId(null);
      setDragOverIndex(null);
      return;
    }

    setDestinations((prev) => {
      const newDestinations = [...prev];
      const [removed] = newDestinations.splice(dragIndex, 1);
      const adjustedIndex =
        dragOverIndex > dragIndex ? dragOverIndex - 1 : dragOverIndex;
      newDestinations.splice(adjustedIndex, 0, removed);
      return newDestinations;
    });

    setDraggingId(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    setDragOverIndex(null);
  };

  const handleSave = async () => {
    setIsSaving(true);

    const errors = validateTrip(destinations);
    if (errors.length > 0) {
      setSaveError(
        `Please fix the following errors:\n- ${errors.join("\n- ")}`,
      );
      setIsSaving(false);
      return;
    }

    const destinationsPayload = destinations.map((dest, index: number) => ({
      user_id: 2,
      destination_name: dest.label,
      arrival_date: dest.arrivalDate,
      departure_date: dest.departureDate,
      nights: dest.nights,
      has_laundry: dest.laundry === "yes",
      label: dest.label,
      address: dest.addressData,
      order: index,
    }));

    const tripNameToUse =
      tripName !== ""
        ? tripName
        : `My Trip - ${new Date().toLocaleDateString()}`;

    const payload = {
      name: tripNameToUse,
      user_id: 2,
      destinations: destinationsPayload,
    };

    console.log("Payload to save:", payload);

    try {
      const created = await createTrip(payload);
      navigate(`/trips/${created.id}`);
    } catch (err) {
      setSaveError(
        err instanceof Error
          ? err.message
          : "Failed to save trip. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const renderDropIndicator = (slotIndex: number) => {
    if (draggingId === null || dragOverIndex !== slotIndex) return null;
    return (
      <div
        key={`drop-${slotIndex}`}
        className="drop-indicator"
        aria-hidden="true"
      />
    );
  };

  return (
    <div className="trip-planner-container">
      <div className="trip-planner-top-bar">
        <div className="trip-planner-header">
          <label className="trip-name-label" htmlFor="trip-name">
            TRIP NAME:
          </label>
          <input
            id="trip-name"
            type="text"
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
            className="trip-name-input"
            placeholder="My Trip"
          />
        </div>
        <button
          className="btn-main trip-planner-save-btn"
          onClick={handleSave}
          disabled={isSaving}
          type="button"
        >
          {isSaving ? <LoadingDots /> : "Next >>"}
        </button>
      </div>
      {saveError && (
        <div className="error-banner trip-planner-save-error">
          Error: {saveError}
        </div>
      )}

      <div className="trip-planner-add-row">
        <div className="trip-planner-add-col">
          <Tooltip content="Add a destination" position="top">
            <button
              className="trip-planner-plus-btn"
              onClick={() => addDestination()}
              type="button"
              aria-label="Add a location"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                width="20"
                height="20"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </Tooltip>
          <span className="trip-planner-add-label">Add a location</span>
        </div>
      </div>

      <div
        className="trip-planner-cards"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {destinations.map((dest, index) => (
          <div key={dest.id} className="trip-planner-card-wrapper">
            {renderDropIndicator(index)}
            <DestinationCard
              id={dest.id}
              label={dest.label ?? getAutoLabel(index, destinations.length)}
              isAutoLabel={dest.label === null}
              onChange={handleOnChange}
              onRemove={removeDestination}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOver(e, index)}
              isDragging={draggingId === dest.id}
              data={dest}
            />
          </div>
        ))}
        {renderDropIndicator(destinations.length)}
      </div>
    </div>
  );
}
