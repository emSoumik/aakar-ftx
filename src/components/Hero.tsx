import { ArrowDownRight } from "@phosphor-icons/react";

export function Hero() {


  const scrollToGallery = () => {
    const gallerySection = document.getElementById("gallery");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero relative min-h-[100dvh] w-full flex flex-col justify-start px-6 md:px-14 py-8 md:py-12 overflow-hidden">


      {/* Header / Logo */}
      <div className="relative z-20 flex items-center justify-between w-full mb-8">
        <span className="font-sans font-bold tracking-tight text-xl md:text-2xl text-white drop-shadow-md">
          Aakar Labs
        </span>
        <div className="flex gap-4 md:gap-12 text-[10px] uppercase font-sans tracking-[0.2em] text-white/50">
          <a href="#" className="hover:text-white transition-colors">Work</a>
          <a href="#" className="hover:text-white transition-colors">Studio</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>

      {/* Responsive Layout Wrapper */}
      <div className="flex-1 flex flex-col md:flex-row md:items-end md:justify-between relative z-10 w-full mb-6 md:mb-12">

        {/* Left Side (Desktop Bottom-Left / Mobile Center-Top) */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left mt-12 md:mt-0">
          <h1 className="font-serif font-medium text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] leading-[0.85] tracking-tight text-white drop-shadow-2xl">
            We built <br />
            <span className="italic font-light text-white/90">
              this studio
            </span>
          </h1>
          <div className="mt-6 md:mt-10">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white/60 font-serif text-[10px] md:text-[11px] tracking-[0.2em] uppercase">
              IN 72 HOURS
            </span>
          </div>
        </div>

        {/* Right Side (Desktop Bottom-Right / Mobile Bottom-Center) */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right mt-auto md:mt-0 max-w-lg md:max-w-xs lg:max-w-sm px-6 md:px-0">
          <p className="font-sans text-white/70 text-sm md:text-base leading-[1.7] mb-8 drop-shadow-md tracking-wide">
            How I hacked my way into this event<br className="hidden md:block" />
            using motion, standard frontend tools, and<br className="hidden md:block" />
            AI generation.
          </p>

          <button
            onClick={scrollToGallery}
            className="flex items-center gap-3 text-white/90 font-sans text-[10px] md:text-[11px] tracking-[0.25em] uppercase group cursor-pointer border-none bg-transparent p-0"
          >
            <span className="group-hover:text-accent transition-colors duration-500 relative drop-shadow-md">
              READ THE STORY
            </span>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-all group-hover:scale-110 group-hover:border-white/40">
              <ArrowDownRight weight="light" className="text-white/80 text-lg" />
            </div>
          </button>
        </div>

        {/* Background Glow (Centered behind main focus) */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-white/[0.03] blur-[150px] rounded-full pointer-events-none z-[-1] hidden md:block" />
      </div>
    </section>
  );
}
