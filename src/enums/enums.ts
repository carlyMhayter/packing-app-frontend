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
  sleepwear_lounge: "slsleepwear_loungeeepwear",
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
    sleepwear_lounge: {
      rewear_days: 2,
      num_per_day: 1,
      type: "sleepwear_lounge",
    },
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
  cold: 32,
  cool: 55,
  warm: 75,
  hot: 90,
  unit: TemperatureUnit.FAHRENHEIT,
});

export const ActivityCategory = Object.freeze({
  SPECIAL_EVENT: "special_event",
  WORK_BUSINESS: "work_business",
  OUTDOOR_ADVENTURE: "outdoor_adventure",
  SPORTS: "sports",
  WELLNESS: "wellness",
  ARTS_CULTURE: "arts_culture",
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

export const ActivityContextTags = Object.freeze({
  SOCIAL: "social",
  FRIENDS_FAMILY: "friends_family",
  WELLNESS: "wellness",
  BUSINESS: "business",
  ARTS_CULTURAL: "arts_cultural",
  RELAXATION: "relaxation",
  ADVENTURE: "adventure",
  ATHLETIC_SPORT: "athletic_sport",
});

export const ActivityContextTagStrings = Object.freeze({
  [ActivityContextTags.SOCIAL]: "Social",
  [ActivityContextTags.FRIENDS_FAMILY]: "Friends & Family",
  [ActivityContextTags.WELLNESS]: "Wellness",
  [ActivityContextTags.BUSINESS]: "Business",
  [ActivityContextTags.ARTS_CULTURAL]: "Arts & Culture",
  [ActivityContextTags.RELAXATION]: "Relaxation",
  [ActivityContextTags.ADVENTURE]: "Adventure",
  [ActivityContextTags.ATHLETIC_SPORT]: "Athletic or Sports",
});

export const ActivityOutdoorLocationTags = Object.freeze({
  SNOW: "snow",
  MOUNTAINS: "mountains",
  CITY_TOWN: "city_town",
  BEACH_OCEAN: "beach_ocean",
  LAKE: "lake",
  DESERT: "desert",
  RIVER: "river",
  FOREST: "forest",
  JUNGLE: "jungle",
  PARK: "park",
});

export const ActivityOutdoorLocationTagStrings = Object.freeze({
  [ActivityOutdoorLocationTags.SNOW]: "Snow",
  [ActivityOutdoorLocationTags.MOUNTAINS]: "Mountains",
  [ActivityOutdoorLocationTags.CITY_TOWN]: "City or Town",
  [ActivityOutdoorLocationTags.BEACH_OCEAN]: "Beach & Ocean",
  [ActivityOutdoorLocationTags.LAKE]: "Lake",
  [ActivityOutdoorLocationTags.DESERT]: "Desert",
  [ActivityOutdoorLocationTags.RIVER]: "River",
  [ActivityOutdoorLocationTags.FOREST]: "Forest",
  [ActivityOutdoorLocationTags.JUNGLE]: "Jungle",
  [ActivityOutdoorLocationTags.PARK]: "Park",
});

export const ActivityIndoorLocationTags = Object.freeze({
  CASUAL: "casual",
  UPSCALE: "upscale",
  BLACK_TIE: "black_tie",
  BUSINESS: "business",
});

export const ActivityIndoorLocationTagStrings = Object.freeze({
  [ActivityIndoorLocationTags.CASUAL]: "Casual",
  [ActivityIndoorLocationTags.UPSCALE]: "Upscale",
  [ActivityIndoorLocationTags.BLACK_TIE]: "Black Tie",
  [ActivityIndoorLocationTags.BUSINESS]: "Business",
});

export const WeatherConditionCategory = Object.freeze({
  CLEAR: "clear",
  CLOUDS: "clouds",
  RAIN: "rain",
  THUNDERSTORM: "thunderstorm",
  SNOW: "snow",
  FOG_MIST: "fog_mist",
  DUST_POLLUTION: "dust_pollution",
});

export const WeatherConditionCodes = Object.freeze({
  1000: WeatherConditionCategory.CLEAR,
  1003: WeatherConditionCategory.CLOUDS,
  1006: WeatherConditionCategory.CLOUDS,
  1009: WeatherConditionCategory.CLOUDS,
  1063: WeatherConditionCategory.RAIN,
  1150: WeatherConditionCategory.RAIN,
  1153: WeatherConditionCategory.RAIN,
  1168: WeatherConditionCategory.RAIN,
  1171: WeatherConditionCategory.RAIN,
  1180: WeatherConditionCategory.RAIN,
  1183: WeatherConditionCategory.RAIN,
  1186: WeatherConditionCategory.RAIN,
  1189: WeatherConditionCategory.RAIN,
  1192: WeatherConditionCategory.RAIN,
  1195: WeatherConditionCategory.RAIN,
  1198: WeatherConditionCategory.RAIN,
  1201: WeatherConditionCategory.RAIN,
  1240: WeatherConditionCategory.RAIN,
  1243: WeatherConditionCategory.RAIN,
  1246: WeatherConditionCategory.RAIN,
  1204: WeatherConditionCategory.RAIN,
  1207: WeatherConditionCategory.RAIN,
  1069: WeatherConditionCategory.RAIN,
  1072: WeatherConditionCategory.RAIN,
  1087: WeatherConditionCategory.THUNDERSTORM,
  1273: WeatherConditionCategory.THUNDERSTORM,
  1276: WeatherConditionCategory.THUNDERSTORM,
  1279: WeatherConditionCategory.THUNDERSTORM,
  1282: WeatherConditionCategory.THUNDERSTORM,
  1066: WeatherConditionCategory.SNOW,
  1114: WeatherConditionCategory.SNOW,
  1210: WeatherConditionCategory.SNOW,
  1213: WeatherConditionCategory.SNOW,
  1216: WeatherConditionCategory.SNOW,
  1219: WeatherConditionCategory.SNOW,
  1222: WeatherConditionCategory.SNOW,
  1225: WeatherConditionCategory.SNOW,
  1237: WeatherConditionCategory.SNOW,
  1255: WeatherConditionCategory.SNOW,
  1258: WeatherConditionCategory.SNOW,
  1261: WeatherConditionCategory.SNOW,
  1264: WeatherConditionCategory.SNOW,
  1012: WeatherConditionCategory.FOG_MIST,
  1030: WeatherConditionCategory.FOG_MIST,
  1033: WeatherConditionCategory.FOG_MIST,
  1036: WeatherConditionCategory.FOG_MIST,
  1039: WeatherConditionCategory.FOG_MIST,
  1042: WeatherConditionCategory.FOG_MIST,
  1135: WeatherConditionCategory.FOG_MIST,
  1147: WeatherConditionCategory.FOG_MIST,
  1015: WeatherConditionCategory.DUST_POLLUTION,
  1018: WeatherConditionCategory.DUST_POLLUTION,
  1021: WeatherConditionCategory.DUST_POLLUTION,
  1024: WeatherConditionCategory.DUST_POLLUTION,
  1027: WeatherConditionCategory.DUST_POLLUTION,
  1045: WeatherConditionCategory.DUST_POLLUTION,
  1048: WeatherConditionCategory.DUST_POLLUTION,
});
