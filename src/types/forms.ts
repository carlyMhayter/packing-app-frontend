import { FormStateValues } from "../enums/enums";

export interface FormState {
  status: (typeof FormStateValues)[keyof typeof FormStateValues];
}
