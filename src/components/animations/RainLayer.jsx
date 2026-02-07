export function RainLayer({ count = 80 }) {
  return (
    <div className="rain-layer">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="raindrop"
          style={{
            left: Math.random() * 100 + "%",
            animationDuration: 0.6 + Math.random() * 1.2 + "s",
            animationDelay: -Math.random() * 2 + "s",
          }}
        />
      ))}
    </div>
  );
}

export function WeatherScene({ rainCount = 80, cloudCount = 6 }) {
  return (
    <div className="weather-scene">
      <div className="skys" />

      <div className="cloud-layer">
        {Array.from({ length: cloudCount }).map((_, i) => (
          <span
            key={i}
            className="cloud"
            style={{
              top: Math.random() * 40 + "%",
              animationDuration: 40 + Math.random() * 40 + "s",
              animationDelay: -Math.random() * 40 + "s",
              transform: `scale(${0.6 + Math.random() * 0.8})`,
            }}
          />
        ))}
      </div>

      <RainLayer count={rainCount} />
    </div>
  );
}
