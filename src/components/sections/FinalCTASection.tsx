import PhoneMockup from "@/components/shared/PhoneMockup";
import WaitlistSignupForm from "@/components/forms/WaitlistSignupForm";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function FinalCTASection() {
  return (
    <section id="final-cta" className="bg-[#111]">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-28">
        {/* Left: copy */}
        <div className="flex flex-col gap-8">
          <ScrollReveal>
            <h2 className="text-[clamp(2.4rem,5vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
              Skriv dig på ventelisten
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="flex flex-col gap-7">
              <p className="max-w-md text-lg leading-relaxed text-[#888]">
                Vi bruger ventelisten til at sende invite code, når Kostpilot er
                klar. Skriv dig op nu, hvis du vil være blandt de første til at
                teste appen.
              </p>

              <div className="flex flex-col gap-4">
                <WaitlistSignupForm />
                <p className="text-[11px] font-medium uppercase tracking-widest text-[#555]">
                  Betaadgang · Invite code sendes på e-mail · iOS først
                </p>
              </div>

              <a
                href="mailto:hello@kostpilot.app"
                className="w-fit text-sm text-[#555] transition-colors hover:text-[#888]"
              >
                Spørgsmål? hello@kostpilot.app
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Right: phone mockup */}
        <ScrollReveal delay={180} className="flex justify-center lg:justify-end">
          <PhoneMockup
            screenSrc="/app-screens/recipe.svg"
            screenAlt="Opskriftsskærm fra Kostpilot med dansk ret"
          >
            {null}
          </PhoneMockup>
        </ScrollReveal>
      </div>
    </section>
  );
}
