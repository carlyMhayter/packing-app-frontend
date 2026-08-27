import { useState, useEffect, useRef } from "react";
import Calendar from "../../basic/calendar";
import Tooltip from "../../basic/tooltip";
import { SearchBox } from "@mapbox/search-js-react";
import {
  formatDisplayDate,
  nightsBetween,
  addDays,
} from "../../../utils/trips.js";
import {
  type DestinationCardProps,
  type DestinationResponse,
} from "../../../types/trip";
import "./styles/tripPlanner.css";
import { theme } from "../../trips/styles/theming";

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
  const [editValue, setEditValue] = useState(data.label || "");
  const [isEditing, setIsEditing] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    // Recalculate nights from dates whenever they change
    if (data.departureDate || data.arrivalDate) {
      const calc = nightsBetween(data.arrivalDate, data.departureDate);
      if (calc !== data.nights) {
        onChange(data.id, { nights: calc });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.departureDate, data.arrivalDate]);

  const handleFocus = () => {
    setEditValue(data.label);
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    const trimmed = editValue.trim();
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

  const handleRangeSelect = (start: string, end: string) => {
    onChange(data.id, { arrivalDate: start, departureDate: end });
  };

  const handleSearchBoxRetrieve = (response: DestinationResponse) => {
    const properties = response.features[0].properties;
    const context = response.features[0].properties.context;
    const country = context.country?.country_code_alpha_3 || "UNK";

    const updatedData = {
      label: properties.name || data.label || "",
      addressData: {
        latitude: properties.coordinates?.latitude
          ? properties.coordinates?.latitude
          : 0,
        longitude: properties.coordinates?.longitude
          ? properties.coordinates?.longitude
          : 0,
        mapbox_id: properties?.mapbox_id || "",
        full_name: `${properties.full_address}`,
        country_id: country,
        region: context.region?.name || "",
        district: context.district?.name || "",
        place: context.place?.name || "",
        locality: context.locality?.name || "",
        neighborhood: context.neighborhood?.name || "",
        street: context.street?.name || "",
        address: context.address?.name || "",
        postcode: context.postcode?.name || "",
      },
    };
    onChange(data.id, updatedData);
  };

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

  const handleLaundryChange = (value: "yes" | "no" | "maybe") => {
    onChange(data.id, { laundry: value });
  };

  const handleNudgeDate = (
    field: "arrivalDate" | "departureDate",
    delta: number,
  ) => {
    const current =
      field === "arrivalDate" ? data.arrivalDate : data.departureDate;
    if (!current) return;
    onChange(data.id, { [field]: addDays(current, delta) });
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
          <label
            className="destination-card-label-label"
            htmlFor="destination-name"
          >
            Destination:
          </label>
          <input
            id="destination-name"
            className="destination-card-label-input"
            value={isEditing ? editValue : data.label || ""}
            onChange={(e) => setEditValue(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            aria-label="Destination name"
            placeholder="New Destination"
          />
          <Tooltip content="Delete destination" position="bottom">
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
          </Tooltip>
        </div>
        <div className="destination-card-address">
          <SearchBox
            accessToken={import.meta.env.VITE_MAPBOX_TOKEN}
            theme={theme}
            onRetrieve={handleSearchBoxRetrieve}
            value={data.addressData?.full_name || ""}
            placeholder="Search for a location or address..."
          />
        </div>

        <div className="destination-dates-row">
          <div className="destination-nights">
            <span className="destination-nights-label">Nights</span>
            <span className="destination-nights-value">{data.nights}</span>
          </div>

          <div className="destination-card-dates">
            <div className="destination-date-trigger-row">
              {/* Left half — Arrival */}
              <div className="destination-date-half" onClick={openCalendar}>
                <span className="destination-date-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="16"
                    height="16"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </span>
                <span
                  className={`destination-date-text ${!data.arrivalDate ? "is-placeholder" : ""}`}
                >
                  {data.arrivalDate
                    ? formatDisplayDate(data.arrivalDate)
                    : "Arrival"}
                </span>
                {data.arrivalDate && (
                  <div className="date-chevron-group">
                    <button
                      className="date-chevron"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNudgeDate("arrivalDate", -1);
                      }}
                      type="button"
                      aria-label="Previous day"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        width="12"
                        height="12"
                      >
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <button
                      className="date-chevron"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNudgeDate("arrivalDate", 1);
                      }}
                      type="button"
                      aria-label="Next day"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        width="12"
                        height="12"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              <div className="destination-date-divider" />

              {/* Right half — Departure */}
              <div className="destination-date-half" onClick={openCalendar}>
                <span
                  className={`destination-date-text ${!data.departureDate ? "is-placeholder" : ""}`}
                >
                  {data.departureDate
                    ? formatDisplayDate(data.departureDate)
                    : "Departure"}
                </span>
                {data.departureDate && (
                  <div className="date-chevron-group">
                    <button
                      className="date-chevron"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNudgeDate("departureDate", -1);
                      }}
                      type="button"
                      aria-label="Previous day"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        width="12"
                        height="12"
                      >
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <button
                      className="date-chevron"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNudgeDate("departureDate", 1);
                      }}
                      type="button"
                      aria-label="Next day"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        width="12"
                        height="12"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
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
          <Tooltip
            content="Will accommodation have laundry facilities?"
            position="top"
          >
            <div className="destination-laundry">
              <div className="destination-laundry-header">
                <svg
                  className="destination-laundry-icon"
                  viewBox="0 0 463 463"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                >
                  <path
                    fill="currentColor"
                    d="m367.5,0h-272c-21.78,0-39.5,17.72-39.5,39.5v368c0,10.336 6.71,19.128 16,22.266v9.734c0,12.958 10.542,23.5 23.5,23.5h272c12.958,0 23.5-10.542 23.5-23.5v-9.734c9.29-3.138 16-11.93 16-22.266v-368c0-21.78-17.72-39.5-39.5-39.5zm-272,15h272c13.51,0 24.5,10.991 24.5,24.5v56.5h-321v-56.5c0-13.509 10.99-24.5 24.5-24.5zm272,433h-272c-4.687,0-8.5-3.813-8.5-8.5v-8.5h289v8.5c0,4.687-3.813,8.5-8.5,8.5zm16-32h-304c-4.687,0-8.5-3.813-8.5-8.5v-296.5h321v296.5c0,4.687-3.813,8.5-8.5,8.5z"
                  />
                  <path
                    fill="currentColor"
                    d="M231.5,136C161.196,136,104,193.196,104,263.5S161.196,391,231.5,391S359,333.804,359,263.5S301.804,136,231.5,136z M231.5,376C169.468,376,119,325.533,119,263.5S169.468,151,231.5,151S344,201.467,344,263.5S293.532,376,231.5,376z"
                  />
                  <path
                    fill="currentColor"
                    d="m279.5,79c12.958,0 23.5-10.542 23.5-23.5s-10.542-23.5-23.5-23.5-23.5,10.542-23.5,23.5 10.542,23.5 23.5,23.5zm0-32c4.687,0 8.5,3.813 8.5,8.5s-3.813,8.5-8.5,8.5-8.5-3.813-8.5-8.5 3.813-8.5 8.5-8.5z"
                  />
                  <path
                    fill="currentColor"
                    d="m343.5,79c12.958,0 23.5-10.542 23.5-23.5s-10.542-23.5-23.5-23.5-23.5,10.542-23.5,23.5 10.542,23.5 23.5,23.5zm0-32c4.687,0 8.5,3.813 8.5,8.5s-3.813,8.5-8.5,8.5-8.5-3.813-8.5-8.5 3.813-8.5 8.5-8.5z"
                  />
                  <path
                    fill="currentColor"
                    d="m111.5,79h104c8.547,0 15.5-6.953 15.5-15.5v-16c0-8.547-6.953-15.5-15.5-15.5h-104c-8.547,0-15.5,6.953-15.5,15.5v16c0,8.547 6.953,15.5 15.5,15.5zm-.5-31.5c0-0.276 0.225-0.5 0.5-0.5h104c0.275,0 0.5,0.224 0.5,0.5v16c0,0.276-0.225,0.5-0.5,0.5h-104c-0.275,0-0.5-0.224-0.5-0.5v-16z"
                  />
                  <path
                    fill="currentColor"
                    d="m231.5,168c-52.659,0-95.5,42.841-95.5,95.5s42.841,95.5 95.5,95.5 95.5-42.841 95.5-95.5-42.841-95.5-95.5-95.5zm0,176c-44.388,0-80.5-36.112-80.5-80.5s36.112-80.5 80.5-80.5 80.5,36.112 80.5,80.5-36.112,80.5-80.5,80.5z"
                  />
                  <path
                    fill="currentColor"
                    d="m231.5,200c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5 7.5,7.5c26.743,0 48.5,21.757 48.5,48.5 0,4.142 3.357,7.5 7.5,7.5s7.5-3.358 7.5-7.5c0-35.014-28.486-63.5-63.5-63.5z"
                  />
                </svg>
              </div>

              <div className="options-and-disclaimer">
                <span className="destination-laundry-label">Laundry</span>

                <div className="destination-laundry-options">
                  {(["yes", "no", "maybe"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`destination-laundry-btn ${data.laundry === option ? "selected" : ""}`}
                      onClick={() => handleLaundryChange(option)}
                      aria-pressed={data.laundry === option}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>{" "}
          </Tooltip>
        </div>
      </div>
    </>
  );
}
