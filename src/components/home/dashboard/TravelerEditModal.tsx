import { useState, useEffect, useRef } from "react";

interface TravelerEditModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
}

interface TemperaturePrefs {
  hot: string;
  warm: string;
  cool: string;
  cold: string;
}

interface ClothingPrefs {
  shoes: string;
  underwear: string;
  socks: string;
  pants: string;
  shirts: string;
}

export default function TravelerEditModal({
  open,
  title,
  onClose,
}: TravelerEditModalProps) {
  const [name, setName] = useState("Carly");
  const [temps, setTemps] = useState<TemperaturePrefs>({
    hot: "80",
    warm: "70",
    cool: "60",
    cold: "50",
  });
  const [clothing, setClothing] = useState<ClothingPrefs>({
    shoes: "3",
    underwear: "7",
    socks: "7",
    pants: "4",
    shirts: "5",
  });

  const [medications, setMedications] = useState<string[]>(["Allergy pills", "Ibuprofen"]);
  const [newMed, setNewMed] = useState("");

  const [routines, setRoutines] = useState<string[]>(["Morning skincare", "Evening stretch"]);
  const [newRoutine, setNewRoutine] = useState("");

  const previousTrips = [
    { name: "Summer in Italy", dates: "Jun 12 — Jun 26, 2025" },
    { name: "Colorado Ski Trip", dates: "Dec 20 — Dec 27, 2024" },
    { name: "Tokyo Weekend", dates: "Mar 8 — Mar 12, 2024" },
  ];

  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => closeRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const addMedication = () => {
    const trimmed = newMed.trim();
    if (!trimmed) return;
    setMedications((prev) => [...prev, trimmed]);
    setNewMed("");
  };

  const removeMedication = (index: number) => {
    setMedications((prev) => prev.filter((_, i) => i !== index));
  };

  const addRoutine = () => {
    const trimmed = newRoutine.trim();
    if (!trimmed) return;
    setRoutines((prev) => [...prev, trimmed]);
    setNewRoutine("");
  };

  const removeRoutine = (index: number) => {
    setRoutines((prev) => prev.filter((_, i) => i !== index));
  };

  if (!open) return null;

  return (
    <div
      className="modal-overlay modal-overlay-dark"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="traveler-modal-title"
    >
      <div className="modal-content modal-scrollable">
        <div className="modal-header">
          <h3 id="traveler-modal-title" className="modal-title">
            {title}
          </h3>
          <button
            ref={closeRef}
            className="modal-close-btn"
            onClick={onClose}
            type="button"
            aria-label="Close modal"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              width="18"
              height="18"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="modal-body">
          {/* Name */}
          <section className="modal-section">
            <label className="modal-section-label" htmlFor="traveler-name">
              Name
            </label>
            <input
              id="traveler-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="modal-text-input"
            />
          </section>

          {/* Temperature Preferences */}
          <section className="modal-section">
            <h4 className="modal-section-heading">Temperature Preferences</h4>
            <div className="temp-preferences-grid">
              {([
                { key: "hot", label: "Hot" },
                { key: "warm", label: "Warm" },
                { key: "cool", label: "Cool" },
                { key: "cold", label: "Cold" },
              ] as { key: keyof TemperaturePrefs; label: string }[]).map(
                ({ key, label }) => (
                  <div key={key} className="temp-preference-item">
                    <span className="temp-preference-label">{label}</span>
                    <div className="temp-preference-input-wrap">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={temps[key]}
                        onChange={(e) =>
                          setTemps((prev) => ({
                            ...prev,
                            [key]: e.target.value,
                          }))
                        }
                        className="temp-preference-input"
                      />
                      <span className="temp-preference-unit">°F</span>
                    </div>
                  </div>
                ),
              )}
            </div>
          </section>

          {/* Clothing Preferences */}
          <section className="modal-section">
            <h4 className="modal-section-heading">Clothing Preferences</h4>
            <div className="clothing-preferences-list">
              {([
                { key: "shoes", label: "Pairs of shoes" },
                { key: "underwear", label: "Pairs of underwear" },
                { key: "socks", label: "Pairs of socks" },
                { key: "pants", label: "Pairs of pants" },
                { key: "shirts", label: "Shirts" },
              ] as { key: keyof ClothingPrefs; label: string }[]).map(
                ({ key, label }) => (
                  <div key={key} className="clothing-preference-row">
                    <span className="clothing-preference-label">{label}</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={clothing[key]}
                      onChange={(e) =>
                        setClothing((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      className="clothing-preference-input"
                    />
                  </div>
                ),
              )}
            </div>
          </section>

          {/* Medications */}
          <section className="modal-section">
            <h4 className="modal-section-heading">Medications</h4>
            <div className="tag-list">
              {medications.map((med, i) => (
                <span key={i} className="tag-item">
                  {med}
                  <button
                    className="tag-remove"
                    onClick={() => removeMedication(i)}
                    type="button"
                    aria-label={`Remove ${med}`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="10" height="10">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
            <div className="tag-add-row">
              <input
                type="text"
                value={newMed}
                onChange={(e) => setNewMed(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addMedication();
                }}
                placeholder="Add medication..."
                className="tag-add-input"
              />
              <button
                className="tag-add-btn"
                onClick={addMedication}
                type="button"
                aria-label="Add medication"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="14" height="14">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            </div>
          </section>

          {/* Routines */}
          <section className="modal-section">
            <h4 className="modal-section-heading">Routines</h4>
            <div className="tag-list">
              {routines.map((routine, i) => (
                <span key={i} className="tag-item">
                  {routine}
                  <button
                    className="tag-remove"
                    onClick={() => removeRoutine(i)}
                    type="button"
                    aria-label={`Remove ${routine}`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="10" height="10">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
            <div className="tag-add-row">
              <input
                type="text"
                value={newRoutine}
                onChange={(e) => setNewRoutine(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addRoutine();
                }}
                placeholder="Add routine..."
                className="tag-add-input"
              />
              <button
                className="tag-add-btn"
                onClick={addRoutine}
                type="button"
                aria-label="Add routine"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="14" height="14">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            </div>
          </section>

          {/* Previous Trips */}
          <section className="modal-section">
            <h4 className="modal-section-heading">Previous Trips</h4>
            <div className="previous-trips-list">
              {previousTrips.map((trip, i) => (
                <div key={i} className="previous-trip-item">
                  <span className="previous-trip-name">{trip.name}</span>
                  <span className="previous-trip-dates">{trip.dates}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="modal-footer">
          <button className="btn-main" type="button">
            Save
          </button>
          <button className="btn-text" onClick={onClose} type="button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
