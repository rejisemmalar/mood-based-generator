export function BirdsLayer() {
  return (
    <div className="birds-layer">
      <svg className="bird bird-1" viewBox="0 0 60 30">
        <path
          className="wing left"
          d="M30 15 Q10 5 2 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          className="wing right"
          d="M30 15 Q50 5 58 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>

      <svg className="bird bird-2" viewBox="0 0 60 30">
        <path
          className="wing left"
          d="M30 15 Q12 7 4 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          className="wing right"
          d="M30 15 Q48 7 56 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

export function TreeLayer() {
  return (
    <div className="tree-layer">
      <svg viewBox="0 0 300 500" className="tree-svg">
        {/* Trunk */}
        <path
          d="M150 500 C140 380 160 260 150 120"
          stroke="#5b3a29"
          strokeWidth="22"
          fill="none"
        />

        {/* Branches */}
        <path
          d="M150 380 C100 340 70 300 50 280"
          stroke="#5b3a29"
          strokeWidth="10"
          fill="none"
        />
        <path
          d="M150 260 C210 220 240 190 270 170"
          stroke="#5b3a29"
          strokeWidth="10"
          fill="none"
        />

        {/* Leaves group (moves with wind) */}
        <g className="tree-leaves">
          <circle cx="90" cy="170" r="65" fill="#22c55e" />
          <circle cx="140" cy="150" r="70" fill="#16a34a" />
          <circle cx="190" cy="170" r="60" fill="#22c55e" />
          <circle cx="120" cy="200" r="55" fill="#15803d" />
          <circle cx="170" cy="200" r="55" fill="#15803d" />
        </g>

        <g className="tree-leaves">
          <circle cx="25" cy="270" r="15" fill="#22c55e" />
          <circle cx="20" cy="300" r="20" fill="#16a34a" />
          <circle cx="50" cy="320" r="40" fill="#22c55e" />
          <circle cx="70" cy="280" r="35" fill="#15803d" />
        </g>
      </svg>
    </div>
  );
}

export function FallingLeaves({ count = 12 }) {
  return (
    <div className="leaves-layer">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="falling-leaf"
          style={{
            left: 70 + Math.random() * 30 + "%",
            animationDuration: 6 + Math.random() * 6 + "s",
            animationDelay: -Math.random() * 6 + "s",
          }}
        />
      ))}
    </div>
  );
}

export function GrassLayer({ blades = 160 }) {
  return (
    <div className="grass-layer">
      {Array.from({ length: blades }).map((_, i) => (
        <span
          key={i}
          className="grass-blade"
          style={{
            left: (i / blades) * 100 + "%",
            height: 20 + Math.random() * 40 + "px",
            animationDelay: Math.random() * 2 + "s",
            animationDuration: 2.5 + Math.random() * 2 + "s",
          }}
        />
      ))}
    </div>
  );
}

