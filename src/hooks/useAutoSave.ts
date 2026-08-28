import { useEffect, useState } from "react";
import { FormStateValues } from "../enums/enums";

export function useAutoSave<T extends Record<string, unknown>>(
  draft: T | null,
  saveFn: (data: T) => Promise<T>,
  onSuccess: (saved: T) => void,
  debounceMs = 500,
) {
  const [status, setStatus] = useState<
    (typeof FormStateValues)[keyof typeof FormStateValues]
  >(FormStateValues.idle);
  const [lastSaved, setLastSaved] = useState<T | null>(null);

  useEffect(() => {
    if (!draft || !lastSaved) return;
    if (JSON.stringify(draft) === JSON.stringify(lastSaved)) return;

    setStatus(FormStateValues.idle);
    const timer = setTimeout(() => {
      setStatus("saving");
      saveFn(draft)
        .then((saved) => {
          setLastSaved(saved);
          onSuccess(saved);
          setStatus("saved");
          setTimeout(() => setStatus("idle"), 2000);
        })
        .catch(() => setStatus("error"));
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [draft, lastSaved, saveFn, onSuccess, debounceMs]);

  const init = useCallback((initial: T) => {
    setLastSaved(initial);
  }, []);

  return {
    status,
    init,
    retry: () => setDraft?.((d: T | null) => (d ? { ...d } : null)),
  };
}
