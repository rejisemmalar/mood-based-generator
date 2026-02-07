import { useEffect, useState } from "react";
import { focusPuzzles } from "../contents/focusPuzzles";
import { sadContent } from "../contents/sadContent";
import { energyActions } from "../contents/energyAction";

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function useMoodContent(mood) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadContent = async () => {
    setLoading(true);

    try {
      // SAD => Joke OR Quote
      if (mood === "sad") {
        if (Math.random() > 0.5) {
          // Joke API 
          const res = await fetch(
            "https://official-joke-api.appspot.com/jokes/random"
          );
          const data = await res.json();
          setContent({
            type: "text",
            text: `${data.setup} — ${data.punchline}`,
          });
        } else {
          // Quote API (Quotable) 
          const res = await fetch("https://api.quotable.io/random");
          const data = await res.json();
          setContent({
            type: "text",
            text: `"${data.content}" — ${data.author}`,
          });
        }
      }

      //  FOCUSED => PUZZLE (Trivia)
      if (mood === "focused") {
        const res = await fetch(
          "https://opentdb.com/api.php?amount=1&type=multiple"
        );
        const data = await res.json();

        if (data.results?.length) {
          setContent({
            type: "puzzle",
            question: data.results[0].question,
            correct: data.results[0].correct_answer,
            options: [
              ...data.results[0].incorrect_answers,
              data.results[0].correct_answer,
            ].sort(() => Math.random() - 0.5),
          });
        } else {
          setContent(random(focusPuzzles));
        }
      }

      // ENERGETIC =>  LOCAL ACTION
      if (mood === "energetic") {
        setContent({
          type: "action",
          text: random(energyActions),
        });
      }
    } catch (error) {
      console.warn("API failed, using fallback", error);

      //  FALLBACKS (always work)
      if (mood === "sad")
        setContent({
          type: "text",
          text: random(sadContent).text,
        });

      if (mood === "focused")
        setContent({
          type: "puzzle",
          ...random(focusPuzzles),
        });

      if (mood === "energetic")
        setContent({
          type: "action",
          text: random(energyActions),
        });
    }

    setLoading(false);
  };

  useEffect(() => {
    loadContent();
  }, [mood]);

  return { content, loading, refresh: loadContent };
}
