import { useEffect, useState } from "react";

export default function useBreathingText(active) {
  const [text, setText] = useState("Inhale");

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      setText((prev) => (prev === "Inhale" ? "Exhale" : "Inhale"));
    }, 3000); // matches animation timing

    return () => clearInterval(interval);
  }, [active]);

  return text;
}
