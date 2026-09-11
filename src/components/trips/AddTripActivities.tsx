import { useEffect, useMemo, useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import "./styles/tripDetail.css";

import {
  selectActivities,
  selectActivitiesError,
  selectActivitiesIsLoading,
  fetchAllActivitiesThunk,
} from "../../state/activitySlice";
import {
  ActivityContextTags,
  ActivityIndoorLocationTags,
  ActivityOutdoorLocationTags,
  ActivityOutdoorLocationTagStrings,
  ActivityIndoorLocationTagStrings,
  ActivityContextTagStrings,
} from "../../enums/enums";
import "./styles/addTripActivities.css";
import type { ActivityPublic, ActivityScoring } from "../../types/activities";

const ALL_TAGS = [
  ...Object.values(ActivityContextTags),
  ...Object.values(ActivityIndoorLocationTags),
  ...Object.values(ActivityOutdoorLocationTags),
];

interface AddTripActivitiesProps {
  selectedTags: string[];
  selectedActivityIds: number[];
  onTagsChange: (tags: string[]) => void;
  onActivityIdsChange: (ids: number[]) => void;
}

function AddTripActivities({
  selectedTags,
  selectedActivityIds,
  onTagsChange,
  onActivityIdsChange,
}: AddTripActivitiesProps) {
  const activities = useAppSelector(selectActivities);
  const error = useAppSelector(selectActivitiesError);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectActivitiesIsLoading);
  const [showAll, setShowAll] = useState(false);
  const [showSubCategories, setShowSubCategories] = useState<boolean>(true);

  const scoreAndSortActivities = useCallback(
    (activities: ActivityPublic[], selectedTags: string[]) => {
      return activities
        .map((activity: ActivityPublic) => {
          const score = activity.tags.filter((tag) =>
            selectedTags.includes(tag),
          ).length;
          return { ...activity, score };
        })
        .sort((a, b) => b.score - a.score);
    },
    [],
  );

  const scoredActivities = useMemo(
    () => scoreAndSortActivities(activities, selectedTags),
    [activities, selectedTags, scoreAndSortActivities],
  );

  useEffect(() => {
    if (activities) {
      dispatch(fetchAllActivitiesThunk());
    }
  }, [dispatch]);

  const toggleTag = (tag: string) => {
    const categoryHasBeenSelected = selectedTags.some((tag: string) =>
      (Object.values(ActivityContextTags) as string[]).includes(tag),
    );
    console.log("categoryHasBeenSelected", categoryHasBeenSelected);
    if (categoryHasBeenSelected) {
      setShowSubCategories(true);
    }

    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    onTagsChange(newTags);
  };

  const toggleActivity = (activityId: number) => {
    const newIds = selectedActivityIds.includes(activityId)
      ? selectedActivityIds.filter((id) => id !== activityId)
      : [...selectedActivityIds, activityId];
    onActivityIdsChange(newIds);
  };

  const selectedTagList = ALL_TAGS.filter((tag) => selectedTags.includes(tag));
  const unselectedTagList = ALL_TAGS.filter(
    (tag) => !selectedTags.includes(tag),
  );

  if (isLoading) {
    return <>isLoading</>;
  }

  if (error) {
    return <>{error}</>;
  }

  return (
    <div className="add-trip-activities">
      <div className="add-trip-activities-header">
        <h3>Tell us about your trip!</h3>{" "}
        <button
          className="btn-text clear-selections-button"
          type="button"
          onClick={() => {
            onTagsChange([]);
            onActivityIdsChange([]);
            setShowAll(false);
          }}
        >
          Clear all selections
        </button>
      </div>
      <p className="add-trip-activities-instructions">
        What sort of stuff will you be doing on this trip? Select all that
        apply:
      </p>
      <div className="category-group">
        {Object.values(ActivityContextTags).map((activity: string) => {
          const isSelected = selectedTags.includes(activity);
          return (
            <button
              type="button"
              key={`context-${activity}`}
              className={`${isSelected ? "selected" : ""} btn-secondary category-button`}
              onClick={() => toggleTag(activity)}
            >
              {
                ActivityContextTagStrings[
                  activity as string as keyof typeof ActivityContextTagStrings
                ]
              }
            </button>
          );
        })}
      </div>
      <div
        className={`all-other-activities ${showSubCategories ? "show" : ""}`}
      >
        <p className="add-trip-activities-instructions">
          If you&apos;re indoors, what&apos;s the vibe? Select all that apply:
        </p>
        <div className="category-group">
          {Object.values(ActivityIndoorLocationTags).map((activity: string) => {
            const isSelected = selectedTags.includes(activity);
            return (
              <button
                key={`indoor-${activity}`}
                type="button"
                className={`${isSelected ? "selected" : ""} btn-secondary category-button`}
                onClick={() => toggleTag(activity)}
              >
                {
                  ActivityIndoorLocationTagStrings[
                    activity as string as keyof typeof ActivityIndoorLocationTagStrings
                  ]
                }{" "}
              </button>
            );
          })}
        </div>
        <p className="add-trip-activities-instructions">
          If you&apos;re outdoors, where will you be? Select all that apply:
        </p>
        <div className="category-group">
          {Object.values(ActivityOutdoorLocationTags).map(
            (activity: string) => {
              const isSelected = selectedTags.includes(activity);
              return (
                <button
                  key={`outdoor-${activity}`}
                  type="button"
                  className={`${isSelected ? "selected" : ""} btn-secondary category-button`}
                  onClick={() => toggleTag(activity)}
                >
                  {
                    ActivityOutdoorLocationTagStrings[
                      activity as string as keyof typeof ActivityOutdoorLocationTagStrings
                    ]
                  }
                </button>
              );
            },
          )}
        </div>
        {/* All activities grouped by tag, with fade-out and Show All button */}
        <div className={`activities-container`}>
          {selectedTags.length > 0 && (
            <button
              className="show-all-button"
              type="button"
              onClick={() => setShowAll(true)}
            >
              Show all activities
            </button>
          )}

          {/* Selected tag groups (always visible) */}
          {selectedTagList.map((tag, index) => {
            const tagActivities = scoredActivities.filter((activity) =>
              (activity.tags as string[]).includes(tag),
            );
            if (tagActivities.length === 0) return null;

            return (
              <div
                key={`tag-${tag}-${index}`}
                className="activity-group-fade-in"
              >
                <h3 className="activity-group-header">{tag}</h3>
                <div className="activity-group">
                  {tagActivities.map((activity: ActivityScoring) => {
                    const isSelected = selectedActivityIds.includes(
                      activity.id,
                    );
                    return (
                      <button
                        key={`${tag}-${activity.id}`}
                        type="button"
                        className={`btn-secondary activity-button ${isSelected ? "selected-activity" : ""} ${activity.score ? `score-${activity.score}` : ""}`}
                        onClick={() => toggleActivity(activity.id)}
                      >
                        {activity.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Unselected tag groups (visible when showAll is true) */}
          <div
            className={`unselected-tag-groups ${showAll ? "show-all" : "faded"}}`}
          >
            {showAll &&
              unselectedTagList.map((tag) => {
                const tagActivities = scoredActivities.filter((activity) =>
                  (activity.tags as string[]).includes(tag),
                );
                if (tagActivities.length === 0) return null;

                return (
                  <div key={tag} className="activity-group-fade-in">
                    <h3 className="activity-group-header activity-group-header-unselected">
                      {tag}
                    </h3>
                    <div className="activity-group">
                      {tagActivities.map((activity: ActivityScoring) => {
                        const isSelected = selectedActivityIds.includes(
                          activity.id,
                        );
                        return (
                          <button
                            key={`${tag}-${activity.id}`}
                            type="button"
                            className={`btn-secondary activity-button ${isSelected ? "selected-activity" : ""} ${activity.score ? `score-${activity.score}` : ""}`}
                            onClick={() => toggleActivity(activity.id)}
                          >
                            {activity.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTripActivities;
