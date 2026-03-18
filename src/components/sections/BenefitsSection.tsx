const BENEFITS = [
  {
    headline: "Save money",
    body: "Your meal plan is built around this week's deals — not last week's prices. On average, users reduce their grocery bill by planning around offers rather than against them.",
  },
  {
    headline: "Save time",
    body: "No more scrolling recipe sites, cross-referencing deals, and cobbling together a list. One plan, one list, one efficient trip.",
  },
  {
    headline: "No more dinner panic",
    body: "Know exactly what you're cooking every night before the week starts. No last-minute decisions, no food waste, no 6pm \"what's for dinner\" stress.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="bg-[#f8f5f0]">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-4">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#e84c1e]">
            Why Kostpilot
          </p>
          <h2 className="max-w-md text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.025em] text-[#111]">
            Less effort. More clarity. Better meals.
          </h2>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 gap-0 divide-y divide-[#e8e4df] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {BENEFITS.map((benefit) => (
            <div key={benefit.headline} className="flex flex-col gap-4 py-8 sm:px-8 sm:py-0 sm:first:pl-0 sm:last:pr-0">
              <h3 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold leading-tight tracking-[-0.02em] text-[#111]">
                {benefit.headline}
              </h3>
              <p className="text-[15px] leading-relaxed text-[#666]">
                {benefit.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
