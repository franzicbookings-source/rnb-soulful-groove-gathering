"use client"

import { useEffect, useState } from 'react';

export default function FloatingElements() {
  const [elements, setElements] = useState<Array<{ id: number; x: number; y: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const butterflies = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
    }));
    setElements(butterflies);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute animate-float opacity-30"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            animationDelay: `${el.delay}s`,
            animationDuration: `${el.duration}s`,
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 4C10 4 8 5 7 7C6 9 6 11 7 12C6 11 4 10 3 10C2 10 1 11 1 12C1 13 2 14 3 14C4 14 6 13 7 12C6 13 6 15 7 17C8 19 10 20 12 20C14 20 16 19 17 17C18 15 18 13 17 12C18 13 20 14 21 14C22 14 23 13 23 12C23 11 22 10 21 10C20 10 18 11 17 12C18 11 18 9 17 7C16 5 14 4 12 4Z"
              fill="url(#goldGradient)"
              fillOpacity="0.8"
            />
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#B8860B" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  );
}
