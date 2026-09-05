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

export function mapTripPublicToDetail(trip: TripPublic): TripDetailData {
  const forecastTrip = trip.forecast_trip;

  const destinations: DestinationSummary[] = trip.destinations.map((dest) => {
    const forecast = forecastTrip?.forecast_destinations.find(
      (f) => f.destination_id === dest.id,
    );
    return {
      id: String(dest.id),
      name: dest.label,
      location: dest.address?.full_name ?? dest.label,
      arrival_date: dest.arrival_date,
      departure_date: dest.departure_date,
      dayWeather: {
        highTemp: forecast?.day_high ?? forecastTrip?.day_high ?? 0,
        lowTemp: forecast?.day_low ?? forecastTrip?.day_low ?? 0,
        conditions: toWeatherConditions(
          forecast
            ? Object.keys(forecast.day_conditions.conditions)
            : forecastTrip
              ? Object.keys(forecastTrip.day_conditions.conditions)
              : [],
        ),
      },
      nightWeather: {
        highTemp: forecast?.night_high ?? forecastTrip?.night_high ?? 0,
        lowTemp: forecast?.night_low ?? forecastTrip?.night_low ?? 0,
        conditions: toWeatherConditions(
          forecast
            ? Object.keys(forecast.night_conditions.conditions)
            : forecastTrip
              ? Object.keys(forecastTrip.night_conditions.conditions)
              : [],
        ),
      },
      sunrise: "",
      sunset: "",
      dailyWeather: [],
    };
  });

  const travelers: Traveler[] = [];

  return {
    trip: {
      id: trip.id,
      name: trip.name,
      start_date: trip.arrival_date,
      end_date: trip.departure_date,
      updated_at: trip.updated_at,
      created_at: trip.created_at,
    },
    overallDayWeather: {
      highTemp: forecastTrip?.day_high ?? 0,
      lowTemp: forecastTrip?.day_low ?? 0,
      conditions: toWeatherConditions(
        forecastTrip
          ? Object.keys(forecastTrip.day_conditions.conditions)
          : [],
      ),
    },
    overallNightWeather: {
      highTemp: forecastTrip?.night_high ?? 0,
      lowTemp: forecastTrip?.night_low ?? 0,
      conditions: toWeatherConditions(
        forecastTrip
          ? Object.keys(forecastTrip.night_conditions.conditions)
          : [],
      ),
    },
    destinations,
    travelers,
  };
}
