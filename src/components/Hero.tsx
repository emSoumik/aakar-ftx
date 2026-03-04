export function Hero() {
  return (
    <section className="relative h-[100svh] lg:h-[920px] w-full overflow-visible">
      {/* Logo */}
      <div className="relative z-10 px-14 pt-6">
        <span className="font-serif text-[22px] text-[#F5F0E8]">
          Aakar Labs
        </span>
      </div>

      {/* Title */}
      <div
        className="relative z-10 mx-auto flex max-w-[1100px] flex-col items-center gap-1 backdrop-blur-[2px] pt-[8vh] sm:pt-[60px] lg:pt-[80px]"
        style={{ textShadow: "0 4px 60px rgba(0,0,0,0.8), 0 2px 20px rgba(0,0,0,0.6), 0 0 120px rgba(0,0,0,0.4)" }}
      >
        <h1
          className="text-center text-[40px] sm:text-[56px] md:text-[72px] lg:text-[88px] leading-[0.9] tracking-[-2px] sm:tracking-[-3px] lg:tracking-[-4px] text-white"
          style={{ fontFamily: "'Apple Garamond', 'EB Garamond', serif", fontWeight: 400 }}
        >
          we made this studio
        </h1>
        <span
          className="relative inline-block text-center text-[40px] sm:text-[56px] md:text-[72px] lg:text-[88px] leading-[0.9] tracking-[-2px] sm:tracking-[-3px] lg:tracking-[-4px] text-white italic"
          style={{ fontFamily: "'Apple Garamond', 'EB Garamond', serif", fontWeight: 300 }}
        >
          <span
            className="absolute inset-0 -inset-x-3 -inset-y-1 -z-10 rounded-sm bg-[#FF6B2B] rotate-[-2deg]"
          />
          in 72 hrs
        </span>
      </div>

      {/* Subtext pinned to bottom */}
      <div
        className="absolute bottom-44 sm:bottom-12 left-0 right-0 z-20 flex justify-center px-6"
      >
        <p
          className="text-center text-[14px] sm:text-[16px] md:text-[18px] tracking-[0.15em] uppercase text-white font-display font-medium px-5 py-2 rounded-full bg-black/40 backdrop-blur-md"
        >
          how i hacked my way into this event
        </p>
      </div>
    </section>
  );
}
