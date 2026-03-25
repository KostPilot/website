import PhoneMockup from "@/components/shared/PhoneMockup";

function FloatingAccent({
  name,
  price,
  badge,
  colorClass,
  wrapperClass,
  floatClass,
}: {
  name: string;
  price: string;
  badge: string;
  colorClass: string;
  wrapperClass: string;
  floatClass: string;
}) {
  return (
    <div className={`pointer-events-none absolute hidden lg:block ${wrapperClass}`}>
      <div className={`${floatClass} w-36 rounded-xl bg-white shadow-lg`}>
        <div className={`h-10 rounded-t-xl ${colorClass}`} />
        <div className="px-2.5 py-2">
          <p className="text-[9px] font-semibold leading-tight text-[#111]">{name}</p>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#111]">{price}</span>
            <span className="rounded bg-[#e84c1e] px-1 py-0.5 text-[7px] font-bold text-white">
              {badge}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f8f5f0]">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
        {/* Left: copy — CSS-animated, no JS needed */}
        <div className="flex flex-col gap-7">
          <div className="hero-badge inline-flex w-fit rounded-full border border-[#e84c1e]/20 bg-[#fef1ec] px-3.5 py-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#e84c1e]">
              Beta venteliste åben
            </span>
          </div>

          <h1 className="hero-heading text-[clamp(2.4rem,5vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#111]">
            Planlæg din uge ud fra butikkernes tilbud
          </h1>

          <div className="hero-body flex flex-col gap-5">
            <p className="max-w-md text-lg leading-relaxed text-[#555]">
              Kostpilot samler tilbud, præferencer og opskrifter i én app, så du
              får en færdig madplan og en skarp indkøbsliste på få sekunder.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#final-cta"
                className="inline-flex items-center justify-center rounded-full bg-[#e84c1e] px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#c73d14]"
              >
                Skriv dig på ventelisten
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-1.5 px-2 py-3.5 text-[15px] font-medium text-[#555] transition-colors hover:text-[#111]"
              >
                Se hvordan det virker
                <span className="text-[#e84c1e]">→</span>
              </a>
            </div>

            <p className="text-xs font-medium uppercase tracking-widest text-[#aaa]">
              Gratis i beta · Invite code sendes ved lancering
            </p>
          </div>
        </div>

        {/* Right: phone mockup + subtle floating accents */}
        <div className="relative flex justify-center lg:justify-end">
          {/* Floating accent 1 — top right, very subtle */}
          <FloatingAccent
            name="Stegt flæsk"
            price="95 kr"
            badge="Tilpasset"
            colorClass="bg-gradient-to-br from-[#f5e0cc] to-[#eac9a8]"
            wrapperClass="-top-2 right-0 rotate-2 opacity-65"
            floatClass="float-slow"
          />
          {/* Floating accent 2 — lower left, very subtle */}
          <FloatingAccent
            name="Ugebudget"
            price="800 kr"
            badge="2 pers."
            colorClass="bg-gradient-to-br from-[#d4e8f5] to-[#b8d4e8]"
            wrapperClass="bottom-10 -left-2 -rotate-2 opacity-55"
            floatClass="float-medium"
          />

          <div className="hero-phone">
            <PhoneMockup
              screenSrc="/app-screens/preferences.svg"
              screenAlt="Kostpilot præference- og personaliseringsskærm"
              priority
            >
              {null}
            </PhoneMockup>
          </div>
        </div>
      </div>
    </section>
  );
}
