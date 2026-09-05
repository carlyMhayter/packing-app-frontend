import { expect } from "chai";
import { mapTripPublicToDetail } from "../src/utils/tripsMapper";
import type { TripPublic } from "../src/types/trip";

const fixture: TripPublic = {
  id: 1,
  name: "Summer in Paris",
  arrival_date: "2026-06-15",
  departure_date: "2026-06-22",
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-15T00:00:00Z",
  destinations: [
    {
      id: 1,
      label: "Starting Destination",
      arrival_date: "2026-06-15",
      departure_date: "2026-06-22",
      has_laundry: false,
      order: 0,
      created_at: "2026-01-01T00:00:00Z",
      updated_at: "2026-01-15T00:00:00Z",
    },
  ],
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
    forecast_destinations: [],
  },
};

describe("mapTripPublicToDetail", () => {
  const result = mapTripPublicToDetail(fixture);

  it("maps trip.id to number", () => {
    expect(result.trip.id).to.equal(1);
  });

  it("maps trip.name", () => {
    expect(result.trip.name).to.equal("Summer in Paris");
  });

  it("maps trip.start_date from arrival_date", () => {
    expect(result.trip.start_date).to.equal("2026-06-15");
  });

  it("maps trip.end_date from departure_date", () => {
    expect(result.trip.end_date).to.equal("2026-06-22");
  });

  it("maps trip.updated_at from updated_at", () => {
    expect(result.trip.updated_at).to.equal("2026-01-15T00:00:00Z");
  });

  it("maps trip.created_at from created_at", () => {
    expect(result.trip.created_at).to.equal("2026-01-01T00:00:00Z");
  });

  it("maps overallDayWeather.highTemp from forecastTrip.day_high", () => {
    expect(result.overallDayWeather.highTemp).to.equal(78);
  });

  it("maps overallDayWeather.lowTemp from forecastTrip.day_low", () => {
    expect(result.overallDayWeather.lowTemp).to.equal(53);
  });

  it("maps overallNightWeather.highTemp from forecastTrip.night_high", () => {
    expect(result.overallNightWeather.highTemp).to.equal(68);
  });

  it("maps overallNightWeather.lowTemp from forecastTrip.night_low", () => {
    expect(result.overallNightWeather.lowTemp).to.equal(42);
  });

  it("maps destinations array with correct length", () => {
    expect(result.destinations).to.have.length(1);
  });

  it("maps destination.id to string", () => {
    expect(result.destinations[0].id).to.equal("1");
  });

  it("maps destination.name", () => {
    expect(result.destinations[0].name).to.equal("Paris");
  });

  it("maps destination.arrival_date and departure_date", () => {
    expect(result.destinations[0].arrival_date).to.equal("2026-06-15");
    expect(result.destinations[0].departure_date).to.equal("2026-06-22");
  });

  it("initializes travelers as empty array", () => {
    expect(result.travelers).to.deep.equal([]);
  });
});
