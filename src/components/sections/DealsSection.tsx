import PhoneMockup from "@/components/shared/PhoneMockup";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function DealsSection() {
  return (
    <section id="deals" className="border-t border-black/6 bg-[#f8f5f0]">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-28">
        {/* Left: copy */}
        <div className="flex flex-col gap-7">
          <ScrollReveal>
            <div className="flex flex-col gap-4">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#e84c1e]">
                Trin 1
              </p>
              <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.025em] text-[#111]">
                Start med det, der faktisk er på tilbud
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className="flex flex-col gap-6">
              <p className="max-w-md text-lg leading-relaxed text-[#555]">
                Kostpilot samler ugens tilbud på tværs af butikker og viser dig
                varer, priser og besparelser i én oversigt, så du kan planlægge
                ud fra virkelige indkøbsmuligheder.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Opdateres, når de nye tilbud lander",
                  "Filtreret efter det du faktisk spiser",
                  "Samler flere butikker i samme visning",
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
            screenSrc="/app-screens/offers.svg"
            screenAlt="Kostpilot tilbudsskærm med ugens tilbud"
          >
            {null}
          </PhoneMockup>
        </ScrollReveal>
      </div>
    </section>
  );
}
