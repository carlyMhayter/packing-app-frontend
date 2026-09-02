export const TravelerType = Object.freeze({
  ADULT: "adult",
  CHILD: "child",
  INFANT: "infant",
  PET: "pet",
});

export const TemperatureUnit = Object.freeze({
  FAHRENHEIT: "fahrenheit",
  CELSIUS: "celsius",
});

export const FormStateValues = Object.freeze({
  idle: "idle",
  saving: "saving",
  saved: "saved",
  error: "error",
});

export const ClothingCategories = Object.freeze({
  tops: "tops",
  bottoms: "bottoms",
  dresses: "dresses",
  suits: "suits",
  outerwear: "outerwear",
  underwear: "underwear",
  socks: "socks",
  sleepwear: "sleepwear",
  footwear: "footwear",
  accessories: "accessories",
  activity_specific: "activity_specific",
});

export const ClothingPreferenceStandards = Object.freeze({
  ADULT: {
    tops: { rewear_days: 2, num_per_day: 1, type: "tops" },
    bottoms: { rewear_days: 4, num_per_day: 1, type: "bottoms" },
    dresses: { rewear_days: 3, num_per_day: 1, type: "dresses" },
    suits: { rewear_days: 2, num_per_day: 1, type: "suits" },
    outerwear: { rewear_days: 7, num_per_day: 1, type: "outerwear" },
    underwear: { rewear_days: 0, num_per_day: 1, type: "underwear" },
    socks: { rewear_days: 0, num_per_day: 1, type: "socks" },
  },
  CHILD: {
    tops: { rewear_days: 2, num_per_day: 1, type: "tops" },
    bottoms: { rewear_days: 4, num_per_day: 1, type: "bottoms" },
    dresses: { rewear_days: 3, num_per_day: 1, type: "dresses" },
    suits: { rewear_days: 2, num_per_day: 1, type: "suits" },
    outerwear: { rewear_days: 7, num_per_day: 1, type: "outerwear" },
    underwear: { rewear_days: 0, num_per_day: 1, type: "underwear" },
    socks: { rewear_days: 0, num_per_day: 1, type: "socks" },
  },
  INFANT: {
    tops: { rewear_days: 2, num_per_day: 1, type: "tops" },
    bottoms: { rewear_days: 4, num_per_day: 1, type: "bottoms" },
    dresses: { rewear_days: 3, num_per_day: 1, type: "dresses" },
    suits: { rewear_days: 2, num_per_day: 1, type: "suits" },
    outerwear: { rewear_days: 7, num_per_day: 1, type: "outerwear" },
    underwear: { rewear_days: 0, num_per_day: 1, type: "underwear" },
    socks: { rewear_days: 0, num_per_day: 1, type: "socks" },
  },
  PET: {},
});
