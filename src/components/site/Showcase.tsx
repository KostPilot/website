import Phone from "./Phone";
import Reveal from "./Reveal";
import LogoMark from "./LogoMark";

type Feature = { eyebrow: string; title: string; body: string; points?: string[]; img: string; alt: string; extra?: string };

// Rækkefølgen følger en uge med KostPilot: tilbud -> plan -> opskrift -> indkøb -> madlavning.
const FEATURES: Feature[] = [
  {
    eyebrow: "Ugens tilbud",
    title: "Tilbuddene. Allerede sorteret for dig.",
    body: "KostPilot følger tilbuddene i Netto, REMA 1000, Føtex og Bilka hver uge og viser dem, der passer til din madplan og din indkøbsliste.",
    points: ["Prisvagt på de varer, du køber tit", "Besked når de er på tilbud igen"],
    img: "/screens/tilbud.webp",
    alt: "Ugens tilbud i appen",
  },
  {
    eyebrow: "Madplan",
    title: "En hel uge planlagt på sekunder.",
    body: "Vælg budget og de dage, du er hjemme. Piloten bygger en varieret uge ud fra tilbuddene, din smag og det, du allerede har i køkkenet.",
    points: ["Træk en ret over på en anden dag", "Byt en ret med ét tryk", "Lærer hvad du kan lide"],
    img: "/screens/madplan.webp",
    alt: "Madplanen for ugen",
  },
  {
    eyebrow: "Opskrifter",
    title: "Find noget, du rent faktisk har lyst til.",
    body: "Bladr gennem retter som i en feed. Hver opskrift viser pris, tid og hvilke ingredienser der er på tilbud lige nu.",
    img: "/screens/opskrift.webp",
    alt: "En opskrift med tilbudsvarer",
  },
  {
    eyebrow: "Næringsindhold",
    title: "Alt, hvad der er i maden.",
    body: "Tryk på en ingrediens og se vitaminer, mineraler, fedtsyrer og aminosyrer, og hvad netop din mængde indeholder.",
    points: ["Data fra Den Danske Fødevaredatabase (DTU)"],
    img: "/screens/naering.webp",
    alt: "Næringsindhold for en ingrediens",
  },
  {
    eyebrow: "Indkøb",
    title: "Handl i butikkens rækkefølge.",
    body: "Indkøbslisten laver sig selv, sorteret efter butikkens gange, så du går igennem én gang. Vælg hvor mange dage, du handler til. Standard er i dag.",
    points: ["Split mellem to butikker, hvis det sparer penge", "Del listen med dem, du bor med"],
    img: "/screens/indkob.webp",
    alt: "Indkøbslisten sorteret efter butikkens rute",
  },
  {
    eyebrow: "Madlavning",
    title: "Trin for trin. Timeren går med.",
    body: "Start madlavningen, og få ét trin ad gangen med timere, der kører videre, også når du lægger telefonen fra dig.",
    points: ["Timer i Dynamic Island og på låseskærmen", "Sig til hvis der var for meget løg, så husker den det"],
    img: "/screens/madlavning-timer.webp",
    alt: "Madlavning med timer",
  },
];

