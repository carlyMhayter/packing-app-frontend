import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import {
  selectPackingListById,
  selectPackingListIsLoading,
  selectPackingListError,
} from "../../state/packingListSlice";
import { selectTrip } from "../../state/tripSlice";
import LoadingDots from "../basic/loading";
import "./styles/packingLists.css";

export default function ListPage() {
  const { list_id } = useParams<{ list_id: string }>();
  const navigate = useNavigate();
  const listItem = useAppSelector((state) =>
    selectPackingListById(state, Number(list_id)),
  );
  const isLoading = useAppSelector(selectPackingListIsLoading);
  const error = useAppSelector(selectPackingListError);
  const trip = useAppSelector(selectTrip);

  if (isLoading) {
    return (
      <div className="packing-list-detail-page">
        <div className="packing-lists-loading">
          <LoadingDots />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="packing-list-detail-page">
        <div className="error-banner">{error}</div>
      </div>
    );
  }

  if (!listItem) {
    return (
      <div className="packing-list-detail-page">
        <div className="error-banner">Packing list not found</div>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  const { list, skeleton, traveler_id } = listItem;
  const traveler = trip.travelers?.find((t) => t.id === traveler_id);

  return (
    <div className="packing-list-detail-page">
      <div className="packing-list-detail-header">
        <button
          type="button"
          className="btn-text back-button"
          onClick={() => navigate(-1)}
        >
          &larr; Back
        </button>
        <h1 className="packing-list-detail-title">
          {traveler?.name ?? `Traveler ${traveler_id}`}&apos;s Packing List
        </h1>
      </div>

      <div className="packing-list-info">
        <div className="info-row">
          <span className="info-label">Status:</span>
          <span className="info-value">{list.status}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Total Items:</span>
          <span className="info-value">{list.total_items}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Checked Items:</span>
          <span className="info-value">{list.checked_items}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Source:</span>
          <span className="info-value">{list.source}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Private:</span>
          <span className="info-value">{list.is_private ? "Yes" : "No"}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Shareable:</span>
          <span className="info-value">
            {list.is_shareable ? "Yes" : "No"}
          </span>
        </div>
        {list.generated_at && (
          <div className="info-row">
            <span className="info-label">Generated:</span>
            <span className="info-value">
              {new Date(list.generated_at).toLocaleString()}
            </span>
          </div>
        )}
      </div>

      <div className="packing-list-skeleton">
        <h2 className="skeleton-title">Skeleton Data</h2>
        <pre className="skeleton-code">
          {JSON.stringify(skeleton, null, 2)}
        </pre>
      </div>
    </div>
  );
}
