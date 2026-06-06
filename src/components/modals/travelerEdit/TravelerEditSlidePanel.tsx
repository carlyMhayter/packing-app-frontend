import { useState } from "react";
import TempSlider from "./TempSlider";
import ModalSlidePanel from "../modal/ModalSlidePanel";
import "../styles/travelerEdit.css";
import "../styles/modal.css";

interface TravelerEditSlidePanelProps {
  setView: React.Dispatch<React.SetStateAction<"traveler" | "createRoutine">>;
}

interface ClothingPrefs {
  shoes: string;
  underwear: string;
  socks: string;
  pants: string;
  shirts: string;
}

export default function TravelerEditSlidePanel({
  setView,
}: TravelerEditSlidePanelProps) {
  const [name, setName] = useState("Carly");
  const [unit, setUnit] = useState<"F" | "C">("F");
  const [temps, setTemps] = useState({
    hot: 90,
    warm: 75,
    cool: 55,
    cold: 32,
  });
  const [clothing, setClothing] = useState<ClothingPrefs>({
    shoes: "3",
    underwear: "7",
    socks: "7",
    pants: "4",
    shirts: "5",
  });

  const [medications, setMedications] = useState<string[]>([
    "Allergy pills",
    "Ibuprofen",
  ]);
  const [newMed, setNewMed] = useState("");

  const [routines, setRoutines] = useState<string[]>([
    "Standard Hygiene Routine",
  ]);
  const [newRoutine, setNewRoutine] = useState("");

  const convertTemps = (toUnit: "F" | "C") => {
    if (toUnit === unit) return;
    const convert = (val: number) =>
      toUnit === "C"
        ? Math.round(((val - 32) * 5) / 9)
        : Math.round((val * 9) / 5 + 32);
    setTemps({
      cold: convert(temps.cold),
      cool: convert(temps.cool),
      warm: convert(temps.warm),
      hot: convert(temps.hot),
    });
    setUnit(toUnit);
  };

  const previousTrips = [
    { name: "Summer in Italy", dates: "Jun 12 — Jun 26, 2025" },
    { name: "Colorado Ski Trip", dates: "Dec 20 — Dec 27, 2024" },
    { name: "Tokyo Weekend", dates: "Mar 8 — Mar 12, 2024" },
  ];

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

  return (
    <ModalSlidePanel>
      {/* Name */}
      <section className="trav-modal-section">
        <label className="trav-modal-section-label" htmlFor="traveler-name">
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
      <section className="trav-modal-section">
        <div className="trav-modal-section-heading-row">
          <h4 className="trav-modal-section-heading">
            Temperature Preferences
          </h4>
          <div className="unit-toggle">
            <button
              className={`unit-toggle-btn ${unit === "C" ? "selected" : ""}`}
              onClick={() => convertTemps("C")}
              type="button"
              aria-pressed={unit === "C"}
            >
              C
            </button>
            <button
              className={`unit-toggle-btn ${unit === "F" ? "selected" : ""}`}
              onClick={() => convertTemps("F")}
              type="button"
              aria-pressed={unit === "F"}
            >
              F
            </button>
          </div>
        </div>
        <TempSlider
          values={temps}
          unit={unit}
          onChange={(newTemps) => setTemps(newTemps)}
        />
      </section>

      {/* Clothing Preferences */}
      <section className="trav-modal-section">
        <h4 className="trav-modal-section-heading">Clothing Preferences</h4>
        <div className="clothing-preferences-list">
          {(
            [
              { key: "shoes", label: "Pairs of shoes" },
              { key: "underwear", label: "Pairs of underwear" },
              { key: "socks", label: "Pairs of socks" },
              { key: "pants", label: "Pairs of pants" },
              { key: "shirts", label: "Shirts" },
            ] as { key: keyof ClothingPrefs; label: string }[]
          ).map(({ key, label }) => (
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
          ))}
        </div>
      </section>

      {/* Medications */}
      <section className="trav-modal-section">
        <h4 className="trav-modal-section-heading">Medications</h4>
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
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  width="10"
                  height="10"
                >
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
      </section>

      {/* Routines */}
      <section className="trav-modal-section">
        <div className="trav-modal-section-heading-row">
          <h4 className="trav-modal-section-heading">Current Routines</h4>
          <button
            className="sci-btn"
            onClick={() => setView("createRoutine")}
            type="button"
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
            New Routine
          </button>
        </div>

        <div className="tag-list">
          {routines.map((routine, i) => (
            <button key={i} className="routine-button">
              {routine}
              <button
                className="tag-remove"
                onClick={() => removeRoutine(i)}
                type="button"
                aria-label={`Remove ${routine}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  width="10"
                  height="10"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </button>
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
      </section>

      {/* Previous Trips */}
      <section className="trav-modal-section">
        <h4 className="trav-modal-section-heading">Previous Trips</h4>
        <div className="previous-trips-list">
          {previousTrips.map((trip, i) => (
            <div key={i} className="previous-trip-item">
              <span className="previous-trip-name">{trip.name}</span>
              <span className="previous-trip-dates">{trip.dates}</span>
            </div>
          ))}
        </div>
      </section>
    </ModalSlidePanel>
  );
}
