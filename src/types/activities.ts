import { ActivityCategory } from "../enums/enums";
import type { ItemPublic, ItemCreate } from "./items";

export interface ActivityBase {
  name: string;
  key: string;
  category: (typeof ActivityCategory)[keyof typeof ActivityCategory];
  description?: string;
  items?: ItemPublic[];
}

export interface ActivityCreate extends ActivityBase {}

export interface ActivityPublic extends ActivityBase {
  id: number;
  items?: ItemPublic[];
}

export interface ActivityUpdate {
  name?: string;
  category?: (typeof ActivityCategory)[keyof typeof ActivityCategory];
  description?: string;
  items?: ItemCreate[];
}
