import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import {
  selectGeneratedLists,
  selectPackingListIsLoading,
  selectPackingListError,
} from "../../state/packingListSlice";
import { selectTrip } from "../../state/tripSlice";
import LoadingDots from "../basic/loading";
import "./styles/packingLists.css";

export default function MasterListPage() {
  const navigate = useNavigate();
  const generatedLists = useAppSelector(selectGeneratedLists);
  const isLoading = useAppSelector(selectPackingListIsLoading);
  const error = useAppSelector(selectPackingListError);
  const trip = useAppSelector(selectTrip);

  if (isLoading) {
    return (
      <div className="packing-lists-page">
        <div className="packing-lists-loading">
          <LoadingDots />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="packing-lists-page">
        <div className="error-banner">{error}</div>
      </div>
    );
  }

  return (
    <div className="packing-lists-page">
      <h1 className="packing-lists-title">
        Packing Lists for {trip.name || "Trip"}
      </h1>
      <div className="packing-lists-grid">
        {generatedLists.map((item) => {
          const traveler = trip.travelers?.find(
            (t) => t.id === item.traveler_id,
          );
          return (
            <div
              key={item.list.id}
              className="packing-list-card"
              onClick={() => navigate(`/lists/${item.list.id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  navigate(`/lists/${item.list.id}`);
                }
              }}
            >
              <h2 className="packing-list-card-title">
                {traveler?.name ?? `Traveler ${item.traveler_id}`}
              </h2>
              <div className="packing-list-card-meta">
                <span className="packing-list-status">
                  Status: {item.list.status}
                </span>
                <span className="packing-list-items">
                  Items: {item.list.checked_items} / {item.list.total_items}{" "}
                  checked
                </span>
              </div>
              {item.list.generated_at && (
                <p className="packing-list-generated">
                  Generated:{" "}
                  {new Date(item.list.generated_at).toLocaleDateString()}
                </p>
              )}
            </div>
          );
        })}
      </div>
      {generatedLists.length === 0 && (
        <p className="packing-lists-empty">
          No packing lists generated yet. Go back and click "Make List" on the
          trip page.
        </p>
      )}
    </div>
  );
}
