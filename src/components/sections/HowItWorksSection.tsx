import ScrollReveal from "@/components/shared/ScrollReveal";

const STEPS = [
  {
    number: "01",
    headline: "Pick your preferences",
    copy: "Tell Kostpilot what you like to eat, how many people you cook for, and any dietary needs. Takes about 60 seconds.",
  },
  {
    number: "02",
    headline: "Review your meal plan",
    copy: "We generate a full week of meals built around that week's supermarket deals. Swap anything you don't like.",
  },
  {
    number: "03",
    headline: "Shop with one list",
    copy: "Your grocery list is ready — organised by aisle, with a running total. One efficient trip to the store.",
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
              How it works
            </p>
            <h2 className="max-w-lg text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.025em] text-[#111]">
              Three steps to a smarter week
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
