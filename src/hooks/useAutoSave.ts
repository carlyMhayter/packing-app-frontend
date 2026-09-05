import { useEffect, useState, useCallback, useRef } from "react";
import { type SaveStatus, type UseAutoSaveResult } from "../types/forms/forms";

export function useAutoSave<T>(
  draft: T | null,
  saveFn: (data: T) => Promise<T>,
  onSuccess: (saved: T) => void,
  debounceMs = 500,
): UseAutoSaveResult<T> {
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [lastSaved, setLastSaved] = useState<T | null>(null);

  // savedTimerRef shows "Saved" for 2000ms,then hides it
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const draftRef = useRef(draft);

  //draft is not empty
  //draft has something saved previously
  //and is currently different than last save
  const isDirty =
    draft !== null &&
    lastSaved !== null &&
    JSON.stringify(draft) !== JSON.stringify(lastSaved);

  // console.log("draft inside of useAutoSave", draft);
  // console.log("lastSaved inside of useAutoSave", lastSaved);

  // Main auto-save effect — NO synchronous setState calls
  useEffect(() => {
    draftRef.current = draft;

    if (!draft || !lastSaved) return;
    if (JSON.stringify(draft) === JSON.stringify(lastSaved)) return;

    // Clear any pending "saved" fade timer
    if (savedTimerRef.current) {
      clearTimeout(savedTimerRef.current);
      savedTimerRef.current = null;
    }

    // debounce delay timer: waits for user to stop typing
    // before firing the save functionality
    const timer = setTimeout(() => {
      setStatus("saving"); // set external state inside async callback
      saveFn(draft)
        .then((saved) => {
          // console.log("saved inside of useAutoSave", saved);
          setLastSaved(saved);
          onSuccess(saved);
          savedTimerRef.current = setTimeout(() => {
            setStatus("saved");
          }, 1000);
          // setStatus("saved");
          // Auto-fade back to idle after 2 seconds
          savedTimerRef.current = setTimeout(() => {
            setStatus("idle");
          }, 2000);
        })
        .catch(() => {
          setStatus("error");
        });
    }, debounceMs);

    return () => {
      clearTimeout(timer);
      if (savedTimerRef.current) {
        clearTimeout(savedTimerRef.current);
      }
    };
  }, [draft, lastSaved, saveFn, onSuccess, debounceMs]);

  const init = useCallback((initial: T) => {
    setLastSaved(initial);
  }, []);

  // A function for manually saving on demand
  const saveNow = useCallback(async () => {
    if (!draftRef.current || !lastSaved) return;
    if (savedTimerRef.current) {
      clearTimeout(savedTimerRef.current);
      savedTimerRef.current = null;
    }
    setStatus("saving");
    try {
      const saved = await saveFn(draftRef.current);
      setLastSaved(saved);
      onSuccess(saved);
      setStatus("saved");
      savedTimerRef.current = setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
    }
  }, [saveFn, onSuccess, lastSaved]);

  return { status, init, saveNow, isDirty };
}
