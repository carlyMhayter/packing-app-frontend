export interface TripTraveler {
  traveler_id: number;
  trip_id: number;
  is_organizer: boolean;
}

export interface TripTravelerPublic extends TripTraveler {
  created_at: Date;
  updated_at: Date;
  id: number;
}
