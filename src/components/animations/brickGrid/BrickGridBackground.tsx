import "./brick-grid.css";

const ROWS = 12;
const COLS = 20;

type BrickType = "static" | "left" | "right" | "up" | "down";

function getRandomBrickType(): BrickType {
  const r = Math.random();
  if (r < 0.88) return "static";      // ~88% stay still
  if (r < 0.91) return "left";
  if (r < 0.94) return "right";
  if (r < 0.97) return "up";
  return "down";
}

export default function BrickGridBackground() {
  const bricks: { key: string; type: BrickType; delay: number }[] = [];

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const type = getRandomBrickType();
      // Random delay between 0 and 20 seconds so they fire at different times
      const delay = type === "static" ? 0 : Math.random() * 20;
      bricks.push({ key: `${row}-${col}`, type, delay });
    }
  }

  return (
    <div className="brick-grid-bg" aria-hidden="true">
      {bricks.map((brick) => (
        <div
          key={brick.key}
          className={`brick brick-${brick.type}`}
          style={brick.type !== "static" ? { animationDelay: `${brick.delay}s` } : undefined}
        />
      ))}
    </div>
  );
}
