import { api } from "./api";

export const fetchRecentTrips = async (limit: number) => {
  const res = await api.request(
    `/trips?sort_field=updated_at&sort_order=desc&limit=${limit}`,
  );
  if (!res.ok) throw new Error("Failed to fetch trips");
  return res.json();
};
