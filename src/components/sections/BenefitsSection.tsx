const BENEFITS = [
  {
    headline: "Spar penge",
    body: "Din madplan tager udgangspunkt i ugens aktuelle tilbud, så du køber ind efter priserne i butikkerne og ikke efter tilfældige idéer.",
  },
  {
    headline: "Spar tid",
    body: "Du slipper for at kombinere tilbudsaviser, opskrifter og noter selv. Kostpilot samler plan, retter og indkøb ét sted.",
  },
  {
    headline: "Få mere ro",
    body: "Du ved på forhånd hvad der skal laves, hvad det koster, og hvad der skal købes. Mindre beslutningstræthed og mindre madspild.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="bg-[#f8f5f0]">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-4">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#e84c1e]">
            Hvorfor Kostpilot
          </p>
          <h2 className="max-w-md text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.025em] text-[#111]">
            Mindre friktion. Mere overblik. Bedre hverdagsmad.
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
