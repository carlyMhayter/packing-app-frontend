import "./styles/saverBar.css";
type Props = {
  status: string;
};

function SaverBar({ status }: Props) {
  const statusMessage = {
    idle: "...",
    saved: "Edits saved.",
    saving: "Saving edits...",
    error: "Error saving.",
  };
  return (
    <div className="saverbar-container">
      <div className={`status-detail ${status}`}>{statusMessage[status]}</div>
    </div>
  );
}

export default SaverBar;
