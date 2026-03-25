import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  title: string;
  story: string;
}

const images: GalleryItem[] = [
  { id: 1, src: "/showcase-1.jpg", alt: "Showcase 1", title: "The Beginning", story: "Every great project starts with a single stroke of imagination. Here, amidst the chaos of ideas, we found our anchor." },
  { id: 2, src: "/showcase-2.png", alt: "Showcase 2", title: "Midnight Oil", story: "72 hours felt like an eternity. We stayed up sculpting light and pixels until the early morning dew settled." },
  { id: 3, src: "/showcase-3.jpg", alt: "Showcase 3", title: "Structural Integrity", story: "Finding the balance between aesthetic grace and raw engineering power. The framework took shape." },
  { id: 4, src: "/showcase-4.jpg", alt: "Showcase 4", title: "First Light", story: "As the sun broke through the studio windows, the render finally completed. A moment of collective awe." },
  { id: 5, src: "/showcase-5.png", alt: "Showcase 5", title: "Fluid Dynamics", story: "Motion isn't just movement; it's emotion. We spent hours tweaking cubic-bezier curves until it felt human." },
  { id: 6, src: "/showcase-6.jpg", alt: "Showcase 6", title: "Soundscapes", story: "Visuals are only half the experience. The auditory feedback loop was wired in to complete the immersion." },
  { id: 7, src: "/showcase-7.png", alt: "Showcase 7", title: "Polishing Glass", story: "Removing the friction. Every interaction was sanded down until only the pure, immediate intent remained." },
  { id: 8, src: "/showcase-8.jpg", alt: "Showcase 8", title: "The Launch", story: "72 hours later. We pressed deploy. Silence filled the room, followed swiftly by exhilaration." },
];

export function Ticker() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Horizontal Scroll Setup
  useEffect(() => {
    if (!sectionRef.current || !scrollRef.current) return;

    const ctx = gsap.context(() => {
      const scrollEl = scrollRef.current;
      if (!scrollEl) return;

      const getScrollAmount = () => -(scrollEl.scrollWidth - window.innerWidth);

      const tween = gsap.to(scrollEl, {
        x: getScrollAmount,
        ease: "none"
      });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${Math.abs(getScrollAmount())}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
      });

      const imageEls = scrollEl.querySelectorAll('.gallery-image-wrapper');
      imageEls.forEach((el, index) => {
        // Scroll-driven parallax for the inner image
        gsap.to(el.querySelector('img'), {
          xPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${Math.abs(getScrollAmount())}`,
            scrub: true,
          }
        });

        // Playful floating animation for the wrapper itself
        gsap.to(el, {
          y: index % 2 === 0 ? -15 : 15,
          duration: 2 + (index % 3) * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.2
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Modal Animation Hook
  useEffect(() => {
    if (activeItem && modalRef.current && contentRef.current) {
      gsap.fromTo(modalRef.current,
        { opacity: 0, backdropFilter: "blur(0px)" },
        { opacity: 1, backdropFilter: "blur(20px)", duration: 0.6, ease: "power3.out" }
      );

      gsap.fromTo(contentRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "expo.out", delay: 0.2 }
      );
    }
  }, [activeItem]);

  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        backdropFilter: "blur(0px)",
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => setActiveItem(null)
      });
    } else {
      setActiveItem(null);
    }
  };

  return (
    <>
      <section id="gallery" ref={sectionRef} className="relative w-full h-[100dvh] bg-zinc-950 overflow-hidden flex flex-col items-start justify-center border-t border-zinc-50/5">

        {/* Gallery Header fixed inside pinned section */}
        <div className="absolute top-12 md:top-24 left-6 md:left-14 z-20 pointer-events-none mix-blend-difference">
          <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-sans tracking-tighter leading-none text-zinc-50 uppercase opacity-90">
            The <br className="hidden md:block" />
            <span className="font-display italic font-light text-zinc-400 lowercase tracking-tight">gallery</span>
          </h2>
        </div>

        {/* Horizontal scrolling track */}
        <div ref={scrollRef} className="flex h-[50vh] md:h-[65vh] items-center gap-6 md:gap-16 px-[5vw] md:px-[15vw] flex-nowrap w-max mt-24 md:mt-0">
          {images.map((img) => (
            <div
              key={img.id}
              onClick={() => setActiveItem(img)}
              className="gallery-image-wrapper relative h-[80%] md:h-full w-[70vw] md:w-[45vw] lg:w-[35vw] shrink-0 overflow-hidden rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] border border-zinc-100/10 transition-all duration-700 hover:scale-105 hover:-rotate-2 cursor-pointer group"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-[115%] h-full object-cover -mx-[7.5%] will-change-transform transform-gpu transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-zinc-950/0 transition-colors duration-500 group-hover:bg-zinc-950/20" />
            </div>
          ))}
        </div>
      </section>

      {/* Cinematic Fullscreen Modal */}
      {activeItem && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-zinc-950/90"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 md:top-10 md:right-10 z-[101] text-zinc-400 hover:text-zinc-50 transition-colors p-2 shrink-0 bg-zinc-900/50 rounded-full backdrop-blur-md border border-zinc-50/10"
          >
            <X size={24} weight="light" />
          </button>

          <div
            ref={contentRef}
            className="relative flex flex-col md:flex-row w-full max-w-7xl max-h-[90dvh] bg-zinc-900/40 border border-zinc-50/10 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Side */}
            <div className="w-full md:w-[65%] h-[40vh] md:h-auto relative overflow-hidden bg-zinc-950">
              <img
                src={activeItem.src}
                alt={activeItem.alt}
                className="w-full h-full object-cover opacity-90"
              />
              {/* Subtle gradient overlaid on image matching dark modern aesthetic */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent md:bg-gradient-to-r" />
            </div>

            {/* Content Side */}
            <div className="w-full md:w-[35%] flex flex-col justify-center p-8 md:p-16 relative">
              <span className="font-mono text-accent text-xs md:text-sm tracking-[0.2em] uppercase mb-4 opacity-80 decoration-accent/30 underline underline-offset-4">
                00{activeItem.id} // Snapshot
              </span>
              <h3 className="text-3xl md:text-5xl font-display italic font-light text-zinc-50 tracking-tight leading-none mb-6">
                {activeItem.title}
              </h3>
              <p className="font-sans text-zinc-400 text-sm md:text-base leading-relaxed text-pretty">
                {activeItem.story}
              </p>

              <div className="mt-12 pt-8 border-t border-zinc-800 flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Live Record</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
