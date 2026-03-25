import ScrollReveal from "@/components/shared/ScrollReveal";

const STEPS = [
  {
    number: "01",
    headline: "Vælg dine præferencer",
    copy: "Fortæl Kostpilot hvad du gerne vil spise, hvor mange du laver mad til, og om der er noget du vil undgå. Det tager under et minut.",
  },
  {
    number: "02",
    headline: "Gennemgå din madplan",
    copy: "Vi sammensætter en ugeplan baseret på ugens tilbud. Hvis noget ikke passer, kan du skifte retter ud med få tryk.",
  },
  {
    number: "03",
    headline: "Handl med én liste",
    copy: "Din indkøbsliste er klar med butiksoverblik, kategoriinddeling og løbende total, så én tur i butikken er nok.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-14 flex flex-col gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#e84c1e]">
              Sådan virker det
            </p>
            <h2 className="max-w-lg text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.025em] text-[#111]">
              Tre trin til en roligere uge
            </h2>
          </div>
        </ScrollReveal>

        {/* Steps — staggered left-to-right cascade */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {STEPS.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 100}>
              <div className="flex flex-col gap-5">
                {/* Number */}
                <span className="text-[3rem] font-bold leading-none tracking-tight text-[#e84c1e]/20">
                  {step.number}
                </span>
                {/* Divider */}
                <div className="h-px w-full bg-[#e8e4df]" />
                {/* Text */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-[18px] font-bold text-[#111]">
                    {step.headline}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[#666]">
                    {step.copy}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
