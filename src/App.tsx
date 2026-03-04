import { useEffect, useRef } from "react";
import { Hero } from "./components/Hero";
import { Ticker } from "./components/Ticker";
import { StormOverlay } from "./components/StormOverlay";
import { Fireflies } from "./components/Fireflies";

function App() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!bgRef.current) return;
      const scrollY = window.scrollY;
      const heroHeight = 920;
      const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);
      const blur = Math.min(progress * 20, 8);
      bgRef.current.style.filter = `blur(${blur}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="font-sans relative min-h-screen w-full">
      {/* Fixed background */}
      <div
        ref={bgRef}
        className="fixed -inset-4 z-0 bg-cover bg-center will-change-[filter]"
        style={{ backgroundImage: 'url("/hero-bg.png")' }}
      />

      {/* Storm clouds + lightning */}
      <StormOverlay />
      <Fireflies />

      {/* Scrollable content */}
      <div className="relative z-10">
        <Hero />
        <Ticker />
      </div>
    </div>
  );
}

export default App;
