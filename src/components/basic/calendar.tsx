import { useState, useEffect, useRef } from "react";
import "./styles/calendar.css";

interface CalendarProps {
  selectedDate?: string | null;
  rangeStart?: string | null;
  rangeEnd?: string | null;
  onSelect?: (date: string) => void;
  onSelectRange?: (start: string, end: string) => void;
  onClose: () => void;
  minDate?: string;
  maxDate?: string;
  mode?: "single" | "range";
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function toISODate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  const today = toISODate(new Date());

  const days: { date: string; day: number; isCurrentMonth: boolean; isToday: boolean }[] = [];

  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startOffset - 1; i >= 0; i--) {
    const d = prevMonthLastDay - i;
    days.push({ date: toISODate(new Date(year, month - 1, d)), day: d, isCurrentMonth: false, isToday: false });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const iso = toISODate(new Date(year, month, d));
    days.push({ date: iso, day: d, isCurrentMonth: true, isToday: iso === today });
  }

  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    days.push({ date: toISODate(new Date(year, month + 1, d)), day: d, isCurrentMonth: false, isToday: false });
  }

  return days;
}

export default function Calendar({
  selectedDate,
  rangeStart,
  rangeEnd,
  onSelect,
  onSelectRange,
  onClose,
  minDate,
  maxDate,
  mode = "single",
}: CalendarProps) {
  const initialDate = selectedDate
    ? parseDate(selectedDate)
    : rangeStart
      ? parseDate(rangeStart)
      : new Date();
  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth());
  const [selectingStart, setSelectingStart] = useState<string | null>(rangeStart || null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const days = getCalendarDays(viewYear, viewMonth);

  const goToPrevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else { setViewMonth((m) => m - 1); }
  };

  const goToNextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else { setViewMonth((m) => m + 1); }
  };

  const isDisabled = (date: string) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isInRange = (date: string) => {
    if (!selectingStart || !rangeEnd) return false;
    const start = selectingStart < rangeEnd ? selectingStart : rangeEnd;
    const end = selectingStart < rangeEnd ? rangeEnd : selectingStart;
    return date > start && date < end;
  };

  const handleSelect = (date: string) => {
    if (isDisabled(date)) return;

    if (mode === "single" && onSelect) {
      onSelect(date);
      onClose();
      return;
    }

    if (mode === "range" && onSelectRange) {
      if (!selectingStart) {
        setSelectingStart(date);
        return;
      }

      const start = date < selectingStart ? date : selectingStart;
      const end = date < selectingStart ? selectingStart : date;
      onSelectRange(start, end);
      setSelectingStart(null);
      onClose();
    }
  };

  const effectiveRangeStart = selectingStart || rangeStart;
  const effectiveRangeEnd = rangeEnd;

  return (
    <div className="calendar-popover" ref={calendarRef}>
      <div className="calendar-header">
        <button className="calendar-nav-btn" onClick={goToPrevMonth} type="button" aria-label="Previous month">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="16" height="16">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="calendar-month-year">{MONTHS[viewMonth]} {viewYear}</span>
        <button className="calendar-nav-btn" onClick={goToNextMonth} type="button" aria-label="Next month">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="16" height="16">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {mode === "range" && (
        <div className="calendar-range-hint">
          {selectingStart ? "Select end date" : "Select start date"}
        </div>
      )}

      <div className="calendar-days-row">
        {DAYS.map((d) => (
          <span key={d} className="calendar-day-name">{d}</span>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((day) => {
          const selected = day.date === selectedDate;
          const isStart = day.date === effectiveRangeStart;
          const isEnd = day.date === effectiveRangeEnd;
          const inRange = isInRange(day.date);
          const disabled = isDisabled(day.date);
          return (
            <button
              key={day.date}
              className={`calendar-day ${selected ? "is-selected" : ""} ${
                day.isToday ? "is-today" : ""
              } ${!day.isCurrentMonth ? "is-other-month" : ""} ${
                disabled ? "is-disabled" : ""
              } ${isStart ? "is-range-start" : ""} ${isEnd ? "is-range-end" : ""} ${
                inRange ? "is-in-range" : ""
              }`}
              onClick={() => handleSelect(day.date)}
              disabled={disabled}
              type="button"
            >
              {day.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
