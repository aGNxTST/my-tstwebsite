'use client';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import MouseFollower from '@/components/MouseFollower';
import HeroSection from '@/components/HeroSection';
import Countdown from '@/components/Countdown';
import Community from '@/components/Community';
import ScrollSequence from '@/components/ScrollSequence';
import AmbientBackground from '@/components/AmbientBackground';
import EasterEgg from '@/components/EasterEgg';
import Footer from '@/components/Footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {isLoading && <LoadingScreen />}
      {!isLoading && (
        <div className="min-h-screen bg-luxury-black relative overflow-hidden">
          <AmbientBackground />
          <MouseFollower />
          <EasterEgg />
          <div className="relative z-10">
            <HeroSection />
            <Countdown />
            <Community />
            <ScrollSequence />
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}