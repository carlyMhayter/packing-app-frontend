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
  const destinations: DestinationSummary[] = trip.destinations.map((dest) => {
    const forecast = trip.forecastTrip.forecast_destinations.find(
      (f) => f.destination_id === dest.id,
    );
    return {
      id: String(dest.id),
      name: dest.name,
      location: dest.address?.full_name ?? dest.name,
      arrival_date: dest.arrival_date,
      departureDate: dest.departure_date,
      dayWeather: {
        highTemp: forecast?.day_high ?? trip.forecastTrip.day_high,
        lowTemp: forecast?.day_low ?? trip.forecastTrip.day_low,
        conditions: toWeatherConditions(
          forecast
            ? Object.keys(forecast.day_conditions.conditions)
            : Object.keys(trip.forecastTrip.day_conditions.conditions),
        ),
      },
      nightWeather: {
        highTemp: forecast?.night_high ?? trip.forecastTrip.night_high,
        lowTemp: forecast?.night_low ?? trip.forecastTrip.night_low,
        conditions: toWeatherConditions(
          forecast
            ? Object.keys(forecast.night_conditions.conditions)
            : Object.keys(trip.forecastTrip.night_conditions.conditions),
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
      id: String(trip.id),
      name: trip.name,
      start_date: trip.arrival_date,
      end_date: trip.departure_date,
      updated_at: trip.updated_at,
      created_at: trip.created_at,
    },
    overallDayWeather: {
      highTemp: trip.forecastTrip.day_high,
      lowTemp: trip.forecastTrip.day_low,
      conditions: toWeatherConditions(
        Object.keys(trip.forecastTrip.day_conditions.conditions),
      ),
    },
    overallNightWeather: {
      highTemp: trip.forecastTrip.night_high,
      lowTemp: trip.forecastTrip.night_low,
      conditions: toWeatherConditions(
        Object.keys(trip.forecastTrip.night_conditions.conditions),
      ),
    },
    destinations,
    travelers,
  };
}
