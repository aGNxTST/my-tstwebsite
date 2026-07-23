'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TSLogoProps {
  className?: string;
  isGolden?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeMap = { sm: 'w-12 h-12', md: 'w-20 h-20', lg: 'w-32 h-32', xl: 'w-48 h-48' };

export default function TSLogo({ className = '', isGolden = false, size = 'md' }: TSLogoProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientY / window.innerHeight) * 20 - 10;
      const y = (e.clientX / window.innerWidth) * 20 - 10;
      setTilt({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div animate={{ rotateX: tilt.x, rotateY: tilt.y }} transition={{ type: 'spring', stiffness: 100, damping: 30 }} className={`${sizeMap[size]} ${className} flex items-center justify-center`} style={{ perspective: '1000px' }}>
      <motion.svg animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 3, repeat: Infinity }} viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg" xmlns="http://www.w3.org/2000/svg">
        {isGolden && <motion.circle cx="100" cy="100" r="95" fill="none" stroke="#d4af37" strokeWidth="2" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />}
        <circle cx="100" cy="100" r="80" fill="none" stroke={isGolden ? '#d4af37' : '#ffffff'} strokeWidth="1" />
        <g transform="translate(100, 80)" fill="none" stroke={isGolden ? '#d4af37' : '#ffffff'} strokeWidth="2">
          <line x1="-25" y1="0" x2="25" y2="0" />
          <line x1="0" y1="0" x2="0" y2="40" />
        </g>
        <g transform="translate(65, 100)" fill="none" stroke={isGolden ? '#d4af37' : '#ffffff'} strokeWidth="2">
          <path d="M 0 -15 Q 10 -15 10 -5 Q 10 5 0 5 Q -10 5 -10 15 Q -10 25 0 25" />
        </g>
        <g transform="translate(135, 100)" fill="none" stroke={isGolden ? '#d4af37' : '#ffffff'} strokeWidth="2">
          <line x1="-10" y1="-15" x2="10" y2="-15" />
          <line x1="0" y1="-15" x2="0" y2="25" />
        </g>
        {[1, -1].map((dir) => [-1, 1].map((vdir) => <circle key={`${dir}-${vdir}`} cx={100 + dir * 70} cy={100 + vdir * 70} r="2" fill={isGolden ? '#d4af37' : '#ffffff'} />))}
      </motion.svg>
      {isGolden && <motion.div className="absolute inset-0 rounded-full" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }} style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%)' }} />}
    </motion.div>
  );
}