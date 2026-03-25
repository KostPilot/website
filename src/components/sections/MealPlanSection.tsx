import PhoneMockup from "@/components/shared/PhoneMockup";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function MealPlanSection() {
  return (
    <section className="bg-[#111]">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-28">
        {/* Left: phone mockup — order reversed on desktop */}
        <ScrollReveal className="flex justify-center lg:order-first">
          <PhoneMockup
            screenSrc="/app-screens/meal-plan.svg"
            screenAlt="Kostpilot madplan med ugens retter"
          >
            {null}
          </PhoneMockup>
        </ScrollReveal>

        {/* Right: copy */}
        <div className="flex flex-col gap-7">
          <ScrollReveal delay={80}>
            <div className="flex flex-col gap-4">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#e84c1e]">
                Trin 2
              </p>
              <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.025em] text-white">
                Gør tilbud til en madplan for hele ugen
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="flex flex-col gap-5">
              <p className="max-w-md text-lg leading-relaxed text-[#999]">
                Vælg præferencer, antal portioner og hvor mange måltider du vil
                have dækket. Kostpilot bygger derefter en ugeplan omkring de
                bedste tilbud, så du slipper for at starte fra nul.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Tilpasset dine præferencer og din husstand",
                  "Kan dække både hverdage og hele ugen",
                  "Byt retter ud med få tryk",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#e84c1e]/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#e84c1e]" />
                    </span>
                    <span className="text-[15px] leading-snug text-[#999]">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
