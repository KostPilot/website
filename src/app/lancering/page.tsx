import type { Metadata } from "next";
import Nav from "@/components/site/Nav";
import Reveal from "@/components/site/Reveal";
import LogoMark from "@/components/site/LogoMark";
import DepartureBoard from "@/components/site/DepartureBoard";
import WaitlistSignupForm from "@/components/forms/WaitlistSignupForm";
import { Footer } from "@/components/site/Closing";
import { CountUp } from "@/components/site/motion";

export const metadata: Metadata = {
  title: "Lancering",
  description: "KostPilot er i lukket beta, og næste stop er TestFlight. Se hvor langt vi er mod App Store, og skriv dig på ventelisten.",
  alternates: { canonical: "/lancering" },
  openGraph: {
    type: "article",
    siteName: "KostPilot",
    locale: "da_DK",
    url: "/lancering",
    title: "Lancering · KostPilot",
    description: "KostPilot er i lukket beta, og næste stop er TestFlight. Se hvor langt vi er mod App Store, og skriv dig på ventelisten.",
    images: [{ url: "/og/lancering.jpg", width: 1200, height: 630, alt: "KostPilot til iPhone. Snart." }],
  },
  twitter: { card: "summary_large_image", title: "Lancering · KostPilot", description: "KostPilot er i lukket beta, og næste stop er TestFlight. Se hvor langt vi er mod App Store, og skriv dig på ventelisten.", images: ["/og/lancering.jpg"] },
};

// Ærlig status uden datoer. Ret rækkerne, når vi rykker et trin (se docs/STATUS_OG_PLAN.md i appen).
const BOARD = [
  { flight: "KP 01", dest: "Lukket beta", status: "I luften", tone: "text-[#8fcf99]", live: true },
  { flight: "KP 02", dest: "TestFlight", status: "Boarding snart", tone: "text-[#f0a283]" },
  { flight: "KP 03", dest: "App Store", status: "Planlagt", tone: "text-white/60" },
];

type Status = "Klar" | "I gang" | "Senere";
const TONE: Record<Status, string> = {
  Klar: "bg-[#6fae7a]/15 text-[#8fcf99]",
  "I gang": "bg-[#d4704c]/15 text-[#f0a283]",
  Senere: "bg-white/[0.08] text-white/55",
};

