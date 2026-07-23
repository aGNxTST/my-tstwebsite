'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const buttons = [
  { id: 'whatsapp-community', label: 'Join WhatsApp Community', href: 'https://chat.whatsapp.com/Bkeq0NUv1fK2Nok8VmUaLe?s=cl&p=a&ilr=1', icon: '💬' },
  { id: 'whatsapp-channel', label: 'Follow WhatsApp Channel', href: 'https://whatsapp.com/channel/0029VbD0jA47IUYdg3lQDj3L', icon: '📢' },
  { id: 'email', label: 'Email Us', href: 'mailto:maravirebrave4@gmail.com', icon: '✉️' },
];

export default function Community() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  return (
    <section className="relative w-full py-20 flex items-center justify-center px-4 min-h-screen">
      <div className="flex flex-col items-center gap-12 max-w-2xl">
        <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-cormorant text-3xl md:text-4xl font-light tracking-widest text-white text-center">
          JOIN THE CONVERSATION
        </motion.h2>
        <div className="flex flex-col gap-6 w-full">
          {buttons.map((button, idx) => (
            <motion.a key={button.id} href={button.href} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: idx * 0.1 }} onMouseEnter={() => setHoveredId(button.id)} onMouseLeave={() => setHoveredId(null)} className="relative px-8 py-4 font-inter tracking-widest uppercase text-sm transition-all duration-300 overflow-hidden group" style={{ border: `1px solid rgba(212, 175, 55, ${hoveredId === button.id ? 1 : 0.5})` }}>
              <motion.div animate={{ opacity: hoveredId === button.id ? 0.1 : 0 }} className="absolute inset-0 bg-luxury-gold/5" />
              <span className="relative flex items-center justify-center gap-3">
                <span>{button.icon}</span>
                <span className="text-luxury-gold">{button.label}</span>
              </span>
            </motion.a>
          ))}
        </div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="font-inter text-sm text-gray-500 text-center mt-8">
          Be part of the movement. Connect with like-minded individuals worldwide.
        </motion.p>
      </div>
    </section>
  );
}