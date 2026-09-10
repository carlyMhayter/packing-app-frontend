import { WeatherConditionCategory } from "../../enums/enums";

type WeatherConditionValue =
  (typeof WeatherConditionCategory)[keyof typeof WeatherConditionCategory];

interface WeatherIconProps {
  condition: WeatherConditionValue;
  size?: number;
}

export default function WeatherIcon({
  condition,
  size = 24,
}: WeatherIconProps) {
  const icons: Record<WeatherConditionValue, React.ReactNode> = {
    [WeatherConditionCategory.CLEAR]: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width={size}
        height={size}
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
    [WeatherConditionCategory.CLOUDS]: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width={size}
        height={size}
      >
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
    [WeatherConditionCategory.RAIN]: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width={size}
        height={size}
      >
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        <line x1="8" y1="22" x2="8" y2="24" />
        <line x1="12" y1="22" x2="12" y2="24" />
        <line x1="16" y1="22" x2="16" y2="24" />
      </svg>
    ),
    [WeatherConditionCategory.THUNDERSTORM]: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width={size}
        height={size}
      >
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        <polyline points="13 16 11 20 15 20 13 24" />
      </svg>
    ),
    [WeatherConditionCategory.SNOW]: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width={size}
        height={size}
      >
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        <circle cx="8" cy="22" r="1" />
        <circle cx="12" cy="22" r="1" />
        <circle cx="16" cy="22" r="1" />
      </svg>
    ),
    [WeatherConditionCategory.FOG_MIST]: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width={size}
        height={size}
      >
        <line x1="4" y1="8" x2="20" y2="8" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="4" y1="16" x2="20" y2="16" />
      </svg>
    ),
    [WeatherConditionCategory.DUST_POLLUTION]: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width={size}
        height={size}
      >
        <circle cx="9" cy="9" r="5" />
        <circle cx="17" cy="11" r="4" opacity="0.6" />
        <circle cx="7" cy="17" r="3" opacity="0.4" />
      </svg>
    ),
  };

  const colors: Record<WeatherConditionValue, string> = {
    [WeatherConditionCategory.CLEAR]: "var(--lemonVVDark)",
    [WeatherConditionCategory.CLOUDS]: "var(--dustyGrapeDark)",
    [WeatherConditionCategory.RAIN]: "var(--steelBlueVVDark)",
    [WeatherConditionCategory.THUNDERSTORM]: "var(--mahogany)",
    [WeatherConditionCategory.SNOW]: "var(--steelBlueVVLt)",
    [WeatherConditionCategory.FOG_MIST]: "var(--dustyGrapeLt)",
    [WeatherConditionCategory.DUST_POLLUTION]: "var(--vanillaCustardVVDark)",
  };

  return (
    <span
      className="weather-icon"
      style={{ color: colors[condition], display: "inline-flex" }}
      aria-label={condition}
    >
      {icons[condition]}
    </span>
  );
}
