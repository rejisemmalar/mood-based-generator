import { useParams } from "react-router-dom";
import { useState } from "react";
import { MOODS } from "../config/mood";
import HamburgerMenu from "../components/common/HamBurgerMenu";
import MoodCard from "../components/MoodCard";
import "../styles/hamburger.css";
import "../styles/card.css"
import { BirdsLayer,  FallingLeaves, GrassLayer, TreeLayer } from "../components/animations/BirdsLayer";
import { Sky, Skyhaze, SunLayer } from "../components/animations/SunLayer";
import { RainLayer, WeatherScene } from "../components/animations/RainLayer";


export default function MoodPage() {
  const { moodType } = useParams();
  const mood = MOODS[moodType];
  const [menuOpen, setMenuOpen] = useState(false);

  if (!mood) return null;

  return (
    <div className={`mood-page mood-${moodType}`}>
      {/* Animated Background Layer */}
      {moodType === "sad" && <RainLayer />}
      {moodType === "sad" && <WeatherScene />}
      {moodType === "focused" && <BirdsLayer />}
      {moodType === "focused" && <TreeLayer />}
      {moodType === "focused" && <FallingLeaves />}
      {moodType === "focused" && <GrassLayer />}      
      {moodType === "energetic" && <SunLayer />}
      {moodType === "energetic" && <Skyhaze />}
      {moodType === "energetic" && <Sky />}

      {/* Hamburger */}
      <button
        onClick={() => setMenuOpen(true)}
        className="hamburger-btn btn d-flex align-items-center justify-content-center"
      >
        <i className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"} fs-3`} />
      </button>

      <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* CARD */}
      <div className="content-center">
        <MoodCard mood={mood} moodType={moodType} />
      </div>
    </div>
  );
}

