import { FormStateValues } from "../enums/enums";

export interface FormState {
  status: (typeof FormStateValues)[keyof typeof FormStateValues];
}

export type SaveStatus = "idle" | "saving" | "saved" | "error";

export interface UseAutoSaveResult<T> {
  status: SaveStatus;
  init: (data: T) => void;
  saveNow: () => Promise<void>;
  isDirty: boolean;
}
