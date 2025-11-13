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
    <>
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
      
      {/* Mobile: Single 3D Flying Bird */}
      <div className="sm:hidden fixed inset-0 pointer-events-none overflow-hidden z-40" style={{ perspective: '1000px' }}>
        <div className="absolute animate-fly-across-3d" style={{ top: '40%' }}>
          <div className="animate-flap-3d" style={{ transformStyle: 'preserve-3d' }}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2C12 2 8 4 6 8C4 12 4 16 6 18C8 20 12 22 12 22M12 2C12 2 16 4 18 8C20 12 20 16 18 18C16 20 12 22 12 22M12 2V8M4 12H20"
                stroke="#000000"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="#000000"
                fillOpacity="0.3"
                transform="translate(1, 1)"
                filter="blur(2px)"
              />
              <path
                d="M12 2C12 2 8 4 6 8C4 12 4 16 6 18C8 20 12 22 12 22M12 2C12 2 16 4 18 8C20 12 20 16 18 18C16 20 12 22 12 22M12 2V8M4 12H20"
                stroke="url(#birdGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="url(#birdFill)"
                fillOpacity="0.8"
              />
              <circle cx="9" cy="10" r="1.5" fill="#1A0F0A" />
              <circle cx="9.5" cy="9.5" r="0.5" fill="#FFD700" />
              <path
                d="M6 12C6 12 4 10 3 10M18 12C18 12 20 10 21 10"
                stroke="url(#wingDetail)"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.7"
              />
              <defs>
                <linearGradient id="birdGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="50%" stopColor="#F4E4C1" />
                  <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>
                <linearGradient id="birdFill" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="50%" stopColor="#C4A57B" />
                  <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>
                <linearGradient id="wingDetail" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F4E4C1" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Desktop: Multiple 3D Flying Birds with different paths */}
      <div className="hidden sm:block fixed inset-0 pointer-events-none overflow-hidden z-40" style={{ perspective: '1000px' }}>
        {/* Bird 1 - Main bird flying across center */}
        <div className="absolute animate-fly-across-3d" style={{ top: '35%' }}>
          <div className="animate-flap-3d" style={{ transformStyle: 'preserve-3d' }}>
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2C12 2 8 4 6 8C4 12 4 16 6 18C8 20 12 22 12 22M12 2C12 2 16 4 18 8C20 12 20 16 18 18C16 20 12 22 12 22M12 2V8M4 12H20"
                stroke="#000000"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="#000000"
                fillOpacity="0.3"
                transform="translate(1, 1)"
                filter="blur(2px)"
              />
              <path
                d="M12 2C12 2 8 4 6 8C4 12 4 16 6 18C8 20 12 22 12 22M12 2C12 2 16 4 18 8C20 12 20 16 18 18C16 20 12 22 12 22M12 2V8M4 12H20"
                stroke="url(#birdGradient1)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="url(#birdFill1)"
                fillOpacity="0.8"
              />
              <circle cx="9" cy="10" r="1.5" fill="#1A0F0A" />
              <circle cx="9.5" cy="9.5" r="0.5" fill="#FFD700" />
              <path
                d="M6 12C6 12 4 10 3 10M18 12C18 12 20 10 21 10"
                stroke="url(#wingDetail1)"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.7"
              />
              <defs>
                <linearGradient id="birdGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="50%" stopColor="#F4E4C1" />
                  <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>
                <linearGradient id="birdFill1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="50%" stopColor="#C4A57B" />
                  <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>
                <linearGradient id="wingDetail1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F4E4C1" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Bird 2 - Second bird with delay */}
        <div className="absolute animate-fly-across-3d" style={{ top: '50%', animationDelay: '5s' }}>
          <div className="animate-flap-3d" style={{ transformStyle: 'preserve-3d', animationDelay: '5s' }}>
            <svg width="90" height="90" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2C12 2 8 4 6 8C4 12 4 16 6 18C8 20 12 22 12 22M12 2C12 2 16 4 18 8C20 12 20 16 18 18C16 20 12 22 12 22M12 2V8M4 12H20"
                stroke="#000000"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="#000000"
                fillOpacity="0.3"
                transform="translate(1, 1)"
                filter="blur(2px)"
              />
              <path
                d="M12 2C12 2 8 4 6 8C4 12 4 16 6 18C8 20 12 22 12 22M12 2C12 2 16 4 18 8C20 12 20 16 18 18C16 20 12 22 12 22M12 2V8M4 12H20"
                stroke="url(#birdGradient2)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="url(#birdFill2)"
                fillOpacity="0.75"
              />
              <circle cx="9" cy="10" r="1.5" fill="#1A0F0A" />
              <circle cx="9.5" cy="9.5" r="0.5" fill="#FFD700" />
              <path
                d="M6 12C6 12 4 10 3 10M18 12C18 12 20 10 21 10"
                stroke="url(#wingDetail2)"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.7"
              />
              <defs>
                <linearGradient id="birdGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="50%" stopColor="#F4E4C1" />
                  <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>
                <linearGradient id="birdFill2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="50%" stopColor="#C4A57B" />
                  <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>
                <linearGradient id="wingDetail2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F4E4C1" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Bird 3 - Third bird with different timing */}
        <div className="absolute animate-fly-across-3d" style={{ top: '25%', animationDelay: '10s' }}>
          <div className="animate-flap-3d" style={{ transformStyle: 'preserve-3d', animationDelay: '10s' }}>
            <svg width="85" height="85" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2C12 2 8 4 6 8C4 12 4 16 6 18C8 20 12 22 12 22M12 2C12 2 16 4 18 8C20 12 20 16 18 18C16 20 12 22 12 22M12 2V8M4 12H20"
                stroke="#000000"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="#000000"
                fillOpacity="0.3"
                transform="translate(1, 1)"
                filter="blur(2px)"
              />
              <path
                d="M12 2C12 2 8 4 6 8C4 12 4 16 6 18C8 20 12 22 12 22M12 2C12 2 16 4 18 8C20 12 20 16 18 18C16 20 12 22 12 22M12 2V8M4 12H20"
                stroke="url(#birdGradient3)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="url(#birdFill3)"
                fillOpacity="0.7"
              />
              <circle cx="9" cy="10" r="1.5" fill="#1A0F0A" />
              <circle cx="9.5" cy="9.5" r="0.5" fill="#FFD700" />
              <path
                d="M6 12C6 12 4 10 3 10M18 12C18 12 20 10 21 10"
                stroke="url(#wingDetail3)"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.7"
              />
              <defs>
                <linearGradient id="birdGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="50%" stopColor="#F4E4C1" />
                  <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>
                <linearGradient id="birdFill3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="50%" stopColor="#C4A57B" />
                  <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>
                <linearGradient id="wingDetail3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F4E4C1" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}