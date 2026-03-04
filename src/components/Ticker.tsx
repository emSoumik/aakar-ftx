import { useEffect, useRef } from "react";

const images = [
  { src: "/showcase-1.jpg", className: "absolute top-[15%] left-[-4%] w-[22%] sm:w-[16%] rotate-[-1deg] z-10", speed: 0.08 },
  { src: "/showcase-2.jpg", className: "absolute top-[12%] left-[26%] w-[30%] sm:w-[24%] rotate-[1deg] z-10", speed: 0.05 },
  { src: "/showcase-3.jpg", className: "absolute top-[10%] right-[-3%] w-[34%] sm:w-[28%] rotate-[2deg] z-10", speed: 0.1 },
  { src: "/showcase-4.jpg", className: "absolute top-[42%] left-[-3%] w-[26%] sm:w-[20%] rotate-[2deg] z-20", speed: 0.12 },
  { src: "/showcase-5.jpg", className: "absolute top-[46%] left-[18%] w-[40%] sm:w-[34%] rotate-[-1deg] z-20", speed: 0.06 },
  { src: "/showcase-6.jpg", className: "absolute top-[36%] right-[-6%] w-[14%] sm:w-[10%] rotate-[90deg] z-20", speed: 0.15 },
  { src: "/showcase-7.jpg", className: "absolute bottom-[4%] right-[12%] w-[34%] sm:w-[28%] rotate-[1deg] z-20", speed: 0.09 },
  { src: "/showcase-8.jpg", className: "absolute bottom-[2%] left-[-2%] w-[20%] sm:w-[15%] rotate-[-3deg] z-10", speed: 0.13 },
];

export function Ticker() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportH = window.innerHeight;
      // How far into the section we are (0 = top edge hits bottom of viewport)
      const offset = viewportH - rect.top;

      for (let i = 0; i < images.length; i++) {
        const el = imgRefs.current[i];
        if (!el) continue;
        const y = offset * images[i].speed;
        el.style.transform = `translateY(${-y}px) ${getRotation(images[i].className)}`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "140vw", minHeight: "700px", maxHeight: "1200px" }}
    >
      {/* "Imagery" text at top */}
      <div className="absolute top-[2%] inset-x-0 z-[15] flex justify-center pointer-events-none">
        <span
          className="text-[22vw] sm:text-[16vw] lg:text-[200px] leading-none tracking-[-0.06em] text-[#F5F0E8] opacity-90 uppercase"
          style={{ fontFamily: "'Apple Garamond', 'EB Garamond', serif", fontWeight: 400 }}
        >
          Imagery
        </span>
      </div>

      {/* Scattered parallax images */}
      {images.map((img, i) => (
        <img
          key={i}
          ref={(el) => { imgRefs.current[i] = el; }}
          src={img.src}
          alt={`Showcase ${i + 1}`}
          className={`${img.className} shadow-2xl object-cover will-change-transform`}
        />
      ))}
    </div>
  );
}

// Extract the rotate value from className so we can preserve it during parallax
function getRotation(className: string): string {
  const match = className.match(/rotate-\[([^\]]+)\]/);
  if (!match) return "";
  return `rotate(${match[1]})`;
}
