"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Loader from "./Loader";
import AmbientBackground from "./AmbientBackground";
import CursorLight from "./CursorLight";
import Emblem from "./Emblem";
import RotatingText from "./RotatingText";
import Countdown from "./Countdown";
import CTAButtons from "./CTAButtons";
import Footer from "./Footer";
import EasterEgg from "./EasterEgg";
import { ROTATING_MESSAGES, SEQUENCE_SCENES } from "@/lib/constants";

const EASE = [0.19, 1, 0.22, 1] as const;
const TOTAL_SCENES = SEQUENCE_SCENES.length + 1;

export default function Experience() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [sceneIdx, setSceneIdx] = useState(0);
  const [goldMode, setGoldMode] = useState(false);
  const [eggShow, setEggShow] = useState(false);

  const lockedRef = useRef(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const keyBufferRef = useRef("");
  const sceneIdxRef = useRef(0);

  useEffect(() => {
    sceneIdxRef.current = sceneIdx;
  }, [sceneIdx]);

  const goTo = useCallback((i: number) => {
    if (lockedRef.current) return;
    lockedRef.current = true;
    setSceneIdx(((i % TOTAL_SCENES) + TOTAL_SCENES) % TOTAL_SCENES);
    setTimeout(() => {
      lockedRef.current = false;
    }, 900);
  }, []);

  const triggerEgg = useCallback(() => {
    setGoldMode(true);
    setEggShow(true);
    setTimeout(() => setEggShow(false), 3200);
    setTimeout(() => setGoldMode(false), 6000);
  }, []);

  useEffect(() => {
    if (!loaderDone) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 12) return;
      goTo(sceneIdxRef.current + (e.deltaY > 0 ? 1 : -1));
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [loaderDone, goTo]);

  useEffect(() => {
    let touchStartY: number | null = null;
    const onStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onEnd = (e: TouchEvent) => {
      if (touchStartY === null) return;
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 40) goTo(sceneIdxRef.current + (dy > 0 ? 1 : -1));
      touchStartY = null;
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") goTo(sceneIdxRef.current + 1);
      if (e.key === "ArrowUp") goTo(sceneIdxRef.current - 1);
      if (e.key.length === 1) {
        keyBufferRef.current = (keyBufferRef.current + e.key)
          .slice(-3)
          .toUpperCase();
        if (keyBufferRef.current === "TST") triggerEgg();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, triggerEgg]);

  const onEmblemClick = () => {
    clickCountRef.current += 1;
    clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 900);
    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      triggerEgg();
    }
  };

  return (
    <>
      <Loader onComplete={() => setLoaderDone(true)} />
      <AmbientBackground />
      <CursorLight />

      <div
        className={`relative z-[2] h-full transition-opacity duration-[1200ms] ease-out ${
          loaderDone ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* dot navigation */}
        <div className="absolute right-4 sm:right-7 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-[5]">
          {Array.from({ length: TOTAL_SCENES }).map((_, i) => (
            <button
              key={i}
              aria-label={`Go to scene ${i + 1}`}
              onClick={() => goTo(i)}
              className={`w-[5px] h-[5px] rounded-full transition-all duration-300 ${
                i === sceneIdx
                  ? "bg-gold-bright scale-[1.4] shadow-[0_0_8px_rgba(238,207,142,0.6)]"
                  : "bg-ink-faint/35"
              }`}
            />
          ))}
        </div>

        {/* hero scene */}
        <motion.div
          animate={{ opacity: sceneIdx === 0 ? 1 : 0, scale: sceneIdx === 0 ? 1 : 0.98 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          style={{
            pointerEvents: sceneIdx === 0 ? "auto" : "none",
            visibility: sceneIdx === 0 ? "visible" : "hidden",
          }}
        >
          <div
            className="absolute w-[520px] h-[520px] max-w-none rounded-full pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-[58%] animate-spotPulse"
            style={{
              background:
                "radial-gradient(circle, rgba(198,161,91,0.16) 0%, transparent 60%)",
            }}
          />

          <Emblem goldMode={goldMode} onClick={onEmblemClick} />

          <h1 className="font-display font-normal text-[clamp(30px,6vw,56px)] tracking-[0.22em] uppercase mt-2">
            The Street Talks
          </h1>
          <div className="mt-2.5 text-[11px] tracking-[0.35em] uppercase text-gold">
            Wear the Voice. Own the Culture.
          </div>

          <RotatingText messages={ROTATING_MESSAGES} className="mt-6 w-[min(90vw,520px)]" />

          <Countdown />
          <CTAButtons />

          <div className="absolute bottom-[86px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[9px] tracking-[0.3em] text-ink-faint uppercase">
            <span className="w-px h-6 bg-gradient-to-b from-gold to-transparent animate-hintMove" />
            Scroll
          </div>
        </motion.div>

        {/* cinematic sequence scenes */}
        {SEQUENCE_SCENES.map((s, i) => {
          const active = sceneIdx === i + 1;
          return (
            <motion.div
              key={s.title}
              animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.98 }}
              transition={{ duration: 1.1, ease: EASE }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
              style={{
                pointerEvents: "none",
                visibility: active ? "visible" : "hidden",
              }}
            >
              <div className="font-display font-light italic text-[clamp(34px,7vw,84px)] tracking-wide uppercase">
                {s.title}
                {"accent" in s && s.accent && (
                  <span className="text-gold-bright not-italic"> {s.accent}</span>
                )}
              </div>
              {"sub" in s && s.sub && (
                <div className="mt-4 text-[11px] tracking-[0.4em] text-ink-faint uppercase">
                  {s.sub}
                </div>
              )}
            </motion.div>
          );
        })}

        <Footer />
      </div>

      <EasterEgg show={eggShow} />
    </>
  );
}
