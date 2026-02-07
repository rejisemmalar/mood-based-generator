import { useNavigate } from "react-router-dom";
import { useSound } from "../../context/soundContext";
import "../../styles/hamburger.css";

export default function HamburgerMenu({ open, onClose }) {
  const navigate = useNavigate();
  const { enabled, toggleSound } = useSound();

  return (
    <>
      {/* BACKDROP */}
      <div
        className={`menu-backdrop ${open ? "show" : ""}`}
        onClick={onClose}
      />

      {/* MENU PANEL */}
      <div className={`menu-panel ${open ? "menu-open" : ""}`}>
        {/* HEADER */}
        <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
          <h2
            className="fs-5 fw-semibold mb-0 moods-title"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            {"Moods".split("").map((char, i) => (
              <span key={i} className="mood-letter">
                {char}
              </span>
            ))}
          </h2>
          <button
            onClick={onClose}
            className="btn btn-sm btn-light fs-4 close-btn"
          >
            <i className="bi bi-x-circle-fill" style={{ color: "#dc143c" }}></i>
          </button>
        </div>

        {/* MOODS */}
        <div className={`menu-items ${open ? "show" : ""}`}>
          <MenuItem
            label="Sad"
            icon="bi-emoji-frown"
            path="/mood/sad"
            onClose={onClose}
          />
          <MenuItem
            label="Focused"
            icon="bi-bullseye"
            path="/mood/focused"
            onClose={onClose}
          />
          <MenuItem
            label="Energetic"
            icon="bi-lightning-charge"
            path="/mood/energetic"
            onClose={onClose}
          />
        </div>

        {/* FOOTER */}
        <div className="menu-footer p-3 border-top">
          <button
            onClick={toggleSound}
            className="btn btn-outline-secondary w-100"
          >
            {enabled ? "🔊 Sound ON" : "🔇 Sound OFF"}
          </button>
        </div>
      </div>
    </>
  );
}

function MenuItem({ label, icon, path, onClose }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate(path);
        onClose();
      }}
      className="menu-item btn d-flex align-items-center gap-3 text-start"
    >
      <i className={`bi ${icon} fs-4`}></i>
      <span className="fw-semibold">{label}</span>
      <i className="bi bi-chevron-right ms-auto opacity-50"></i>
    </button>
  );
}
