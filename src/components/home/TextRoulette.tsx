import { useEffect, useRef, useState } from "react";

const phrases = [
  "where you'll have access to laundry machines",
  "what your grooming routine is",
  "if you're going to any special events",
  "if you're working",
  "if you're playing a sport",
  "if you're camping",
];

const ITEM_HEIGHT = 48;

export default function TextRoulette() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevIndexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        prevIndexRef.current = prev;
        return (prev + 1) % phrases.length;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getOffset = (itemIndex: number, centerIndex: number) => {
    let offset = itemIndex - centerIndex;
    if (offset > phrases.length / 2) offset -= phrases.length;
    if (offset < -phrases.length / 2) offset += phrases.length;
    return offset;
  };

  const prevOffsets = phrases.map((_, i) => getOffset(i, prevIndexRef.current));

  return (
    <div className="text-roulette">
      <div className="text-roulette-track">
        {phrases.map((phrase, i) => {
          const offset = getOffset(i, currentIndex);
          const prevOffset = prevOffsets[i];
          const jumped = Math.abs(offset - prevOffset) > 2;
          const absOffset = Math.abs(offset);
          const opacity = Math.max(0, 1 - absOffset * 0.4);
          const translateY = offset * ITEM_HEIGHT;

          return (
            <div
              key={i}
              className={`text-roulette-item ${
                offset === 0 ? "is-center" : ""
              } ${jumped ? "no-transition" : ""}`}
              style={{
                transform: `translate(-50%, -50%) translateY(${translateY}px)`,
                opacity,
                zIndex: 10 - absOffset,
              }}
            >
              {phrase}
            </div>
          );
        })}
      </div>
    </div>
  );
}
