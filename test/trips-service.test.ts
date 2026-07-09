import { expect } from "chai";
import { mapTripPublicToDetail } from "../src/utils/tripsMapper";
import type { TripPublic } from "../src/types/trip";

const fixture: TripPublic = {
  id: 1,
  name: "Summer in Paris",
  arrivalDate: "2026-06-15",
  departDate: "2026-06-22",
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-15T00:00:00Z",
  destinations: [
    {
      id: 1,
      name: "Paris",
      label: "Starting Destination",
      arrival_date: "2026-06-15",
      departure_date: "2026-06-22",
      nights: 7,
      has_laundry: false,
      order: 0,
    },
  ],
  forecastTrip: {
    id: 1,
    tripId: 1,
    cachedAt: "2026-06-14T00:00:00Z",
    dayConditions: { conditions: { sunny: 6, partly_cloudy: 2 }, total_hours: 8 },
    dayHigh: 78,
    dayLow: 53,
    nightConditions: { conditions: { clear: 7, cloudy: 1 }, total_hours: 8 },
    nightHigh: 68,
    nightLow: 42,
    forecastDestinations: [],
  },
};

describe("mapTripPublicToDetail", () => {
  const result = mapTripPublicToDetail(fixture);

  it("maps trip.id to string", () => {
    expect(result.trip.id).to.equal("1");
  });

  it("maps trip.name", () => {
    expect(result.trip.name).to.equal("Summer in Paris");
  });

  it("maps trip.start_date from arrivalDate", () => {
    expect(result.trip.start_date).to.equal("2026-06-15");
  });

  it("maps trip.end_date from departDate", () => {
    expect(result.trip.end_date).to.equal("2026-06-22");
  });

  it("maps trip.updated_at from updatedAt", () => {
    expect(result.trip.updated_at).to.equal("2026-01-15T00:00:00Z");
  });

  it("maps trip.created_at from createdAt", () => {
    expect(result.trip.created_at).to.equal("2026-01-01T00:00:00Z");
  });

  it("maps overallDayWeather.highTemp from forecastTrip.dayHigh", () => {
    expect(result.overallDayWeather.highTemp).to.equal(78);
  });

  it("maps overallDayWeather.lowTemp from forecastTrip.dayLow", () => {
    expect(result.overallDayWeather.lowTemp).to.equal(53);
  });

  it("maps overallNightWeather.highTemp from forecastTrip.nightHigh", () => {
    expect(result.overallNightWeather.highTemp).to.equal(68);
  });

  it("maps overallNightWeather.lowTemp from forecastTrip.nightLow", () => {
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

  it("maps destination.arrivalDate and departureDate", () => {
    expect(result.destinations[0].arrivalDate).to.equal("2026-06-15");
    expect(result.destinations[0].departureDate).to.equal("2026-06-22");
  });

  it("initializes travelers as empty array", () => {
    expect(result.travelers).to.deep.equal([]);
  });
});
