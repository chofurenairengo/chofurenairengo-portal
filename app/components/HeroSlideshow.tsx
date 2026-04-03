"use client";

import { useEffect, useState } from "react";

const IMAGES = [
  "/images/IMG_0026.jpg",
  "/images/IMG_0027.jpg",
  "/images/renai.png",
  "/images/era.jpg",
  "/images/saegi.png",
];

function shuffle(arr: string[]): string[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function HeroSlideshow() {
  const [order] = useState(() => shuffle(IMAGES));
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrev((c) => c);
      setCurrent((c) => (c + 1) % order.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [order.length]);

  return (
    <div className="hero-slideshow" aria-hidden="true">
      {order.map((src, i) => (
        <div
          key={src}
          className={`hero-slide ${i === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
    </div>
  );
}
