import { api } from "./api";
import {
  type GeneratePackingListPayload,
  type PackingListCreationResponse,
} from "../types/packingLists";

export const generatePackingList = async (
  payload: GeneratePackingListPayload,
): Promise<PackingListCreationResponse[]> => {
  const res = await api.request("/packing/create", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to generate packing list");
  return res.json();
};
