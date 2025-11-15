"use client"

import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const eventDate = new Date('2025-12-14T00:00:00').getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 xs:gap-8 sm:gap-10">
      {/* Event Date and Location */}
      <div className="text-center space-y-2 xs:space-y-3 px-2">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[var(--gold)] glow-gold leading-tight">
          <span className="font-black">14 DECEMBER</span> 2025
        </h1>
        <p className="text-[10px] xs:text-xs sm:text-2xl md:text-3xl text-[var(--cream)]/95 font-bold tracking-wide px-2">
          <span className="hidden xs:inline">MAJUBA COLLEGE STADIUM, NEWCASTLE</span>
          <span className="xs:hidden">MAJUBA COLLEGE<br />NEWCASTLE</span>
        </p>
      </div>

      {/* Countdown Cards */}
      <div className="flex gap-1.5 xs:gap-2 sm:gap-4 md:gap-6 justify-center items-center flex-nowrap px-2">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center">
            <div className="relative bg-gradient-to-br from-[var(--gold)]/30 via-[var(--charcoal)]/80 to-[var(--midnight-blue)]/90 backdrop-blur-md border-2 border-[var(--gold)] rounded-lg xs:rounded-xl sm:rounded-2xl px-2 py-2 xs:px-3 xs:py-3 sm:px-7 sm:py-5 md:px-9 md:py-7 min-w-[60px] xs:min-w-[70px] sm:min-w-[100px] md:min-w-[130px] card-elevated">
              {/* Inner glow effect */}
              <div className="absolute inset-0 rounded-lg xs:rounded-xl sm:rounded-2xl bg-gradient-to-t from-[var(--gold)]/20 to-transparent pointer-events-none" />
              
              {/* Number */}
              <div className="relative text-2xl xs:text-3xl sm:text-5xl md:text-7xl font-bold text-[var(--gold)] glow-gold font-mono tracking-tight">
                {String(item.value).padStart(2, '0')}
              </div>
            </div>
            
            {/* Label */}
            <div className="text-[9px] xs:text-xs sm:text-sm md:text-base mt-1.5 xs:mt-2 sm:mt-3 text-[var(--cream)]/90 uppercase tracking-widest font-semibold">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}