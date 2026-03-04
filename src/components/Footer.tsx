import { ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="flex w-full flex-col justify-between px-20 py-16"
      style={{
        minHeight: 500,
        background:
          "radial-gradient(ellipse 150% 100% at 50% 30%, #2A1F18 0%, #1C1612 50%, #1C1612 100%)",
      }}
    >
      {/* Top section */}
      <div className="flex w-full flex-col items-center gap-6">
        <h2 className="font-serif text-center text-[88px] italic leading-[0.95] tracking-[-3px] text-[#F5F0E8]">
          Let's build something fast.
        </h2>
        <p className="text-[17px] leading-[1.6] text-[#9E8E7E]">
          AI-native design &amp; development studio
        </p>
        <a
          href="https://aakarlabs.com"
          className="text-[17px] font-semibold text-[#FF5F1F] hover:underline"
        >
          aakarlabs.com
        </a>
        <a
          href="#start"
          className="mt-2 flex items-center gap-2 rounded-full bg-[#FF5F1F] px-9 py-4 text-[16px] font-semibold text-white shadow-[0_6px_24px_#FF5F1F44] transition-transform hover:scale-105"
        >
          Start a project
          <ArrowRight className="h-[18px] w-[18px]" />
        </a>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-[#FFFFFF10]" />

      {/* Bottom bar */}
      <div className="flex w-full items-center justify-between">
        <span className="text-[13px] text-[#6B5E52]">
          &copy; 2025 Aakar Labs
        </span>
        <div className="flex items-center gap-10">
          {["Work", "Studio", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[14px] text-[#9E8E7E] transition-colors hover:text-[#F5F0E8]"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
