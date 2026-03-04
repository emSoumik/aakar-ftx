export function Story() {
  const milestones = [
    { label: "Website & domain", sub: "Live in hours" },
    { label: "Portfolio & case studies", sub: "Built overnight" },
    { label: "Deployed & production-ready", sub: "Day 3" },
    { label: "AI-native workflow", sub: "Start to finish" },
  ];

  return (
    <section className="flex w-full bg-[#1C1612]" style={{ minHeight: 740 }}>
      {/* Left panel */}
      <div
        className="flex w-[720px] shrink-0 flex-col justify-center gap-12 p-20"
        style={{
          background:
            "radial-gradient(ellipse 140% 120% at 20% 80%, rgba(255,95,31,0.07) 0%, transparent 100%)",
        }}
      >
        <span className="text-[11px] font-semibold uppercase tracking-[2px] text-[#FF5F1F]">
          Our Story
        </span>
        <h2 className="font-serif max-w-[560px] text-[76px] italic leading-[1.02] tracking-[-3px] text-[#F5F0E8]">
          72 hours.
          <br />
          One idea.
          <br />
          Everything
          <br />
          from scratch.
        </h2>
        <p className="max-w-[480px] text-[15px] leading-[1.7] text-[#9E8E7E]">
          We built Aakar Labs — design, code, portfolio, domain, and deployment
          — in a single sprint.
        </p>
      </div>

      {/* Divider */}
      <div className="w-px self-stretch bg-[#FFFFFF12]" />

      {/* Right panel */}
      <div
        className="flex flex-1 flex-col justify-center px-[72px] py-20"
        style={{
          background:
            "radial-gradient(ellipse 120% 100% at 80% 20%, rgba(255,95,31,0.03) 0%, transparent 100%)",
        }}
      >
        <span className="text-[11px] font-semibold uppercase tracking-[2px] text-[#FF5F1F]">
          Proof of work
        </span>

        <div className="h-6" />

        {milestones.map((m, i) => (
          <div key={i}>
            <div className="flex items-center gap-4 py-7">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#FF5F1F]" />
              <div className="flex flex-col gap-1">
                <span className="text-[19px] font-medium text-[#F5F0E8]">
                  {m.label}
                </span>
                <span className="text-[14px] text-[#9E8E7E]">{m.sub}</span>
              </div>
            </div>
            {i < milestones.length - 1 && (
              <div className="h-px w-full bg-[#FFFFFF12]" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
