import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import AmbientDetails from "../components/AmbientDetails";
import IntroJourney from "../components/IntroJourney";
import LotusParallaxScene from "../components/LotusParallaxScene";
import MusicPlayer from "../components/MusicPlayer";
import ScrollProgress from "../components/ScrollProgress";
import InviteMessage from "../sections/InviteMessage";
import Couple from "../sections/Couple";
import Events from "../sections/Events";
import Venue from "../sections/Venue";
import Rsvp from "../sections/Rsvp";
import Footer from "../sections/Footer";
import { wedding } from "../config";
import { soundManager } from "../lib/soundManager";

export default function Home() {
  const [opened, setOpened] = useState(false);
  const reduceMotion = useReducedMotion();
  const onOpened = useCallback(() => setOpened(true), []);

  useEffect(() => {
    if (!opened) return;
    soundManager.play();

    const handleGesture = () => {
      soundManager.play();
      window.removeEventListener("pointerdown", handleGesture);
      window.removeEventListener("keydown", handleGesture);
    };

    window.addEventListener("pointerdown", handleGesture, { passive: true });
    window.addEventListener("keydown", handleGesture, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", handleGesture);
      window.removeEventListener("keydown", handleGesture);
    };
  }, [opened]);

  useEffect(() => {
    if (!opened || reduceMotion) return;
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    let id = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, [opened, reduceMotion]);

  return (
    <main id="main-content" className="relative min-h-svh overflow-x-hidden bg-ink">
      <a href="#invitation" className="skip-link">Skip to invitation</a>
      <div
        inert={!opened}
        aria-hidden={!opened}
        className={opened ? "" : "pointer-events-none"}
      >
        {opened && <ScrollProgress />}
        <LotusParallaxScene />
        <InviteMessage />
        <Couple />
        {wedding.sections?.events !== false && <Events />}
        {wedding.sections?.venue !== false && <Venue />}
        {wedding.sections?.rsvp !== false && <Rsvp />}
        <Footer />
      </div>
      {opened && <AmbientDetails />}
      <MusicPlayer />
      <IntroJourney onOpened={onOpened} />
    </main>
  );
}
