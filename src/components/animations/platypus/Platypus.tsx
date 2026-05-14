import platyImg from "../../../assets/platy_transparent.png";
import "./platypus-css.css";

export default function Platypus() {
  return (
    <div className="platypus-scene">
      <div className="platypus-wrapper">
        <img
          src={platyImg}
          alt="Animated platypus"
          className="platypus-img"
        />

        {/* Eyelid overlays - positioned over the PNG eyes */}
        <div className="platypus-eye eye-top">
          <div className="eyelid" />
        </div>

        <div className="platypus-eye eye-bottom">
          <div className="eyelid" />
        </div>
      </div>
    </div>
  );
}
