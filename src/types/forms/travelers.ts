import { TravelerType } from "../../enums/enums";
import { TemperatureUnit } from "../../enums/enums";
// Draft state for creating a traveler on the modal
export interface TravelerCreateDraft {
  name: string;
  traveler_type: (typeof TravelerType)[keyof typeof TravelerType];
  temp_unit: (typeof TemperatureUnit)[keyof typeof TemperatureUnit];
  temps: { cold: number; cool: number; warm: number; hot: number };
}
