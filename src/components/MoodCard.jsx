import { useEffect, useRef, useState } from "react";
import useMoodContent from "../hooks/useMoodContent";
import "../styles/card.css";

export default function MoodCard({ mood, moodType }) {
  const cardRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const { content, loading, refresh } = useMoodContent(moodType);
  console.log(mood);

  useEffect(() => {
    setSelected(null);
    setIsCorrect(null);
  }, [content]);

  const handleAnswer = (option) => {
    if (selected) return;

    setSelected(option);
    setIsCorrect(option === content.correct);
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div
        ref={cardRef}
        data-mood={moodType}
        className={`mood-card text-center ${mood.cardBg} ${mood.glow}`}
      >
        {/* TITLE */}
        <h1 className={`mb-3 fw-semibold display-6 ${mood.textColor}`}>
          {mood.title}
        </h1>
        {/* CONTENT */}
        <div className="mb-4 content-box d-flex align-items-center justify-content-center">
          {loading && <p className="opacity-75">Loading…</p>}

          {!loading && content?.type === "text" && (
            <p className="mb-0">{content.text}</p>
          )}

          {!loading && content?.type === "action" && (
            <p className="mb-0">{content.text}</p>
          )}

          {!loading && content?.type === "puzzle" && (
            <div className="w-100 text-start">
              <p className="fw-semibold mb-3">{content.question}</p>

              <div className="d-grid gap-2">
                {content.options.map((opt, i) => {
                  const isSelected = selected === opt;
                  const isRight = opt === content.correct;

                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(opt)}
                      disabled={!!selected}
                      className={`btn text-start
              ${
                selected
                  ? isRight
                    ? "btn-success"
                    : isSelected
                      ? "btn-danger"
                      : "btn-outline-light"
                  : "btn-outline-light"
              }
            `}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {selected && (
                <p
                  className={`mt-3 fw-semibold ${isCorrect ? "text-success" : "text-danger"}`}
                >
                  {isCorrect
                    ? "✅ Correct! Great focus."
                    : "❌ Wrong. Try again next one!"}
                </p>
              )}
            </div>
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
