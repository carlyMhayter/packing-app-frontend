import { type TripPublic } from "../types/trip";
import { type ForecastDestinationPublic } from "../types/forecasts";
import { type DestinationPublic } from "../types/destinations";

const mockForecastDestination: ForecastDestinationPublic = {
  id: 1,
  destination_id: 1,
  start_date: "2026-06-15",
  end_date: "2026-06-22",
  day_conditions: {
    conditions: { sunny: 6, partly_cloudy: 2 },
    total_hours: 8,
  },
  night_conditions: { conditions: { clear: 7, cloudy: 1 }, total_hours: 8 },
  day_high: 78,
  day_low: 53,
  night_high: 68,
  night_low: 42,
  cached_at: new Date("2026-06-14T00:00:00Z"),
  forecast_days: [],
};

const mockDestination: DestinationPublic = {
  id: 1,
  label: "Paris",
  arrival_date: "2026-06-15",
  departure_date: "2026-06-22",
  has_laundry: false,
  order: 0,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-15T00:00:00Z",
  address: {
    id: 1,
    latitude: 48.8566,
    longitude: 2.3522,
    mapbox_id: "dXJuOm1ieHBsYzpBZEYxY2c",
    full_name: "Paris, Île-de-France, France",
    country_id: "FRA",
    region: "Île-de-France",
    place: "Paris",
    created_at: new Date("2026-01-01T00:00:00Z"),
  },
};

export const mockTripDetail: TripPublic = {
  id: 1,
  name: "Summer in Paris",
  arrival_date: "2026-06-15",
  departure_date: "2026-06-22",
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-15T00:00:00Z",
  destinations: [mockDestination],
  forecast_trip: {
    id: 1,
    trip_id: 1,
    cached_at: new Date("2026-06-14T00:00:00Z"),
    day_conditions: {
      conditions: { sunny: 6, partly_cloudy: 2 },
      total_hours: 8,
    },
    day_high: 78,
    day_low: 53,
    night_conditions: { conditions: { clear: 7, cloudy: 1 }, total_hours: 8 },
    night_high: 68,
    night_low: 42,
    forecast_destinations: [mockForecastDestination],
  },
};

export const mockTripList: TripPublic[] = [
  mockTripDetail,
  {
    id: 2,
    name: "Weekend in Rome",
    arrival_date: "2026-08-10",
    departure_date: "2026-08-13",
    created_at: "2026-02-01T00:00:00Z",
    updated_at: "2026-02-10T00:00:00Z",
    destinations: [
      {
        id: 2,
        label: "Rome",
        arrival_date: "2026-08-10",
        departure_date: "2026-08-13",
        has_laundry: true,
        order: 0,
        created_at: "2026-02-01T00:00:00Z",
        updated_at: "2026-02-10T00:00:00Z",
      },
    ],
    forecast_trip: {
      id: 2,
      trip_id: 2,
      cached_at: new Date("2026-08-09T00:00:00Z"),
      day_conditions: { conditions: { sunny: 8 }, total_hours: 8 },
      day_high: 90,
      day_low: 70,
      night_conditions: { conditions: { clear: 8 }, total_hours: 8 },
      night_high: 75,
      night_low: 62,
      forecast_destinations: [],
    },
  },
  {
    id: 3,
    name: "Tokyo Autumn",
    arrival_date: "2026-10-01",
    departure_date: "2026-10-10",
    created_at: "2026-03-05T00:00:00Z",
    updated_at: "2026-03-20T00:00:00Z",
    destinations: [
      {
        id: 3,
        label: "Tokyo",
        arrival_date: "2026-10-01",
        departure_date: "2026-10-10",
        has_laundry: false,
        order: 0,
        created_at: "2026-03-05T00:00:00Z",
        updated_at: "2026-03-20T00:00:00Z",
      },
    ],
    forecast_trip: {
      id: 3,
      trip_id: 3,
      cached_at: new Date("2026-09-30T00:00:00Z"),
      day_conditions: { conditions: { partly_cloudy: 8 }, total_hours: 8 },
      day_high: 72,
      day_low: 55,
      night_conditions: { conditions: { cloudy: 8 }, total_hours: 8 },
      night_high: 60,
      night_low: 48,
      forecast_destinations: [],
    },
  },
];