export default function Showcase() {
  return (
    <section id="funktioner" data-theme="dark" className="relative overflow-hidden bg-[#0f0d0c] pb-32 pt-24 text-white">
      <Reveal className="mx-auto max-w-4xl px-5 text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#D4704C]">Alt i én app</p>
        <h2 className="font-display mt-4 text-[38px] leading-[1.05] sm:text-[60px]">Fra tilbudsavisen til tallerkenen.</h2>
        <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-white/65">
          Hver del af appen taler sammen: tilbuddene former madplanen, madplanen bliver til indkøbslisten, og det du laver, gør næste uge bedre.
        </p>
      </Reveal>

      <div className="mx-auto mt-24 flex max-w-6xl flex-col gap-32 px-5 sm:gap-40">
        {FEATURES.map((f, i) => (
          <div key={f.title} className={`flex flex-col items-center gap-12 md:flex-row md:gap-20 ${i % 2 ? "md:flex-row-reverse" : ""}`}>
            <Reveal className="relative w-[260px] shrink-0 sm:w-[300px]">
              <div className="glow -inset-24" />
              <Phone src={f.img} alt={f.alt} className="relative" />
            </Reveal>
            <Reveal delay={120} className="max-w-xl text-center md:text-left">
              <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#a1a1a6]">{f.eyebrow}</p>
              <h3 className="font-display mt-4 text-[34px] leading-[1.08] sm:text-[48px]">{f.title}</h3>
              <p className="mt-5 text-[17px] leading-relaxed text-white/70">{f.body}</p>
              {f.points && (
                <ul className="mt-6 space-y-2.5 text-[15px] text-white/80">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-start justify-center gap-3 md:justify-start">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4704C]" />
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </div>
        ))}
      </div>

      <Pilot />
      <Recap />
      <Together />
    </section>
  );
}

/** Piloten: en samtale der viser hukommelse, handling og fagligt svar på én gang. */
function Pilot() {
  const lines: { who: "user" | "pilot"; text: string; chip?: string }[] = [
    { who: "user", text: "jeg træner til en halv ironman og vejer 75 kg. hvor meget protein skal jeg have?" },
    { who: "pilot", text: "Med din træning er et godt mål ca. 1,6-2,2 g pr. kg, altså 120-165 g om dagen. Fordel det over dagens måltider.", chip: "Husket: vægt 75 kg · træning 5 gange om ugen" },
    { who: "user", text: "lav en billig madplan med det. gerne kød når det er på tilbud" },
    { who: "pilot", text: "Klar: fire aftener med ca. 140 g protein om dagen for 385 kr. Kyllingen er på tilbud i Netto til søndag. Skal jeg lave indkøbslisten?", chip: "Madplan lavet" },
  ];
  return (
    <div className="mx-auto mt-40 max-w-5xl px-5">
      <Reveal className="text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#D4704C]">Piloten</p>
        <h3 className="font-display mt-4 text-[38px] leading-[1.05] sm:text-[60px]">En madven, der kender dig.</h3>
        <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-white/65">
          Spørg om hvad som helst om mad, kost og træningskost, eller bed den om at gøre tingene for dig. Den husker, hvad du kan lide, og hvad du har i køkkenet, og den siger til, før havregrynene slipper op.
        </p>
      </Reveal>
      <Reveal delay={150} className="mx-auto mt-14 max-w-2xl rounded-[32px] bg-white/[0.04] p-5 ring-1 ring-white/10 sm:p-8">
        <div className="flex flex-col gap-4">
          {lines.map((l, i) => (
            <div key={i} className={`flex ${l.who === "user" ? "justify-end" : "justify-start gap-3"}`}>
              {l.who === "pilot" && (
                <div className="mt-1 shrink-0">
                  <LogoMark size={26} cord="#0f0d0c" />
                </div>
              )}
              <div className={`max-w-[85%] ${l.who === "user" ? "rounded-[22px] rounded-br-md bg-[#3a2a22] px-4 py-3" : ""}`}>
                <p className="text-[15.5px] leading-relaxed text-white/90">{l.text}</p>
                {l.chip && <p className="mt-2 inline-block rounded-lg border border-[#6fae7a]/60 px-2.5 py-0.5 text-[12.5px] font-semibold text-[#8fcf99]">{l.chip}</p>}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal delay={250} className="mt-6 text-center text-[13px] text-white/45">
        Piloten er under udvikling og kommer i en senere version.
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
          <div className="relative aspect-[1206/2622] rounded-[16%/7.4%] bg-[#0b0b0c] p-[3.2%] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
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

/** Køkkenholdet og gaven: fællesskab. */
function Together() {
  return (
    <div className="mx-auto mt-40 grid max-w-6xl gap-16 px-5 md:grid-cols-2">
      {[
        { eyebrow: "Køkkenholdet", title: "Del madplan og indkøb med dem, du bor med.", body: "Én fælles indkøbsliste, der opdateres live, et fælles budget og et fælles køleskab. Ingen dobbeltkøb.", img: "/screens/kokkenholdet.webp", alt: "Køkkenholdet" },
        { eyebrow: "Giv en ven en pilot", title: "Kender du én, der altid er flad før SU'en?", body: "Del KostPilot med en QR-kode formet som vores logo, eller send den med AirDrop. Snart: sparedyst, hvor I ser hvem der sparer flest procent.", img: "/screens/gave.webp", alt: "Giv en ven en pilot" },
      ].map((c, i) => (
        <Reveal key={c.title} delay={i * 120} className="flex flex-col items-center rounded-[36px] bg-white/[0.04] p-8 text-center ring-1 ring-white/10 sm:p-10">
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#a1a1a6]">{c.eyebrow}</p>
          <h3 className="font-display mt-4 text-[30px] leading-[1.1] sm:text-[36px]">{c.title}</h3>
          <p className="mt-4 max-w-md text-[16px] leading-relaxed text-white/65">{c.body}</p>
          <Phone src={c.img} alt={c.alt} className="mt-10 w-[230px]" />
        </Reveal>
      ))}
    </div>
  );
}
