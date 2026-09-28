import Reveal from "./Reveal";

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

/** Trin 1: valgene tændes ét ad gangen, som i appens onboarding. */
function Prefs() {
  const chips = [
    ["150 kr om ugen", true],
    ["2 personer", true],
    ["Ingen svinekød", false],
    ["Netto", true],
    ["REMA 1000", true],
    ["Glutenfri", false],
    ["Hurtige retter", true],
  ] as const;
  return (
    <div className="demo flex h-full flex-col justify-center px-6">
      <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9a9a9a]" style={i(0)}>
        Hvad passer til dig?
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {chips.map(([t, on], n) => (
          <span
            key={t}
            style={i(n + 1)}
            className={`rounded-full px-3.5 py-2 text-[13.5px] font-medium ${on ? "chip-on" : "bg-white text-[#4a4a4a] ring-1 ring-black/10"}`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Trin 2: ugen fylder sig selv ud, med tilbuddene markeret. */
function Week() {
  const days = [
    ["Man", "Kyllingekarry", true],
    ["Tir", "Rester fra i går", false],
    ["Ons", "Pasta med linser", false],
    ["Tor", "Thai nudelsuppe", true],
    ["Fre", "Tacos", true],
  ] as const;
  return (
    <div className="demo flex h-full flex-col justify-center gap-2 px-5">
      {days.map(([d, dish, deal], n) => (
        <div key={d} style={i(n)} className="flex items-center gap-3 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <span className="w-8 text-[12px] font-semibold uppercase text-[#9a9a9a]">{d}</span>
          <span className="flex-1 truncate text-[14px] font-medium text-[#1c1c1c]">{dish}</span>
          {deal && <span className="rounded-md bg-[#f7e6de] px-2 py-0.5 text-[11px] font-semibold text-[#bd5e3c]">Tilbud</span>}
        </div>
      ))}
    </div>
  );
}

/** Trin 3: listen krydses af i butikkens rækkefølge, og timeren går. */
function Shop() {
  const items = ["Kyllingebryst", "Ris", "Hakkede tomater", "Spinat"];
  return (
    <div className="demo flex h-full items-center gap-5 px-6">
      <ul className="flex-1 space-y-2.5">
        {items.map((t, n) => (
          <li key={t} style={i(n)} className="flex items-center gap-3 text-[14px] text-[#1c1c1c]">
            <span className="chk flex h-5 w-5 shrink-0 items-center justify-center rounded-full ring-1 ring-black/15" style={i(n + 2)}>
              <svg viewBox="0 0 12 12" className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M2.5 6.2 5 8.5l4.5-5" />
              </svg>
            </span>
            <span className="chk-text" style={i(n + 2)}>
              {t}
            </span>
          </li>
        ))}
      </ul>
      <div style={i(5)} className="relative h-[92px] w-[92px] shrink-0">
        <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90" aria-hidden>
          <circle cx="18" cy="18" r="15.9155" fill="white" stroke="rgba(0,0,0,0.06)" strokeWidth="2.6" />
          <circle className="timer-ring" cx="18" cy="18" r="15.9155" fill="none" stroke="#d4704c" strokeWidth="2.6" strokeLinecap="round" pathLength={100} strokeDasharray="100" />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[17px] font-semibold tabular-nums text-[#1c1c1c]">4:55</span>
      </div>
    </div>
  );
}

const STEPS = [
  { t: "Fortæl hvad du kan lide", b: "Budget, hvor mange I er, og hvad I ikke spiser. Det tager et minut.", demo: <Prefs /> },
  { t: "Få ugens plan", b: "Ud fra tilbuddene i dine butikker og det, du allerede har i køkkenet.", demo: <Week /> },
  { t: "Handl og lav mad", b: "Listen i butikkens rækkefølge, og madlavning trin for trin med timer.", demo: <Shop /> },
];

/** Lys "papir"-del: sådan virker det i tre trin, vist med små levende skitser af appen. */
export default function HowItWorks() {
  return (
    <section id="saadan" className="relative overflow-hidden bg-[#f8f5f0] py-28 text-[#1c1c1c] sm:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#bd5e3c]">Sådan virker det</p>
          <h2 className="font-display mt-4 text-[40px] leading-[1.05] sm:text-[64px]">Tre trin. Så kører det.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-[18px] leading-relaxed text-[#4a4a4a]">Du fortæller det én gang. Derefter laver KostPilot ugen for dig, hver uge.</p>
        </Reveal>

        <div className="relative mt-20">
          {/* Snoren, der binder trinene sammen, med en prik der løber langs den */}
          <div className="cord-line absolute left-[16%] right-[16%] top-[150px] hidden h-px md:block" aria-hidden>
            <span className="cord-dot" />
          </div>

          <ol className="relative grid gap-6 md:grid-cols-3">
            {STEPS.map((s, n) => (
              <Reveal
                as="li"
                key={s.t}
                delay={n * 140}
                className="group rounded-[32px] bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_60px_-30px_rgba(0,0,0,0.22)] transition-transform duration-500 hover:-translate-y-1"
              >
                <div className="h-[300px] overflow-hidden rounded-[24px] bg-[#fbf0eb]">{s.demo}</div>
                <div className="px-5 pb-6 pt-7">
                  <p className="font-display text-[40px] leading-none text-[#d4704c]">{String(n + 1).padStart(2, "0")}</p>
                  <h3 className="mt-4 text-[22px] font-semibold">{s.t}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-[#4a4a4a]">{s.b}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="mx-auto mt-16 max-w-3xl text-center text-[14px] leading-relaxed text-[#9a9a9a]">
          Næringsdata: Den Danske Fødevaredatabase (fcdb.fooddata.dk), Fødevareinstituttet, Danmarks Tekniske Universitet, CC BY 4.0, suppleret med U.S. Department of
          Agriculture, FoodData Central. Opskriftsfotos fra Pexels.
        </Reveal>
      </div>
    </section>
  );
}
