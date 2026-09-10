import WeatherIcon from "../weatherIcon/WeatherIcon";
import Tooltip from "../basic/tooltip";

type Props = {
  aggregatedConditions: [string, number][];

  totalHours: number;
};

function ConditionsWIcons({ aggregatedConditions, totalHours }: Props) {
  return (
    <>
      {aggregatedConditions.map((element: [string, number]) => {
        const percentage = Math.round((element[1] / totalHours) * 100);

        return (
          <Tooltip
            content={`${element[0]} ${percentage}% of the time`}
            key={element[0]}
          >
            <div className="weather-summary-card">
              <div className="weather-icon">
                <WeatherIcon condition={element[0]} />
              </div>
              <div>{percentage}% of the time</div>
            </div>
          </Tooltip>
        );
      })}
    </>
  );
}

export default ConditionsWIcons;
