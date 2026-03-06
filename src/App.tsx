import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hero } from "./components/Hero";
import { Ticker } from "./components/Ticker";
import { StormOverlay } from "./components/StormOverlay";
import { Fireflies } from "./components/Fireflies";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const bgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!bgRef.current) return;

    // Smooth blur effect linked to GSAP scroll trigger
    gsap.to(bgRef.current, {
      filter: "blur(12px)",
      opacity: 0.3,
      backdropFilter: "blur(4px)",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "1000px top",
        scrub: true,
      }
    });

    if (!isMobile && imageRef.current) {
      // Desktop: parallax effect on the image
      gsap.to(imageRef.current, {
        yPercent: 30, // Parallax slide down
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }

    if (isMobile && videoRef.current) {
      const video = videoRef.current;
      let isReadyToScrub = false;
      let scrollHandler: (() => void) | null = null;

      const setupVideoLogic = () => {
        if (!video.duration || Number.isNaN(video.duration)) {
          setTimeout(setupVideoLogic, 100);
          return;
        }

        const scrubStartTime = video.duration - 0.4;
        let animationFrameId: number;

        // 1. Initial Autoplay
        video.currentTime = 0;
        video.play().catch(() => { });

        // 2. High-Precision Pause Loop
        const checkTimeLoop = () => {
          if (video.currentTime >= scrubStartTime) {
            video.pause();
            video.currentTime = scrubStartTime;
            isReadyToScrub = true;
            cancelAnimationFrame(animationFrameId);
          } else {
            animationFrameId = requestAnimationFrame(checkTimeLoop);
          }
        };

        // Start the highly precise tracking loop
        animationFrameId = requestAnimationFrame(checkTimeLoop);

        // 3. Manual Scroll Listener
        scrollHandler = () => {
          if (!isReadyToScrub) return;
          const scrollPos = window.scrollY;
          const maxScroll = 600;
          const progress = Math.min(Math.max(scrollPos / maxScroll, 0), 1);
          const newTime = scrubStartTime + (progress * 0.4);
          if (Math.abs(video.currentTime - newTime) > 0.01) {
            video.currentTime = newTime;
          }
        };

        window.addEventListener("scroll", scrollHandler, { passive: true });

        // Add cleanup to the scroll handler specifically for the RAF
        const originalScrollHandler = scrollHandler;
        scrollHandler = () => {
          originalScrollHandler();
        };

        // Store the RAF ID safely on the dataset
        video.dataset.rafId = animationFrameId.toString();
      };

      const commonCleanup = () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
      };

      if (video.readyState >= 2) {
        setupVideoLogic();
      } else {
        video.addEventListener("loadeddata", setupVideoLogic);
      }

      return () => {
        if (scrollHandler) window.removeEventListener("scroll", scrollHandler);
        video.removeEventListener("loadeddata", setupVideoLogic);
        if (video.dataset.rafId) {
          cancelAnimationFrame(parseInt(video.dataset.rafId, 10));
        }
        commonCleanup();
      };
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isMobile]);

  return (
    <div className="font-sans relative min-h-[100dvh] w-full bg-zinc-950 text-zinc-50 overflow-x-hidden">
      {/* Fixed background container */}
      <div
        ref={bgRef}
        className="fixed inset-0 z-0 overflow-hidden w-full h-full bg-zinc-950 will-change-transform"
      >
        {isMobile ? (
          <video
            ref={videoRef}
            src="/Video_parallax.mp4"
            className="w-full h-full object-cover object-center opacity-80"
            muted
            playsInline
            preload="auto"
          />
        ) : (
          <img
            ref={imageRef}
            src="/hero-bg.png"
            alt="Hero Theme"
            className="w-full h-[120%] -top-[10%] left-0 absolute object-cover object-center opacity-80 will-change-transform transform-gpu"
          />
        )}
        {/* Soft dark gradient fade for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/20 to-zinc-950 pointer-events-none" />
      </div>

      {/* Storm clouds + lightning */}
      <div className="pointer-events-none fixed inset-0 z-[1]">
        <StormOverlay />
        <Fireflies />
      </div>

      {/* Scrollable content */}
      <div className="relative z-10 w-full mx-auto">
        <Hero />
        <Ticker />
      </div>
    </div>
  );
}

export default App;