function Tag({ s }: { s: Status }) {
  return (
    <span className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.14em] ${TONE[s]}`}>
      <span className={`h-1.5 w-1.5 rounded-full bg-current ${s === "I gang" ? "live-dot" : ""}`} />
      {s}
    </span>
  );
}

const card = "relative overflow-hidden rounded-[30px] bg-[#141110] p-7 ring-1 ring-white/[0.07] sm:p-8";

export default function Launch() {
  return (
    <>
      <Nav />
      <main className="bg-[#0f0d0c] text-white">
        {/* Solopgangen: en glødende planet stiger op bag "Snart." */}
        <section data-theme="dark" className="grain relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-44 pt-28 text-center">
          <div className="launch-sky" />
          <div className="horizon" />
          <div className="relative">
            <p className="rise text-[13px] font-semibold uppercase tracking-[0.22em] text-[#a1a1a6]" style={{ "--delay": "300ms" } as React.CSSProperties}>
              KostPilot til iPhone
            </p>
            <h1 className="rise snart font-display mt-5 text-[96px] leading-[0.9] sm:text-[180px]" style={{ "--delay": "450ms" } as React.CSSProperties}>
              <span className="accent-text">Snart.</span>
            </h1>
            <p className="rise mx-auto mt-8 max-w-xl text-[17px] leading-relaxed text-white/70 sm:text-[19px]" style={{ "--delay": "650ms" } as React.CSSProperties}>
              Vi har ikke sat en dato endnu, og vi lover ikke en, vi ikke kan holde. Men flyet er i luften, og næste stop er TestFlight.
            </p>
            <a
              href="#venteliste"
              className="rise mt-10 inline-block rounded-full bg-[#D4704C] px-7 py-3.5 text-[16px] font-semibold text-white shadow-[0_10px_40px_-8px_rgba(224,112,70,0.7)] transition hover:bg-[#BD5E3C]"
              style={{ "--delay": "800ms" } as React.CSSProperties}
            >
              Skriv dig på ventelisten
            </a>
          </div>
        </section>

        {/* Afgangstavlen */}
        <section data-theme="dark" className="mx-auto max-w-4xl px-5 py-24">
          <Reveal className="text-center">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#D4704C]">Afgange</p>
            <h2 className="font-display mt-4 text-[38px] leading-[1.05] sm:text-[56px]">Tre stop til App Store.</h2>
          </Reveal>
          <Reveal delay={150} className="mt-12">
            <DepartureBoard rows={BOARD} />
          </Reveal>
        </section>

        {/* Pre-flight tjek: det sidste før take-off, vist med rigtige tal */}
        <section data-theme="dark" className="mx-auto max-w-6xl px-5 py-24">
          <Reveal className="text-center">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#D4704C]">Pre-flight tjek</p>
            <h2 className="font-display mt-4 text-[38px] leading-[1.05] sm:text-[56px]">Sidste tjek før take-off.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-white/65">
              Det her er klar, og det her bygger vi på, før de første fra ventelisten får adgang.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-4 md:grid-cols-6">
            {/* Opskriftsbilleder: stort kort med fremdriftsbjælke */}
            <Reveal className={`${card} md:col-span-4 md:row-span-2`}>
              <div className="glow -right-32 -top-32 h-96 w-96" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/screens/opskrift.webp"
                alt=""
                loading="lazy"
                className="absolute -bottom-40 right-8 hidden w-[240px] rotate-[6deg] rounded-[34px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] ring-[6px] ring-[#0b0b0c] md:block"
              />
              <div className="relative flex h-full flex-col md:max-w-[58%]">
                <Tag s="I gang" />
                <h3 className="font-display mt-6 text-[30px] leading-[1.1] sm:text-[40px]">Et billede til hver ret.</h3>
                <p className="mt-3 max-w-md text-[16px] leading-relaxed text-white/60">
                  Hver opskrift skal have et billede, der viser netop den ret, og som vi har ret til at bruge. Vi tjekker dem én for én.
                </p>
                <div className="mt-auto pt-10">
                  <p className="font-display text-[64px] leading-none sm:text-[88px]">
                    <span className="accent-text">
                      <CountUp to={253} />
                    </span>
                    <span className="text-[0.38em] text-white/40"> af 354 retter</span>
                  </p>
                  <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/[0.08]">
                    <div className="bar-fill h-full rounded-full bg-gradient-to-r from-[#bd5e3c] via-[#d4704c] to-[#f0a283] shadow-[0_0_20px_rgba(224,112,70,0.6)]" style={{ "--w": "71%" } as React.CSSProperties} />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Næringsdata: ring */}
            <Reveal delay={100} className={`${card} md:col-span-2`}>
              <Tag s="I gang" />
              <div className="mt-6 flex items-center gap-5">
                <svg viewBox="0 0 36 36" className="h-20 w-20 shrink-0 -rotate-90" aria-hidden>
                  <circle cx="18" cy="18" r="15.9155" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                  <circle
                    className="ring-fill"
                    cx="18"
                    cy="18"
                    r="15.9155"
                    fill="none"
                    stroke="#8fcf99"
                    strokeWidth="3"
                    strokeLinecap="round"
                    pathLength={100}
                    strokeDasharray="100"
                    style={{ "--p": 77 } as React.CSSProperties}
                  />
                </svg>
                <div>
                  <p className="font-display text-[34px] leading-none">
                    <CountUp to={498} />
                  </p>
                  <p className="mt-1 text-[14px] text-white/55">af ca. 650 ingredienser</p>
                </div>
              </div>
              <h3 className="mt-6 text-[19px] font-semibold">Næring på hver ingrediens</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-white/55">Koblet til Den Danske Fødevaredatabase (DTU).</p>
            </Reveal>

            {/* Log ind med Apple */}
            <Reveal delay={180} className={`${card} md:col-span-2`}>
              <Tag s="I gang" />
              <div className="mt-6 flex h-12 items-center justify-center rounded-full bg-white text-[15px] font-semibold text-black">Fortsæt med Apple</div>
              <h3 className="mt-6 text-[19px] font-semibold">Ind med ét tryk</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-white/55">Ingen ny adgangskode at huske.</p>
            </Reveal>

            {/* Klar: tilbud hver dag */}
            <Reveal delay={100} className={`${card} md:col-span-2`}>
              <Tag s="Klar" />
              <p className="font-display mt-6 text-[48px] leading-none">
                <CountUp to={204} />
              </p>
              <h3 className="mt-3 text-[19px] font-semibold">Kædetilbud, opdateret hver dag</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-white/55">Fra Salling-kæderne og REMA 1000, automatisk hver dag.</p>
            </Reveal>

            {/* Klar: hele vejen */}
            <Reveal delay={160} className={`${card} md:col-span-2`}>
              <Tag s="Klar" />
              <div className="mt-6 flex flex-wrap gap-1.5 text-[13px] text-white/75">
                {["Tilbud", "Madplan", "Opskrift", "Indkøb", "Madlavning"].map((x, i, a) => (
                  <span key={x} className="flex items-center gap-1.5">
                    <span className="rounded-full bg-white/[0.08] px-2.5 py-1">{x}</span>
                    {i < a.length - 1 && <span className="text-[#d4704c]">→</span>}
                  </span>
                ))}
              </div>
              <h3 className="mt-6 text-[19px] font-semibold">Fra tilbud til tallerken</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-white/55">Hele vejen virker på en rigtig iPhone.</p>
            </Reveal>

            {/* Privatliv */}
            <Reveal delay={220} className={`${card} md:col-span-2`}>
              <Tag s="I gang" />
              <svg viewBox="0 0 24 24" className="mt-6 h-10 w-10 text-[#f0a283]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
                <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
              </svg>
              <h3 className="mt-5 text-[19px] font-semibold">Privatliv på almindeligt dansk</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-white/55">Hvad der gemmes, hvor, og hvorfor. Uden småt.</p>
            </Reveal>

            {/* Senere: piloten på telefonen */}
            <Reveal delay={120} className={`${card} md:col-span-6`}>
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <Tag s="Senere" />
                  <h3 className="font-display mt-5 text-[28px] leading-[1.1] sm:text-[34px]">Vores egen pilot, på din telefon.</h3>
                  <p className="mt-2 max-w-xl text-[15.5px] leading-relaxed text-white/55">
                    Vi træner vores egen model, der skal køre på selve telefonen. Den kommer i en senere version, efter TestFlight.
                  </p>
                </div>
                <div className="flex items-end gap-3" aria-label="Fjerde version er trænet">
                  {[1, 2, 3, 4].map((v) => (
                    <div key={v} className="flex flex-col items-center gap-2">
                      <div
                        className="w-10 rounded-lg bg-gradient-to-t from-[#bd5e3c] to-[#f0a283]"
                        style={{ height: 22 + v * 16, opacity: 0.35 + v * 0.16, boxShadow: v === 4 ? "0 0 24px rgba(224,112,70,0.6)" : undefined }}
                      />
                      <span className="text-[12px] text-white/50">v{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
          <p className="mt-6 text-center text-[13px] text-white/40">Tallene er fra 27. september 2026.</p>
        </section>

        {/* Ventelisten */}
        <section id="venteliste" data-theme="dark" className="relative overflow-hidden py-28">
          <div className="glow h-[760px] w-[760px]" style={{ left: "calc(50% - 380px)", top: "calc(50% - 380px)" }} />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 text-center">
            <Reveal>
              <LogoMark size={64} cord="#0f0d0c" />
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-display mt-6 text-[40px] leading-[1.05] sm:text-[62px]">Få en plads på første fly.</h2>
              <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-white/70">
                Dem på ventelisten hører fra os først, når vi åbner for TestFlight.
              </p>
            </Reveal>
            <Reveal delay={200} className="mt-10 flex w-full justify-center">
              <WaitlistSignupForm />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
