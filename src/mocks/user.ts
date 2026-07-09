import { type User } from "../types/user";

export const mockUser: User = {
  id: 1,
  email: "carly@example.com",
  name: "Carly Hayter",
  username: "carlyh",
  language: "en",
  timezone: "America/New_York",
  unit: "imperial",
  notifications: {
    email: true,
    weather: true,
    packing: false,
  },
};
