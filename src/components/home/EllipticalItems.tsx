import { useMemo } from "react";

const allImages = [
  "baby.png",
  "beachtowel.png",
  "camera.png",
  "cap.png",
  "charger.png",
  "comb.png",
  "dog.png",
  "floppyhat.png",
  "hairdryer.png",
  "highheel.png",
  "laptop.png",
  "largebrimhat.png",
  "lotion.png",
  "makeup.png",
  "man.png",
  "racket.png",
  "raincoat.png",
  "shaver.png",
  "snowboard.png",
  "sock.png",
  "sunscreen.png",
  "swimsuits.png",
  "tent.png",
  "tshirt.png",
  "umbrella.png",
  "undies.png",
];

function getRandomItems(arr: string[], count: number): string[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

interface OrbitItem {
  src: string;
  duration: number;
  delay: number;
  key: string;
}

function createOrbitItems(images: string[]): OrbitItem[] {
  return images.map((img, i) => ({
    src: new URL(`../../assets/bw/${img}`, import.meta.url).href,
    duration: 20 + Math.random() * 10,
    delay: (i / images.length) * -20, // evenly stagger so they're spread around
    // scale: 4,
    key: `${img}-${i}`,
  }));
}

export default function EllipticalItems() {
  const selectedImages = useMemo(() => getRandomItems(allImages, 10), []);

  const outerItems = useMemo(
    () => createOrbitItems(selectedImages.slice(0, 6)),
    [selectedImages],
  );

  return (
    <div className="elliptical-items" aria-hidden="true">
      {/* Outer ellipse — large, fills viewport */}
      {outerItems.map((item) => (
        <div
          key={`outer-${item.key}`}
          className="elliptical-item elliptical-outer"
          style={{
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
          }}
        >
          <img src={item.src} alt="" loading="lazy" />
        </div>
      ))}
    </div>
  );
}
