import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDownRight } from "@phosphor-icons/react";

export function Hero() {
  const meteorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!meteorRef.current) return;

    // Meteor falling animation
    gsap.fromTo(meteorRef.current,
      {
        x: "100vw",
        y: "-20vh",
        opacity: 0,
        scale: 0.5
      },
      {
        x: "-20vw",
        y: "80vh",
        opacity: 1,
        scale: 1,
        duration: 2.5,
        ease: "power1.inOut",
        delay: 0.5,
      }
    );

    gsap.to(meteorRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: 2.5,
      ease: "power2.in"
    });
  }, []);

  const scrollToGallery = () => {
    const gallerySection = document.getElementById("gallery");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero relative min-h-[100dvh] w-full flex flex-col justify-start px-6 md:px-14 py-8 md:py-12 overflow-hidden">
      {/* Meteor element */}
      <div
        ref={meteorRef}
        className="absolute top-0 left-0 w-32 h-1 bg-gradient-to-r from-transparent via-orange-200 to-orange-400 rotate-45 z-0 blur-[2px] opacity-0 pointer-events-none"
        style={{
          boxShadow: "0 0 20px 2px rgba(251, 146, 60, 0.6), 0 0 40px 4px rgba(251, 146, 60, 0.2)",
          borderRadius: "100%"
        }}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_15px_5px_rgba(255,255,255,0.8)]" />
      </div>

      {/* Header / Logo */}
      <div className="relative z-10 flex items-center justify-between w-full mb-8">
        <span className="font-sans font-bold tracking-tight text-xl md:text-2xl text-white drop-shadow-md">
          Aakar Labs
        </span>
        <div className="hidden md:flex gap-8 text-[10px] uppercase font-sans tracking-[0.2em] text-white/50">
          <a href="#" className="hover:text-white transition-colors">Work</a>
          <a href="#" className="hover:text-white transition-colors">Studio</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>

      {/* Main Title Area */}
      <div className="relative z-10 flex flex-col items-center justify-start w-full mt-12 md:mt-20 gap-4 text-center">
        {/* Soft Glow behind title */}
        <div className="absolute -top-20 md:-top-32 left-1/2 -translate-x-1/2 w-[120%] h-[150%] bg-white/5 blur-[120px] rounded-full pointer-events-none z-0" />

        <div className="max-w-5xl px-4 relative z-10">
          <h1 className="font-serif font-regular text-[4.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] leading-[0.85] tracking-tight text-white/90 drop-shadow-2xl">
            We built <br />
            <span className="italic block mt-2 text-white/95">
              this studio
            </span>
          </h1>
          <div className="mt-4 flex justify-center">
            <span className="font-serif text-[1.8rem] md:text-[2.5rem] tracking-[0.15em] uppercase text-white/80">
              IN 72 HOURS
            </span>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="relative z-10 flex flex-col items-center mt-auto mb-6 md:mb-10 w-full max-w-lg mx-auto px-6">
        <p className="font-sans text-white/70 text-sm md:text-base leading-[1.7] text-center mb-8 drop-shadow-md tracking-wide">
          How I hacked my way into this event<br />
          using motion, standard frontend tools, and<br />
          AI generation.
        </p>

        <button
          onClick={scrollToGallery}
          className="flex items-center gap-3 text-white/90 font-sans text-[11px] md:text-xs tracking-[0.25em] uppercase group cursor-pointer border-none bg-transparent p-0"
        >
          <span className="group-hover:text-accent transition-colors duration-500 relative drop-shadow-md">
            READ THE STORY
          </span>
          <ArrowDownRight weight="light" className="text-white/80 text-lg group-hover:text-accent transition-colors" />
        </button>
      </div>
    </section>
  );
}
