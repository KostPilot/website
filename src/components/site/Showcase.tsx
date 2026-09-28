import Phone from "./Phone";
import Reveal from "./Reveal";
import LogoMark from "./LogoMark";
import Highlights, { type Highlight } from "./Highlights";
import DishTweaker from "./DishTweaker";
import { CountUp, ScrollWords } from "./motion";

// Rækkefølgen følger en uge med KostPilot: tilbud -> plan -> opskrift -> indkøb -> madlavning.
const FEATURES: Highlight[] = [
  {
    eyebrow: "Ugens tilbud",
    title: "Tilbuddene. Allerede sorteret for dig.",
    body: "KostPilot følger tilbuddene i Netto, REMA 1000, Føtex og Bilka og viser dem, der passer til din madplan. Sæt prisvagt på det, du køber tit, så siger den til, når det er billigt igen.",
    img: "/screens/tilbud.webp",
    alt: "Ugens tilbud i appen",
    fx: "aurora",
  },
  {
    eyebrow: "Madplan",
    title: "En hel uge planlagt på sekunder.",
    body: "Vælg budget og de dage, du er hjemme. Piloten bygger en varieret uge ud fra tilbuddene, din smag og det, du allerede har i køkkenet. Byt en ret med ét tryk.",
    img: "/screens/madplan.webp",
    alt: "Madplanen for ugen",
    fx: "grid",
  },
  {
    eyebrow: "Opskrifter",
    title: "Find noget, du rent faktisk har lyst til.",
    body: "Bladr gennem retter som i en feed. Hver opskrift viser pris, tid og hvilke ingredienser der er på tilbud lige nu.",
    img: "/screens/opskrift.webp",
    alt: "En opskrift med tilbudsvarer",
    fx: "orbs",
  },
  {
    eyebrow: "Indkøb",
    title: "Handl i butikkens rækkefølge.",
    body: "Indkøbslisten laver sig selv, sorteret efter butikkens gange, så du går igennem én gang. Del den med dem, du bor med.",
    img: "/screens/indkob.webp",
    alt: "Indkøbslisten sorteret efter butikkens rute",
    fx: "aisles",
  },
  {
    eyebrow: "Madlavning",
    title: "Trin for trin. Timeren går med.",
    body: "Ét trin ad gangen, med timere i Dynamic Island og på låseskærmen, der kører videre, når du lægger telefonen fra dig.",
    img: "/screens/madlavning-timer.webp",
    alt: "Madlavning med timer",
    fx: "steam",
  },
  {
    eyebrow: "Madskabere",
    title: "Følg dem, der laver maden, du kan lide.",
    body: "Snart kan du følge danske madskabere i appen og lægge deres retter direkte ind i madplanen, med priser fra ugens tilbud.",
    img: "/screens/skaber.webp",
    alt: "En madskabers profil i appen",
    fx: "rings",
  },
  {
    eyebrow: "Næringsindhold",
    title: "Alt, hvad der er i maden.",
    body: "Tryk på en ingrediens og se vitaminer, mineraler og fedtsyrer, og hvad netop din mængde indeholder. Data fra Den Danske Fødevaredatabase (DTU).",
    img: "/screens/naering.webp",
    alt: "Næringsindhold for en ingrediens",
    fx: "pulse",
  },
];

export default function Showcase() {
  return (
    <section id="funktioner" data-theme="dark" className="relative overflow-clip bg-[#0f0d0c] pb-32 pt-24 text-white">
      <div className="mx-auto max-w-5xl px-5 text-center">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#D4704C]">Alt i én app</p>
        </Reveal>
        <ScrollWords
          className="font-display mt-6 text-[36px] leading-[1.12] sm:text-[64px]"
          text="Tilbuddene former madplanen. Madplanen bliver til indkøbslisten. Og det, du laver, gør næste uge *bedre.*"
        />
      </div>

      <Numbers />

      <Highlights items={FEATURES} />

      <DishTweaker />

      <Pilot />
      <Recap />
      <Together />
    </section>
  );
}

/** Tal fra appen i dag. Kun rigtige tal (docs/STATUS_OG_PLAN.md i appen); ret dem, når de ændrer sig. */
function Numbers() {
  const stats = [
    { n: 354, label: "opskrifter med pris og fremgangsmåde" },
    { n: 4, label: "kæder i tilbudsavisen: Netto, REMA 1000, Føtex og Bilka" },
    { n: 498, label: "ingredienser med næringsdata fra DTU" },
  ];
  return (
    <div className="mx-auto mt-24 grid max-w-5xl gap-10 px-5 text-center sm:grid-cols-3 sm:gap-6">
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 120}>
          <p className="font-display accent-text text-[64px] leading-none sm:text-[80px]">
            <CountUp to={s.n} />
          </p>
          <p className="mx-auto mt-3 max-w-[16rem] text-[15px] leading-relaxed text-white/60">{s.label}</p>
        </Reveal>
      ))}
    </div>
  );
}

