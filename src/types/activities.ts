import { ActivityContextTags } from "../enums/enums";
import type { ItemPublic, ItemCreate } from "./items";

export interface ActivityBase {
  name: string;
  key: string;
  tags: (typeof ActivityContextTags)[keyof typeof ActivityContextTags][];
  description?: string;
  items?: ItemPublic[];
}

export interface ActivityCreate extends ActivityBase {
  name: string;
}

export interface ActivityPublic extends ActivityBase {
  id: number;
  items?: ItemPublic[];
}

export interface ActivityScoring extends ActivityPublic {
  score: number;
}

export interface ActivityUpdate {
  name?: string;
  tags?: (typeof ActivityContextTags)[keyof typeof ActivityContextTags][];
  description?: string;
  items?: ItemCreate[];
}

export interface ActivitiesPublicState {
  activities: ActivityPublic[];
  error: string | null;
  isLoading: boolean;
}
