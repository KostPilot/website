import LogoMark from "./LogoMark";
import Phone from "./Phone";

/** Keynote-åbningen: mørk scene, logoet tegner sig selv, stor overskrift, tre telefoner der glider op. */
export default function Hero() {
  return (
    <section id="top" data-theme="dark" className="relative overflow-hidden bg-[#0f0d0c] pt-28 text-white sm:pt-32">
      <div className="glow top-[-18%] h-[900px] w-[900px]" style={{ left: "calc(50% - 450px)" }} />
      <div className="relative mx-auto max-w-5xl px-5 text-center">
        <div className="relative mx-auto w-fit" style={{ "--logo-delay": "0.7s" } as React.CSSProperties}>
          <div className="beam" />
          <div className="beam-splash" />
          <LogoMark size={88} animate cord="#0f0d0c" />
        </div>
        <p className="rise mt-8 text-[13px] font-semibold uppercase tracking-[0.22em] text-[#a1a1a6]" style={{ "--delay": "1100ms" } as React.CSSProperties}>
          Kommer snart til iPhone
        </p>
        <h1 className="rise font-display mx-auto mt-5 max-w-4xl text-[44px] leading-[1.02] sm:text-[76px]" style={{ "--delay": "1250ms" } as React.CSSProperties}>
          Madplanen, der <span className="accent-text">betaler sig selv.</span>
        </h1>
        <p className="rise mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/70 sm:text-[19px]" style={{ "--delay": "1400ms" } as React.CSSProperties}>
          KostPilot finder ugens bedste tilbud, laver en madplan du faktisk har lyst til, og holder styr på indkøb, budget og køkken. Du spiser bedre og bruger færre penge uden at tænke over det.
        </p>
        <div className="rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ "--delay": "1550ms" } as React.CSSProperties}>
          <a href="#venteliste" className="rounded-full bg-[#D4704C] px-7 py-3.5 text-[16px] font-semibold text-white transition hover:bg-[#BD5E3C]">
            Skriv dig på ventelisten
          </a>
          <a href="#funktioner" className="rounded-full px-6 py-3.5 text-[16px] font-medium text-white/80 ring-1 ring-white/15 transition hover:text-white hover:ring-white/30">
            Se hvad den kan
          </a>
        </div>
      </div>

      {/* Tre telefoner: madplan, hjem, opdag */}
      <div className="relative mx-auto mt-16 flex max-w-5xl items-end justify-center gap-4 px-5 sm:mt-20 sm:gap-8">
        <div className="rise hidden w-[220px] translate-y-10 sm:block" style={{ "--delay": "1750ms" } as React.CSSProperties}>
          <Phone src="/screens/madplan.webp" alt="Madplanen for ugen" />
        </div>
        <div className="rise w-[250px] sm:w-[290px]" style={{ "--delay": "1650ms" } as React.CSSProperties}>
          <Phone src="/screens/hjem.webp" alt="Hjem: dagens overblik" priority />
        </div>
        <div className="rise hidden w-[220px] translate-y-10 sm:block" style={{ "--delay": "1850ms" } as React.CSSProperties}>
          <Phone src="/screens/opdag.webp" alt="Opdag nye retter" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0f0d0c] to-transparent" />
      </div>
    </section>
  );
}
