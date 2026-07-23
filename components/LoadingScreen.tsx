'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import TSLogo from './TSLogo';

export default function LoadingScreen() {
  const [showLogo, setShowLogo] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const messages = ['A New Voice Is Coming.', 'Born in Zimbabwe. Built for the World.'];
  useEffect(() => { setTimeout(() => setShowLogo(true), 1500); }, []);
  useEffect(() => {
    const interval = setInterval(() => setCurrentMessage((prev) => (prev + 1) % messages.length), 5000);
    return () => clearInterval(interval);
  }, [messages.length]);
  return (
    <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1, delay: 3.5 }} className="fixed inset-0 z-50 flex items-center justify-center bg-luxury-black">
      <motion.div initial={{ width: 0 }} animate={{ width: 96 }} transition={{ duration: 3 }} className="absolute top-1/3 h-px bg-gradient-to-r from-transparent via-luxury-gold to-transparent" />
      {showLogo && (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="flex flex-col items-center gap-6">
          <div className="scale-150"><TSLogo /></div>
          <h1 className="font-cormorant text-4xl font-light tracking-widest text-white">THE STREET TALKS</h1>
        </motion.div>
      )}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 text-xs text-gray-600 font-inter tracking-widest">SOUND ENABLED</motion.div>
    </motion.div>
  );
}