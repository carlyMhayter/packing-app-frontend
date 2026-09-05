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
  outerwear: "outerwear",
  underwear: "underwear",
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

export const TempPrefStandards = Object.freeze({
  cold: 65,
  cool: 65,
  warm: 56,
  hot: 56,
  unit: TemperatureUnit.FAHRENHEIT,
});

export const ActivityCategory = Object.freeze({
  SPECIAL_EVENT: "special_event",
  WORK_BUSINESS: "work_business",
  OUTDOOR_ADVENTURE: "outdoor_adventure",
  SPORTS: "sports",
  WELLNESS: "wellness",
  SOCIAL_ENTERTAINMENT: "social_entertainment",
});

export const SectionType = Object.freeze({
  ROUTINES: "routines",
  CLOTHING: "clothing",
  ACTIVITY_GEAR: "activity_gear",
  ELECTRONICS: "electronics",
  MEDICATIONS: "medications",
  DOCUMENTS: "documents",
  ANTI_THEFT: "anti_theft",
  MISC_COMFORT: "misc_comfort",
  FEMININE_HYGIENE: "feminine_hygiene",
  INFANT: "infant",
  PET: "pet",
  RENTAL_REMINDERS: "rental_reminders",
});

export const MeasurementUnit = Object.freeze({
  FL_OZ: "fl_oz",
  OZ: "oz",
  ML: "ml",
  G: "g",
  COUNT: "count",
});

export const ItemType = Object.freeze({
  PRODUCT: "product",
  GEAR: "gear",
  CLOTHING: "clothing",
  ELECTRONICS: "electronics",
  DOCUMENT: "document",
});

export const PackOrRent = Object.freeze({
  PACK: "pack",
  RENT: "rent",
});

export const ClothingSubCategory = Object.freeze({
  DRESSY: "dressy",
  CASUAL: "casual",
  WARM: "warm",
  LIGHT: "light",
  HEAVY: "heavy",
});

export const GroomingCategory = Object.freeze({
  HAIR_CARE: "hair_care",
  SKIN_CARE: "skin_care",
  BODY_CARE: "body_care",
  HYGIENE: "hygiene",
  NAIL_CARE: "nail_care",
  MAKEUP: "makeup",
  MAKEUP_TOOLS: "makeup_tools",
  FRAGRANCE: "fragrance",
  FEMININE_HYGIENE: "feminine_hygiene",
  SHAVING: "shaving",
});

export const PackingListStatus = Object.freeze({
  DRAFT: "draft",
  GENERATED: "generated",
});
