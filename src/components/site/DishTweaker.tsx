"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const BASE = ["Hakket oksekød", "Løg", "Hvidløg", "Gulerod", "Hakkede tomater", "Spaghetti", "Parmesan"];

type Mode = {
  label: string;
  why: string;
  swaps: Record<string, string | null>; // null = fjernet
  add?: string[];
  soon?: boolean;
};

// "I dag": appen bytter allerede ingredienser ud for allergier og det, du ikke spiser (ingredientSubstitutes i appen).
// "Snart": bytte efter pris og efter din egen smag er ikke bygget endnu.
const MODES: Mode[] = [
  { label: "Som du kender den", why: "Den klassiske. Præcis som hjemme.", swaps: {} },
  { label: "Uden laktose", why: "Du tåler ikke laktose, så osten byttes ud.", swaps: { Parmesan: "Vegansk ost" } },
  { label: "Glutenfri", why: "Du spiser glutenfrit, så pastaen byttes ud.", swaps: { Spaghetti: "Glutenfri pasta" } },
  {
    label: "Billigere denne uge",
    why: "Oksekødet er dyrt i denne uge. Halvdelen bliver til linser, og du kan næsten ikke smage forskel.",
    swaps: { "Hakket oksekød": "Halvt oksekød, halvt røde linser" },
    soon: true,
  },
  { label: "Vegetar", why: "Samme kødsovs, uden kød.", swaps: { "Hakket oksekød": "Røde linser og champignon" }, soon: true },
  {
    label: "Din måde",
    why: "Du plejer at skippe guleroden og ville have mere hvidløg. Det husker den.",
    swaps: { Gulerod: null, Hvidløg: "Ekstra hvidløg" },
    add: ["Chiliflager"],
    soon: true,
  },
];

/**
 * Din yndlingsret, tilpasset dig: vælg en tilpasning og se ingredienserne blive byttet ud.
 * Kører selv igennem tilpasningerne, indtil man trykker (så har brugeren kontrollen).
 */
export default function DishTweaker() {
  const [m, setM] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setM((x) => (x + 1) % MODES.length), 3400);
    return () => clearTimeout(t);
  }, [auto, inView, m]);

  const mode = MODES[m];
  const changes = Object.keys(mode.swaps).length + (mode.add?.length ?? 0);

  return (
    <div className="mx-auto mt-40 grid max-w-6xl items-center gap-14 px-5 md:grid-cols-[1fr_1.1fr] md:gap-20">
      <Reveal>
        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#D4704C]">Din ret, din måde</p>
        <h3 className="font-display mt-4 text-[38px] leading-[1.05] sm:text-[56px]">
          Din yndlingsret. Lige som <span className="accent-text">du</span> kan lide den.
        </h3>
        <p className="mt-5 text-[17px] leading-relaxed text-white/70">
          Få spaghetti med kødsovs, som du kender den. Eller lad KostPilot tilpasse den: med mindre kød, når kødet er dyrt i den uge, vegetar, uden laktose eller med det
          lille tweak, du altid selv laver. Motoren bytter ingredienserne ud og husker, hvordan du kan lide dine retter.
        </p>
        <p className="mt-6 text-[14px] leading-relaxed text-white/45">
          Allergier og det, du ikke spiser, bliver allerede byttet ud i dag. Tilpasning efter pris og efter din smag kommer snart.
        </p>
      </Reveal>

      <Reveal delay={120}>
        <div ref={ref} className="relative overflow-hidden rounded-[32px] bg-[#141110] p-6 ring-1 ring-white/[0.07] sm:p-8">
          <div className="glow -right-28 -top-28 h-80 w-80" />
          <div className="relative flex flex-wrap gap-2" role="tablist" aria-label="Tilpas retten">
            {MODES.map((x, n) => (
              <button
                key={x.label}
                type="button"
                role="tab"
                aria-selected={n === m}
                onClick={() => {
                  setAuto(false);
                  setM(n);
                }}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13.5px] font-medium transition ${
                  n === m ? "bg-[#D4704C] text-white shadow-[0_8px_24px_-8px_rgba(212,112,76,0.8)]" : "bg-white/[0.07] text-white/70 hover:bg-white/[0.12]"
                }`}
              >
                {x.label}
                {x.soon && <span className={`text-[10px] font-semibold uppercase tracking-[0.12em] ${n === m ? "text-white/75" : "text-white/40"}`}>Snart</span>}
              </button>
            ))}
          </div>

          <div className="relative mt-8">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/40">Aftensmad · 4 personer</p>
            <p className="font-display mt-2 text-[30px] leading-tight">Spaghetti med kødsovs</p>
            <p key={`why-${m}`} className="swap-in mt-2 min-h-[48px] text-[15px] leading-relaxed text-[#f0a283]">
              {mode.why}
            </p>

            <ul className="mt-5 divide-y divide-white/[0.06]">
              {BASE.map((ing) => {
                const swapped = ing in mode.swaps;
                const to = mode.swaps[ing];
                return (
                  <li key={ing} className="flex min-h-[46px] items-center justify-between gap-3 py-2.5 text-[15.5px]">
                    <span className={`transition-all duration-500 ${swapped ? "text-white/35 line-through decoration-white/30" : "text-white/85"}`}>{ing}</span>
                    {swapped && (
                      <span key={`${m}-${ing}`} className="swap-in flex items-center gap-2 text-right">
                        <span className="text-[#d4704c]" aria-hidden>
                          ↻
                        </span>
                        <span className={`rounded-full px-3 py-1 text-[13.5px] font-medium ${to ? "bg-[#d4704c]/15 text-[#f0a283]" : "bg-white/[0.06] text-white/50"}`}>
                          {to ?? "Droppet"}
                        </span>
                      </span>
                    )}
                  </li>
                );
              })}
              {mode.add?.map((a) => (
                <li key={`${m}-${a}`} className="swap-in flex min-h-[46px] items-center justify-between gap-3 py-2.5 text-[15.5px]">
                  <span className="text-white/85">{a}</span>
                  <span className="rounded-full bg-[#6fae7a]/15 px-3 py-1 text-[13.5px] font-medium text-[#8fcf99]">Tilføjet</span>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-[13px] text-white/45" aria-live="polite">
              {changes === 0 ? "Ingen ændringer" : `${changes} ${changes === 1 ? "ændring" : "ændringer"}, byttet automatisk`}
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
