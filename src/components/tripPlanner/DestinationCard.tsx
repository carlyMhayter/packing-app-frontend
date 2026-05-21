import { useState, useEffect, useRef } from "react";
import ConfirmationModal from "../basic/confirmationModal";
import Calendar from "../basic/calendar";
import { SearchBox } from "@mapbox/search-js-react";
import { formatDisplayDate, nightsBetween } from "./utils/utils";
import { type DestinationCardProps } from "../../types/trip";
import "./styles/tripPlanner.css";
import { theme } from "./styles/theming";

export default function DestinationCard({
  data,
  onChange,
  onRemove,
  onDragStart,
  onDragEnd,
  onDragOver,
  isDragging,
}: DestinationCardProps) {
  const dragHandleActive = useRef(false);
  const [isUserOverride, setIsUserOverride] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editValue, setEditValue] = useState(data.label || "");
  const [isEditing, setIsEditing] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    // TODO: more date validation needed here
    // Recalculate nights from dates unless user has manually overridden
    if (!isUserOverride && (data.departureDate || data.arrivalDate)) {
      const calc = nightsBetween(data.departureDate, data.arrivalDate);
      onChange(data.id, { nights: calc });
    }
  }, [data.departureDate, data.arrivalDate, isUserOverride]);

  const handleFocus = () => {
    setEditValue(data.label);
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    const trimmed = editValue.trim();
    console.log("Handling blur with value:", trimmed);
    if (trimmed === "") {
      onChange(data.id, { label: "" });
    } else {
      onChange(data.id, { label: trimmed });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    }
  };

  const handleNightsChange = (delta: number) => {
    setIsUserOverride(true);
    const next = data.nights + delta;
    if (next <= 0) {
      setShowDeleteModal(true);
      return;
    }
    onChange(data.id, { nights: next });

    // Adjust dates based on the new night count
    // Arrival (left) -> ... nights ... -> Departure (right)
    if (data.arrivalDate) {
      // Fix arrival, push departure forward/backward
    } else if (data.departureDate) {
      // Fix departure, pull arrival forward/backward
    }
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    onRemove(data.id);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleRangeSelect = (start: string, end: string) => {
    setIsUserOverride(false);
    onChange(data.id, { departureDate: start, arrivalDate: end });
  };

  const handleSearchBoxRetrieve = (response) => {
    // console.log("Autofill response:", response);

    if (!response.features || response.features.length == 0) {
      console.warn("No features found in search response");
      return;
    }

    if (!response.features[0].properties || !response.features[0].geometry) {
      console.warn(
        "No properties or geometry found in first feature of search response",
      );
      return;
    }
    const properties = response.features[0].properties;
    const coords = response.features[0].geometry?.coordinates;
    console.log("Extracted properties:", properties.full_address);
    onChange(data.id, {
      addressData: {
        latitude: coords ? coords[1] : 0,
        longitude: coords ? coords[0] : 0,
        mapboxId: response.features[0].id,
        fullName: `${properties.name || ""}, ${properties.full_address}`,
        countryCode: properties.country_code,
        region: properties.region || "",
        district: properties.district || "",
        place: properties.place || "",
        locality: properties.locality || "",
        neighborhood: properties.neighborhood || "",
        street: properties.street || "",
        address: properties.address || "",
        addressNumber: properties.address_number || "",
        addressID: properties.address_id || "",
      },
    });
  };
  // console.log("Rendering data:", data);

  // console.log("Rendering address:", data.addressData?.fullName);
  const openCalendar = () => {
    setShowCalendar(true);
  };

  const handleDragStartLocal = (e: React.DragEvent<HTMLDivElement>) => {
    if (!dragHandleActive.current) {
      e.preventDefault();
      return;
    }
    onDragStart(e);
  };

  const handleDragEndLocal = () => {
    dragHandleActive.current = false;
    onDragEnd();
  };

  return (
    <>
      <div
        className={`destination-card ${isDragging ? "is-dragging" : ""}`}
        draggable={true}
        onDragStart={handleDragStartLocal}
        onDragEnd={handleDragEndLocal}
        onDragOver={onDragOver}
      >
        <div className="destination-card-header">
          <span
            className="drag-handle"
            onPointerDown={() => {
              dragHandleActive.current = true;
            }}
            role="button"
            tabIndex={0}
            aria-label="Drag to reorder"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <circle cx="8" cy="6" r="2" />
              <circle cx="16" cy="6" r="2" />
              <circle cx="8" cy="12" r="2" />
              <circle cx="16" cy="12" r="2" />
              <circle cx="8" cy="18" r="2" />
              <circle cx="16" cy="18" r="2" />
            </svg>
          </span>
          <input
            className="destination-card-label-input"
            value={isEditing ? editValue : data.label || ""}
            onChange={(e) => setEditValue(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            aria-label="Destination name"
            placeholder="New Destination"
          />
          <button
            className="destination-card-remove"
            onClick={() => onRemove(data.id)}
            type="button"
            aria-label="Remove destination"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              width="14"
              height="14"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="destination-card-address">
          <SearchBox
            accessToken={import.meta.env.VITE_MAPBOX_TOKEN}
            theme={theme}
            onRetrieve={handleSearchBoxRetrieve}
            value={data.addressData?.fullName || ""}
          />
        </div>

        <div className="destination-card-dates">
          <div className="destination-date-field">
            <label className="destination-date-label">Arrival</label>
            <button
              className="destination-date-trigger"
              onClick={openCalendar}
              type="button"
            >
              {data.arrivalDate
                ? formatDisplayDate(data.arrivalDate)
                : "Select date..."}
            </button>
          </div>
          <div className="destination-date-divider" />
          <div className="destination-date-field">
            <label className="destination-date-label">Departure</label>
            <button
              className="destination-date-trigger"
              onClick={openCalendar}
              type="button"
            >
              {data.departureDate
                ? formatDisplayDate(data.departureDate)
                : "Select date..."}
            </button>
          </div>

          {showCalendar && (
            <Calendar
              mode="range"
              rangeStart={data.arrivalDate || null}
              rangeEnd={data.departureDate || null}
              onSelectRange={handleRangeSelect}
              onClose={() => setShowCalendar(false)}
            />
          )}
        </div>

        <div className="destination-nights">
          <span className="destination-nights-label">No. of nights:</span>
          <button
            className="destination-nights-btn"
            onClick={() => handleNightsChange(-1)}
            type="button"
            aria-label="Decrease nights"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              width="14"
              height="14"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <span className="destination-nights-value">{data.nights}</span>
          <button
            className="destination-nights-btn"
            onClick={() => handleNightsChange(1)}
            type="button"
            aria-label="Increase nights"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              width="14"
              height="14"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>

      <ConfirmationModal
        open={showDeleteModal}
        title="Delete destination?"
        confirmLabel="Yes"
        cancelLabel="No"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
}
