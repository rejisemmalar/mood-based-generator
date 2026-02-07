import { useRef } from "react";
import useMoodContent from "../hooks/useMoodContent";
import "../styles/card.css"

export default function MoodCard({ mood, moodType }) {
  const cardRef = useRef(null);
  const { content, loading, refresh } = useMoodContent(moodType);

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div
        ref={cardRef}
        className={`mood-card text-center ${mood.cardBg} ${mood.glow}`}
      >
        {/* TITLE */}
        <h1 className={`mb-3 fw-semibold display-6 ${mood.textColor}`}>
          {mood.title}
        </h1>

        {/* CONTENT */}
        <div className="mb-4 content-box d-flex align-items-center justify-content-center">
          {loading ? (
            <p className="opacity-75">Loading…</p>
          ) : content ? (
            <p className="mb-0">{content.text}</p>
          ) : (
            <p className="opacity-50">No content available</p>
          )}
        </div>

        {/* ACTION */}
        <button onClick={refresh} className="btn btn-outline-light px-4">
          New
        </button>

        
      </div>
    </div>
  );
}
