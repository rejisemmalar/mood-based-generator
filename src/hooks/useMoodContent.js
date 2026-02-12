import { useEffect, useState, useCallback } from "react";
import { focusPuzzles } from "../contents/focusPuzzles";
import { sadContent } from "../contents/sadContent";
import { energyActions } from "../contents/energyAction";

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* ---- SAFE FETCH (timeout + fallback) ---- */
const safeFetch = async (url, timeout = 5000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
};

export default function useMoodContent(mood) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadContent = useCallback(async () => {
    setLoading(true);
    setContent(null); // keeps card size stable

    /* ================= SAD ================= */
    if (mood === "sad") {
      try {
        // ONLY jokes API (stable)
        const data = await safeFetch(
          "https://official-joke-api.appspot.com/jokes/random",
        );

        setContent({
          type: "text",
          text: `${data.setup} — ${data.punchline}`,
        });
      } catch {
        setContent({
          type: "text",
          text: random(sadContent).text,
        });
      }
    }

    /* ================= FOCUSED ================= */
    // if (mood === "focused") {
    //   try {
    //     const data = await safeFetch(
    //       "https://opentdb.com/api.php?amount=1&type=multiple"
    //     );

    //     if (data.results?.length) {
    //       const q = data.results[0];
    //       setContent({
    //         type: "puzzle",
    //         question: q.question,
    //         correct: q.correct_answer,
    //         options: [...q.incorrect_answers, q.correct_answer].sort(
    //           () => Math.random() - 0.5
    //         ),
    //       });
    //     } else {
    //       setContent(random(focusPuzzles));
    //     }
    //   } catch {
    //     // GUARANTEED focused fallback
    //     setContent(random(focusPuzzles));
    //   }
    // }
    if (mood === "focused") {
      const puzzle = random(focusPuzzles);

      setContent({
        type: "puzzle",
        question: puzzle.question,
        correct: puzzle.correct,
        options: puzzle.options,
      });
    }

    /* ================= ENERGETIC ================= */
    if (mood === "energetic") {
      setContent({
        type: "action",
        text: random(energyActions),
      });
    }

    setLoading(false);
  }, [mood]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  return {
    content,
    loading,
    refresh: loadContent,
  };
}
