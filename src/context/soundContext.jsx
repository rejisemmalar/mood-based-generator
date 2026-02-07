import { createContext, useContext, useRef, useState } from "react";

const SoundContext = createContext();

export function SoundProvider({ children }) {
  const audioRef = useRef(null);
  const [enabled, setEnabled] = useState(true);

  const playSound = (src) => {
    if (!enabled) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.6;
    audio.play();

    audioRef.current = audio;
  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  };

  const toggleSound = () => {
    if (enabled) {
      stopSound();
    }
    setEnabled(!enabled);
  };

  return (
    <SoundContext.Provider
      value={{ playSound, stopSound, toggleSound, enabled }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export const useSound = () => useContext(SoundContext);
