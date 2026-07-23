'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const scenes = [
  { label: 'EST. 2026' },
  { label: 'HARARE' },
  { label: 'ZIMBABWE' },
  { label: 'BUILT FOR THE WORLD' },
];

export default function ScrollSequence() {
  const [activeScene, setActiveScene] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!mounted) return;
      e.preventDefault();
      setActiveScene((prev) => {
        if (e.deltaY > 0) return prev < scenes.length - 1 ? prev + 1 : prev;
        return prev > 0 ? prev - 1 : prev;
      });
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [mounted]);
  if (!mounted) return null;
  return (
    <div ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div key={activeScene} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }} className="absolute inset-0 flex items-center justify-center">
          <p className="font-cormorant text-5xl md:text-7xl font-light tracking-[0.3em] text-luxury-gold text-center px-4">{scenes[activeScene].label}</p>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {scenes.map((_, idx) => (
          <motion.button key={idx} onClick={() => setActiveScene(idx)} animate={{ width: idx === activeScene ? 32 : 8, backgroundColor: idx === activeScene ? '#d4af37' : '#4b5563' }} transition={{ duration: 0.3 }} className="h-2 rounded-full" />
        ))}
      </div>
    </div>
  );
}