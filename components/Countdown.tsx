'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const [time, setTime] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const calculateCountdown = () => {
      const targetDate = new Date('2026-08-05T00:00:00Z').getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        setTime({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };
    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);
  if (!mounted) return null;
  const CountdownNumber = ({ value, label }: { value: number; label: string }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col items-center gap-2">
      <div className="font-grotesk text-7xl md:text-8xl font-bold text-luxury-gold">{String(value).padStart(2, '0')}</div>
      <p className="font-inter text-sm md:text-base tracking-widest text-gray-500 uppercase">{label}</p>
    </motion.div>
  );
  return (
    <section className="relative w-full py-20 flex items-center justify-center px-4 min-h-screen">
      <div className="flex flex-col items-center gap-16">
        <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-cormorant text-3xl md:text-4xl font-light tracking-widest text-white">
          LAUNCHING IN
        </motion.h2>
        <div className="flex gap-8 md:gap-12 lg:gap-16 flex-wrap justify-center">
          <CountdownNumber value={time.days} label="Days" />
          <CountdownNumber value={time.hours} label="Hours" />
          <CountdownNumber value={time.minutes} label="Minutes" />
          <CountdownNumber value={time.seconds} label="Seconds" />
        </div>
      </div>
    </section>
  );
}