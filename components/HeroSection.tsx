'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TSLogo from './TSLogo';

export default function HeroSection() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [mounted, setMounted] = useState(false);
  const messages = ['A New Voice Is Coming.', 'Born in Zimbabwe. Built for the World.'];
  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const interval = setInterval(() => { setCurrentMessage((prev) => (prev + 1) % messages.length); }, 5000);
    return () => clearInterval(interval);
  }, [messages.length]);
  if (!mounted) return null;
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="relative z-10 flex flex-col items-center gap-8 md:gap-12 text-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <TSLogo size="lg" />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="font-cormorant text-5xl md:text-7xl font-light tracking-[0.2em] text-white drop-shadow-lg">
          THE STREET TALKS
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="font-cormorant text-2xl md:text-3xl font-light tracking-widest text-luxury-gold">
          WEAR THE VOICE. OWN THE CULTURE.
        </motion.p>
        <div className="mt-8 min-h-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p key={currentMessage} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }} className="absolute font-inter text-lg tracking-wider text-white">
              {messages[currentMessage]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <svg className="w-6 h-6 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
      </motion.div>
    </section>
  );
}