import { useRef, useState, useCallback } from "react";
import "./tempSlider.css";
import type { TravelerTemperaturePreferences } from "../../../types/traveler.js";

export interface TempSliderValues {
  cold: number;
  cool: number;
  warm: number;
  hot: number;
}

interface TempSliderProps {
  temperaturePreferences: TravelerTemperaturePreferences;
  onChange: (values: TempSliderValues) => void;
}

const START_VALUES = {
  F: { min: 20, max: 100 },
  C: { min: -7, max: 38 },
};

const HANDLES: { key: keyof TempSliderValues; label: string }[] = [
  { key: "cold", label: "COLD" },
  { key: "cool", label: "COOL" },
  { key: "warm", label: "WARM" },
  { key: "hot", label: "HOT" },
];

export default function TempSlider({
  temperaturePreferences,
  onChange,
}: TempSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<keyof TempSliderValues | null>(null);

  const { min, max } = START_VALUES[temperaturePreferences.unit];
  const range = max - min;

  const tempToPercent = (temp: number) => ((temp - min) / range) * 100;

  const percentToTemp = (percent: number) => {
    const raw = Math.round((percent / 100) * range + min);
    return Math.max(min, Math.min(max, raw));
  };

  const getPointerPercent = useCallback(
    (e: React.PointerEvent | PointerEvent) => {
      const track = trackRef.current;
      if (!track) return 0;
      const rect = track.getBoundingClientRect();
      const x = (e as PointerEvent).clientX - rect.left;
      const pct = (x / rect.width) * 100;
      return Math.max(0, Math.min(100, pct));
    },
    [],
  );

  const handlePointerDown = (
    e: React.PointerEvent,
    key: keyof TempSliderValues,
  ) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(key);
  };

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return;
      const pct = getPointerPercent(e);
      const newTemp = percentToTemp(pct);

      const order: (keyof TempSliderValues)[] = ["cold", "cool", "warm", "hot"];
      const idx = order.indexOf(dragging);

      let clamped = newTemp;
      if (idx > 0) {
        const prevKey = order[idx - 1];
        const prevVal = temperaturePreferences[prevKey];
        clamped = Math.max(clamped, prevVal + 1);
      }
      if (idx < order.length - 1) {
        const nextKey = order[idx + 1];
        const nextVal = temperaturePreferences[nextKey];
        clamped = Math.min(clamped, nextVal - 1);
      }

      if (clamped !== temperaturePreferences[dragging]) {
        onChange({ ...temperaturePreferences, [dragging]: clamped });
      }
    },
    [dragging, getPointerPercent, onChange, temperaturePreferences],
  );

  const handlePointerUp = useCallback(() => {
    setDragging(null);
  }, []);

  return (
    <div
      className="temp-slider"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div className="temp-slider-labels">
        {HANDLES.map(({ key, label }) => (
          <span
            key={key}
            className="temp-slider-label"
            style={{ left: `${tempToPercent(temperaturePreferences[key])}%` }}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="temp-slider-track-wrap">
        <div className="temp-slider-range-labels">
          <span>
            {min}&deg;{temperaturePreferences.unit}
          </span>
          <span>
            {max}&deg;{temperaturePreferences.unit}
          </span>
        </div>
        <div className="temp-slider-track" ref={trackRef}>
          {HANDLES.map(({ key }) => (
            <div
              key={key}
              className={`temp-slider-handle ${dragging === key ? "is-dragging" : ""}`}
              style={{ left: `${tempToPercent(temperaturePreferences[key])}%` }}
              onPointerDown={(e) => handlePointerDown(e, key)}
              role="slider"
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={temperaturePreferences[key]}
              aria-label={`${key} temperature`}
              tabIndex={0}
            />
          ))}
        </div>
      </div>

      <div className="temp-slider-values">
        {HANDLES.map(({ key }) => (
          <span
            key={key}
            className="temp-slider-value"
            style={{ left: `${tempToPercent(temperaturePreferences[key])}%` }}
          >
            {temperaturePreferences[key]}&deg;{temperaturePreferences.unit}
          </span>
        ))}
      </div>
    </div>
  );
}
