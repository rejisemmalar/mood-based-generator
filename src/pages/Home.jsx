import { useNavigate } from "react-router-dom";
import "../styles/main.css";
import { MOOD_SOUNDS } from "../config/sound";
import { useSound } from "../context/soundContext";

function Home() {
    const navigate = useNavigate();
    const {playSound} = useSound();

    const selectMood = (mood) => {
    playSound(MOOD_SOUNDS[mood]); 
    navigate(`/mood/${mood}`);
  };

  return (
    <div className="home-wrapper vh-100 position-relative overflow-hidden">
      <div className="weather-bg">
        <div className="clouds cloud-1"></div>
        <div className="clouds cloud-2"></div>
        <div className="clouds cloud-3"></div>
      </div>
      <div className="vh-100 d-flex flex-column align-items-center justify-content-center gap-4">
        <h1 className="fw-bold display-5">How Are You Felling ?</h1>

        <div className="d-flex gap-3">
          <button
            className="mood-btn sad"
              onClick={() => selectMood("sad")}
          >
            <i className="bi bi-emoji-frown"></i> 
            <span>Sad</span>
          </button>

          <button
            className="mood-btn focused"
              onClick={() => selectMood("focused")}
          >
            <i className="bi bi-bullseye"></i> 
            <span>Focused</span>
          </button>

          <button
            className="mood-btn energetic"
              onClick={() => selectMood("energetic")}
          >
            <i className="bi bi-lightning-charge"></i>
            <span>Energetic</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