/** Piloten: en samtale der viser hukommelse, handling og fagligt svar på én gang. */
function Pilot() {
  const lines: { who: "user" | "pilot"; text: string; chip?: string }[] = [
    { who: "user", text: "har 150 kr til resten af ugen og gider ikke lave mad hver aften. hvad gør jeg?" },
    {
      who: "pilot",
      text: "Lav en stor gryde kyllingekarry søndag, så har du aftensmad til tre dage. Kyllingen er på tilbud i Netto, og hele ugen lander på ca. 140 kr.",
      chip: "Husket: budget 150 kr om ugen",
    },
    { who: "user", text: "jeg har også en halv pose ris og noget spinat der skal bruges" },
    {
      who: "pilot",
      text: "Godt, så bruger vi dem i stedet for at købe nyt. Madplanen er klar, og der står kun fire ting på indkøbslisten. Skal jeg dele den med din roomie?",
      chip: "Madplan lavet · 4 varer på listen",
    },
  ];
  return (
    <div className="mx-auto mt-40 max-w-5xl px-5">
      <Reveal className="text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#D4704C]">Piloten</p>
        <h3 className="font-display mt-4 text-[38px] leading-[1.05] sm:text-[60px]">En madven, der kender dig.</h3>
        <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-white/65">
          Spørg om hvad som helst om mad og madbudget, eller bed den om at gøre tingene for dig. Den husker, hvad du kan lide, og hvad du har i køkkenet, og den siger til, før havregrynene slipper op.
        </p>
      </Reveal>
      <Reveal delay={150} className="mx-auto mt-14 max-w-2xl rounded-[32px] bg-white/[0.04] p-5 ring-1 ring-white/10 sm:p-8">
        <div className="flex flex-col gap-4">
          {lines.map((l, i) => (
            <Reveal key={i} delay={300 + i * 550} className={`flex ${l.who === "user" ? "justify-end" : "justify-start gap-3"}`}>
              {l.who === "pilot" && (
                <div className="mt-1 shrink-0">
                  <LogoMark size={26} cord="#0f0d0c" />
                </div>
              )}
              <div className={`max-w-[85%] ${l.who === "user" ? "rounded-[22px] rounded-br-md bg-[#3a2a22] px-4 py-3" : ""}`}>
                <p className="text-[15.5px] leading-relaxed text-white/90">{l.text}</p>
                {l.chip && <p className="mt-2 inline-block rounded-lg border border-[#6fae7a]/60 px-2.5 py-0.5 text-[12.5px] font-semibold text-[#8fcf99]">{l.chip}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>
      <Reveal delay={250} className="mt-6 text-center text-[13px] text-white/45">
        Eksempel. Piloten er under udvikling og kommer i en senere version.
      </Reveal>
    </div>
  );
}

/** Din måned: recap-billederne toner over i hinanden som en lille film. */
function Recap() {
  const frames = ["recap-1", "recap-2", "recap-3", "recap-4", "recap-del"];
  return (
    <div className="relative mt-40 overflow-hidden">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-5 md:flex-row md:gap-20">
        <Reveal className="max-w-xl text-center md:text-left">
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#D4704C]">Din måned</p>
          <h3 className="font-display mt-4 text-[38px] leading-[1.05] sm:text-[60px]">
            Hvad sparede du i <span className="accent-text">september?</span>
          </h3>
          <p className="mt-5 text-[17px] leading-relaxed text-white/70">
            Hver måned får du din egen lille historie: hvad du sparede, hvad du lavede, din yndlingsret og hvad piloten lærte om dig. Del den med ét tryk, i kroner eller procent.
          </p>
        </Reveal>
        <Reveal delay={120} className="relative w-[270px] shrink-0 sm:w-[300px]">
          <div className="glow -inset-28" />
          <div className="relative aspect-[1000/2100] rounded-[16%/7.4%] bg-[#0b0b0c] p-[3.2%] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
            <div className="reel relative h-full w-full overflow-hidden rounded-[13%/6%]">
              {frames.map((f, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={f} src={`/screens/${f}.webp`} alt={i === 0 ? "Månedens recap" : ""} className="h-full w-full object-cover" style={{ animationDelay: `${i * 3.5}s` }} loading="lazy" />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
      <div className="ribbon mt-24 -ml-[10%] w-[120%] text-[13px] font-bold uppercase tracking-[0.3em] text-white/90">
        <div className="ribbon-track">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Sparet på tilbud", "Retter lavet", "Månedens favorit", "Næste måls opsparing", "Del med vennerne"].map((t) => <span key={`${k}-${t}`}>{t} ·</span>)
          )}
        </div>
      </div>
    </div>
  );
}

type Social = { eyebrow: string; title: string; body: string; img: string; alt: string; fx: "sync" | "gift"; chips: string[] };

const SOCIAL: Social[] = [
  {
    eyebrow: "Køkkenholdet",
    title: "Del madplan og indkøb med dem, du bor med.",
    body: "Én fælles indkøbsliste, der opdateres live, et fælles budget og et fælles køleskab. Ingen dobbeltkøb.",
    img: "/screens/kokkenholdet.webp",
    alt: "Køkkenholdet: husstanden deler indkøbsliste, budget og madplan",
    fx: "sync",
    chips: ["Mælk tilføjet", "Ris krydset af", "Budget opdateret", "Tacos på fredag"],
  },
  {
    eyebrow: "Giv en ven en pilot",
    title: "Kender du én, der altid er flad før SU'en?",
    body: "Del KostPilot med en QR-kode formet som vores logo, eller send den med AirDrop. Snart: sparedyst, hvor I ser, hvem der sparer flest procent.",
    img: "/screens/gave.webp",
    alt: "Giv en ven en pilot med en QR-kode",
    fx: "gift",
    chips: ["Gave sendt", "QR-kode scannet", "Sendt med AirDrop", "Ny pilot om bord"],
  },
];

/**
 * Køkkenholdet og gaven: to store kort som Apples, hvor telefonerne står i præcis samme højde,
 * forankret i bunden af kortet. Bag dem svæver små live-beskeder op, så fællesskabet føles levende.
 */
function Together() {
  return (
    <div className="mx-auto mt-40 grid max-w-6xl gap-5 px-5 md:grid-cols-2">
      {SOCIAL.map((c, i) => (
        <Reveal
          key={c.title}
          delay={i * 120}
          className="social-card group relative h-[820px] overflow-hidden rounded-[36px] bg-[#0a0908] ring-1 ring-white/[0.07] sm:h-[780px]"
        >
          {/* Effekten bag telefonen */}
          <div className={`fx social-fx ${c.fx === "sync" ? "social-sync" : "social-gift"}`}>
            <span className="social-glow" />
            {[0, 1, 2].map((r) => (
              <span key={r} className="social-ring" style={{ animationDelay: `${r * 1.6}s` }} />
            ))}
          </div>

          {/* Teksten har fast plads øverst, så telefonerne altid står ens */}
          <div className="relative z-10 flex h-[380px] flex-col items-center px-7 pt-12 text-center sm:h-[280px] sm:px-12">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#f0a283]">{c.eyebrow}</p>
            <h3 className="font-display mt-4 text-[30px] leading-[1.1] sm:text-[38px]">{c.title}</h3>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-white/65">{c.body}</p>
          </div>

          {/* Live-beskeder, der svæver op på hver side af telefonen */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[280px] z-30 hidden sm:block" aria-hidden>
            {c.chips.map((t, n) => (
              <span
                key={t}
                className="social-chip absolute whitespace-nowrap rounded-2xl bg-[#1d1a18]/80 px-4 py-2.5 text-[13.5px] font-medium text-white shadow-[0_18px_40px_-12px_rgba(0,0,0,0.8)] ring-1 ring-white/15 backdrop-blur-xl"
                style={{ [n % 2 ? "right" : "left"]: "5%", animationDelay: `${n * 1.9}s` } as React.CSSProperties}
              >
                <span className={`mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle ${c.fx === "sync" ? "bg-[#8fcf99]" : "bg-[#f0a283]"}`} />
                {t}
              </span>
            ))}
          </div>

          {/* Telefonen: stor, forankret i bunden og beskåret af kortet */}
          <div className="absolute bottom-0 left-1/2 z-20 w-[270px] -translate-x-1/2 translate-y-[20%] transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:translate-y-[16%] sm:w-[300px]">
            <Phone src={c.img} alt={c.alt} />
          </div>
        </Reveal>
      ))}
    </div>
  );
}
