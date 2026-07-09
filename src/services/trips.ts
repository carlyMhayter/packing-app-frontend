import { api } from "./api";
import {
  type TripPublic,
  type TripDetailData,
  type DestinationSummary,
  type WeatherCondition,
  type Traveler,
} from "../types/trip";
import { mockTripDetail, mockTripList } from "../mocks/trips";

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === "true";

const VALID_CONDITIONS = new Set<WeatherCondition>([
  "sunny",
  "partly_cloudy",
  "cloudy",
  "rainy",
  "stormy",
  "snowy",
  "clear",
]);

function toWeatherConditions(strs: string[]): WeatherCondition[] {
  return strs.filter((c): c is WeatherCondition =>
    (VALID_CONDITIONS as Set<string>).has(c),
  );
}

export function mapTripPublicToDetail(t: TripPublic): TripDetailData {
  const destinations: DestinationSummary[] = t.destinations.map((dest) => {
    const forecast = t.forecastTrip.forecastDestinations.find(
      (f) => f.destination_id === dest.id,
    );
    return {
      id: String(dest.id),
      name: dest.name,
      location: dest.address?.full_name ?? dest.name,
      arrivalDate: dest.arrival_date,
      departureDate: dest.departure_date,
      dayWeather: {
        highTemp: forecast?.day_high ?? t.forecastTrip.dayHigh,
        lowTemp: forecast?.day_low ?? t.forecastTrip.dayLow,
        conditions: toWeatherConditions(
          forecast
            ? Object.keys(forecast.day_conditions.conditions)
            : Object.keys(t.forecastTrip.dayConditions.conditions),
        ),
      },
      nightWeather: {
        highTemp: forecast?.night_high ?? t.forecastTrip.nightHigh,
        lowTemp: forecast?.night_low ?? t.forecastTrip.nightLow,
        conditions: toWeatherConditions(
          forecast
            ? Object.keys(forecast.night_conditions.conditions)
            : Object.keys(t.forecastTrip.nightConditions.conditions),
        ),
      },
      sunrise: forecast?.sunrise ?? "",
      sunset: forecast?.sunset ?? "",
      dailyWeather: [],
    };
  });

  const travelers: Traveler[] = [];

  return {
    trip: {
      id: String(t.id),
      name: t.name,
      start_date: t.arrivalDate,
      end_date: t.departDate,
      updated_at: t.updatedAt,
      created_at: t.createdAt,
    },
    overallDayWeather: {
      highTemp: t.forecastTrip.dayHigh,
      lowTemp: t.forecastTrip.dayLow,
      conditions: toWeatherConditions(Object.keys(t.forecastTrip.dayConditions.conditions)),
    },
    overallNightWeather: {
      highTemp: t.forecastTrip.nightHigh,
      lowTemp: t.forecastTrip.nightLow,
      conditions: toWeatherConditions(Object.keys(t.forecastTrip.nightConditions.conditions)),
    },
    destinations,
    travelers,
  };
}

interface CreateTripDestinationPayload {
  user_id: number;
  destination_name: string;
  arrival_date: string;
  departure_date: string;
  nights: number;
  has_laundry: boolean;
  label: string;
  address?: Record<string, unknown>;
  order: number;
}

interface CreateTripPayload {
  name: string;
  user_id: number;
  destinations: CreateTripDestinationPayload[];
}

export const fetchRecentTrips = async (limit: number): Promise<TripPublic[]> => {
  try {
    const res = await api.request(
      `/trips?sort_field=updated_at&sort_order=desc&limit=${limit}`,
    );
    if (!res.ok) throw new Error("Failed to fetch trips");
    const data: unknown = await res.json();
    return data as TripPublic[];
  } catch (err) {
    if (USE_MOCKS) {
      console.warn("[MOCK] fetchRecentTrips:", err);
      return mockTripList.slice(0, limit);
    }
    throw err;
  }
};

export const getTripById = async (tripId: string): Promise<TripPublic> => {
  try {
    const res = await api.request(`/trips/${tripId}`);
    if (!res.ok) throw new Error(`Failed to fetch trip ${tripId}`);
    const data: unknown = await res.json();
    return data as TripPublic;
  } catch (err) {
    if (USE_MOCKS) {
      console.warn("[MOCK] getTripById:", err);
      return mockTripDetail;
    }
    throw err;
  }
};

export const createTrip = async (
  payload: CreateTripPayload,
): Promise<TripPublic> => {
  try {
    const res = await api.request("/trips/create", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create trip");
    const data: unknown = await res.json();
    return data as TripPublic;
  } catch (err) {
    if (USE_MOCKS) {
      console.warn("[MOCK] createTrip:", err);
      return { ...mockTripDetail, name: payload.name };
    }
    throw err;
  }
};

export const updateTrip = async (
  tripId: string,
  payload: Partial<Pick<TripPublic, "name">>,
): Promise<TripPublic> => {
  try {
    const res = await api.request(`/trips/${tripId}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Failed to update trip ${tripId}`);
    const data: unknown = await res.json();
    return data as TripPublic;
  } catch (err) {
    if (USE_MOCKS) {
      console.warn("[MOCK] updateTrip:", err);
      return { ...mockTripDetail, ...payload };
    }
    throw err;
  }
};

export const deleteTrip = async (tripId: string): Promise<void> => {
  try {
    const res = await api.request(`/trips/${tripId}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`Failed to delete trip ${tripId}`);
  } catch (err) {
    if (USE_MOCKS) {
      console.warn("[MOCK] deleteTrip:", err);
      return;
    }
    throw err;
  }
};
