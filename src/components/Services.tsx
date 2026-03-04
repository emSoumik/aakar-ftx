import { Cpu, PenTool, Rocket } from "lucide-react";

const cards = [
  {
    icon: Cpu,
    accent: "#FF5F1F",
    title: "AI-Native Development",
    body: "Rapid prototyping, full-stack deployment, and AI-integrated workflows. We build products that think.",
  },
  {
    icon: PenTool,
    accent: "#FFB18F",
    title: "Design That Ships",
    body: "Brand identity, UI/UX, portfolio design, presentation decks. Beautiful work that does its job.",
  },
  {
    icon: Rocket,
    accent: "#FFE063",
    title: "Zero to Launch",
    body: "Domain, hosting, deployment — the whole stack in days, not months. Your idea, live and breathing.",
  },
];

export function Services() {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-14 bg-[#F5F0E8] px-20 py-24">
      {/* Header */}
      <div className="flex w-full flex-col items-center gap-[18px]">
        <span className="text-[12px] font-semibold uppercase tracking-[4px] text-[#FF5F1F]">
          WHAT WE DO
        </span>
        <h2 className="font-serif text-[60px] tracking-[-2px] text-[#2A2118]">
          Built for the AI era.
        </h2>
        <p className="text-[17px] leading-[1.6] text-[#7A6E5F]">
          We move fast, design sharp, and ship real things.
        </p>
      </div>

      {/* Cards */}
      <div className="flex w-full max-w-[1280px] gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="relative flex flex-1 flex-col gap-5 overflow-hidden rounded-[20px] border border-[#2C241610] bg-[#FFFDF7] p-8 pt-10 shadow-[0_8px_32px_#00000008] transition-transform hover:-translate-y-1"
          >
            {/* Accent top bar */}
            <div
              className="absolute left-0 right-0 top-0 h-[3px]"
              style={{ background: card.accent }}
            />
            <card.icon className="h-6 w-6 text-[#FF5F1F]" strokeWidth={1.5} />
            <h3 className="font-serif text-[26px] tracking-[-0.5px] text-[#2A2118]">
              {card.title}
            </h3>
            <p className="text-[15px] leading-[1.7] text-[#8A7A6A]">
              {card.body}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex flex-col items-center gap-6">
        <span className="font-serif text-[24px] italic text-[#3A302A]">
          Ready to move fast?
        </span>
        <a
          href="#contact"
          className="rounded-full bg-[#1C1612] px-8 py-3.5 text-[15px] font-semibold text-[#F5F0E8] transition-transform hover:scale-105"
        >
          Let's talk
        </a>
      </div>
    </section>
  );
}
