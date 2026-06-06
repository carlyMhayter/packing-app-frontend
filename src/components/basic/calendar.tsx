import { useState, useEffect, useRef, useCallback } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isBefore,
  isWithinInterval,
} from "date-fns";
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

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function toISODate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseISOSafe(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
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
  const getInitialDate = useCallback(() => {
    if (mode === "single" && selectedDate) return parseISOSafe(selectedDate);
    if (rangeStart) return parseISOSafe(rangeStart);
    return new Date();
  }, [mode, selectedDate, rangeStart]);

  const [baseDate, setBaseDate] = useState<Date>(getInitialDate);
  const [tentativeStart, setTentativeStart] = useState<string | null>(
    rangeStart || null
  );
  const [hoverDate, setHoverDate] = useState<string | null>(null);

  useEffect(() => {
    setTentativeStart(rangeStart || null);
    setHoverDate(null);
  }, [rangeStart, rangeEnd]);

  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node)
      ) {
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

  const leftMonth = startOfMonth(baseDate);
  const rightMonth = startOfMonth(addMonths(baseDate, 1));

  const goToPrevMonth = () => setBaseDate((d) => subMonths(d, 1));
  const goToNextMonth = () => setBaseDate((d) => addMonths(d, 1));

  const isDisabled = (dateStr: string) => {
    if (minDate && dateStr < minDate) return true;
    if (maxDate && dateStr > maxDate) return true;
    return false;
  };

  const getMonthDays = (monthDate: Date) => {
    const start = startOfWeek(startOfMonth(monthDate));
    const end = endOfWeek(endOfMonth(monthDate));
    return eachDayOfInterval({ start, end });
  };

  const computeDisplayRange = () => {
    if (mode !== "range") return null;

    if (tentativeStart && hoverDate) {
      const s = parseISOSafe(tentativeStart);
      const h = parseISOSafe(hoverDate);
      const start = isBefore(h, s) ? hoverDate : tentativeStart;
      const end = isBefore(h, s) ? tentativeStart : hoverDate;
      return { start, end };
    }

    if (tentativeStart && !rangeEnd) {
      return { start: tentativeStart, end: tentativeStart };
    }

    if (rangeStart && rangeEnd) {
      return { start: rangeStart, end: rangeEnd };
    }

    if (rangeStart) {
      return { start: rangeStart, end: rangeStart };
    }

    return null;
  };

  const displayRange = computeDisplayRange();

  const handleDayClick = (dateStr: string) => {
    if (isDisabled(dateStr)) return;

    if (mode === "single" && onSelect) {
      onSelect(dateStr);
      onClose();
      return;
    }

    if (mode === "range" && onSelectRange) {
      if (!tentativeStart) {
        setTentativeStart(dateStr);
        setHoverDate(null);
        return;
      }

      const startDate = parseISOSafe(tentativeStart);
      const endDate = parseISOSafe(dateStr);
      const [start, end] = isBefore(endDate, startDate)
        ? [dateStr, tentativeStart]
        : [tentativeStart, dateStr];

      onSelectRange(start, end);
      setTentativeStart(null);
      setHoverDate(null);
    }
  };

  const handleDayEnter = (dateStr: string) => {
    if (mode === "range" && tentativeStart) {
      setHoverDate(dateStr);
    }
  };

  const handleDayLeave = () => {
    setHoverDate(null);
  };

  const handleDone = () => {
    if (mode === "range" && onSelectRange && tentativeStart && !rangeEnd) {
      onSelectRange(tentativeStart, tentativeStart);
    }
    onClose();
  };

  const renderMonth = (monthDate: Date) => {
    const days = getMonthDays(monthDate);
    return (
      <div className="calendar-month-panel">
        <div className="calendar-month-title">
          {format(monthDate, "MMMM yyyy")}
        </div>
        <div className="calendar-weekdays-row">
          {WEEKDAYS.map((d) => (
            <span key={d} className="calendar-weekday-name">
              {d}
            </span>
          ))}
        </div>
        <div className="calendar-days-grid">
          {days.map((day) => {
            const dateStr = toISODate(day);
            const disabled = isDisabled(dateStr);
            const inCurrentMonth = isSameMonth(day, monthDate);
            const isToday = isSameDay(day, new Date());
            const isSelected =
              mode === "single" && selectedDate === dateStr;

            let isRangeStart = false;
            let isRangeEnd = false;
            let isInRange = false;

            if (displayRange) {
              const startDate = parseISOSafe(displayRange.start);
              const endDate = parseISOSafe(displayRange.end);

              if (isSameDay(day, startDate)) isRangeStart = true;
              if (isSameDay(day, endDate)) isRangeEnd = true;
              if (
                !isRangeStart &&
                !isRangeEnd &&
                isWithinInterval(day, { start: startDate, end: endDate })
              ) {
                isInRange = true;
              }
            }

            return (
              <button
                key={dateStr}
                className={`calendar-day ${isSelected ? "is-selected" : ""} ${
                  isToday ? "is-today" : ""
                } ${!inCurrentMonth ? "is-other-month" : ""} ${
                  disabled ? "is-disabled" : ""
                } ${isRangeStart ? "is-range-start" : ""} ${
                  isRangeEnd ? "is-range-end" : ""
                } ${isInRange ? "is-in-range" : ""}`}
                onClick={() => handleDayClick(dateStr)}
                onMouseEnter={() => handleDayEnter(dateStr)}
                onMouseLeave={handleDayLeave}
                disabled={disabled}
                type="button"
              >
                {format(day, "d")}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="calendar-popover" ref={calendarRef}>
      <div className="calendar-header">
        <button
          className="calendar-nav-btn"
          onClick={goToPrevMonth}
          type="button"
          aria-label="Previous month"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            width="16"
            height="16"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div />
        <button
          className="calendar-nav-btn"
          onClick={goToNextMonth}
          type="button"
          aria-label="Next month"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            width="16"
            height="16"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="calendar-body">
        {renderMonth(leftMonth)}
        <div className="calendar-month-divider" />
        {renderMonth(rightMonth)}
      </div>

      <div className="calendar-footer">
        <button
          className="calendar-done-btn"
          onClick={handleDone}
          type="button"
        >
          Done
        </button>
      </div>
    </div>
  );
}
