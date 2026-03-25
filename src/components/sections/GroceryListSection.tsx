import PhoneMockup from "@/components/shared/PhoneMockup";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function GroceryListSection() {
  return (
    <section className="bg-[#f2ede6]">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-28">
        {/* Left: copy */}
        <div className="flex flex-col gap-7">
          <ScrollReveal>
            <div className="flex flex-col gap-4">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#e84c1e]">
                Trin 3
              </p>
              <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.025em] text-[#111]">
                Få én smart indkøbsliste
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className="flex flex-col gap-6">
              <p className="max-w-md text-lg leading-relaxed text-[#555]">
                Når din madplan er valgt, samler Kostpilot alle ingredienser i én
                organiseret indkøbsliste med budget og butiksoversigt, så du ved
                præcis hvad du skal købe og hvor.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Oprettes automatisk fra din madplan",
                  "Sorteret efter butik og kategori",
                  "Viser løbende total, så budgettet holder",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-[#555]">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#e84c1e]/12">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#e84c1e]" />
                    </span>
                    <span className="text-[15px] leading-snug">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* Right: phone mockup */}
        <ScrollReveal delay={150} className="flex justify-center lg:justify-end">
          <PhoneMockup
            screenSrc="/app-screens/shopping-list.svg"
            screenAlt="Kostpilot indkøbsliste med budget og butiksoverblik"
          >
            {null}
          </PhoneMockup>
        </ScrollReveal>
      </div>
    </section>
  );
}
