import {
  type TripPublic,
  type TripDetailData,
  type DestinationSummary,
  type WeatherCondition,
  type Traveler,
} from "../types/trip";

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
      conditions: toWeatherConditions(
        Object.keys(t.forecastTrip.dayConditions.conditions),
      ),
    },
    overallNightWeather: {
      highTemp: t.forecastTrip.nightHigh,
      lowTemp: t.forecastTrip.nightLow,
      conditions: toWeatherConditions(
        Object.keys(t.forecastTrip.nightConditions.conditions),
      ),
    },
    destinations,
    travelers,
  };
}
