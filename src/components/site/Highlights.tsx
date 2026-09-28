"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type Fx = "aurora" | "grid" | "orbs" | "rings" | "pulse" | "aisles" | "steam";
export type Highlight = { eyebrow: string; title: string; body: string; img: string; alt: string; fx: Fx };

const INTERVAL = 6500;

/** Den levende baggrund bag telefonen. Kun transform og opacity, så den kører glat. */
function Effect({ fx }: { fx: Fx }) {
  switch (fx) {
    case "aurora":
      return (
        <div className="fx">
          <span className="fx-aurora a" />
          <span className="fx-aurora b" />
          <span className="fx-aurora c" />
        </div>
      );
    case "grid":
      return (
        <div className="fx fx-grid">
          {Array.from({ length: 84 }).map((_, i) => (
            <span key={i} style={{ animationDelay: `${((i % 12) + Math.floor(i / 12)) * 0.12}s` }} />
          ))}
        </div>
      );
    case "orbs":
      return (
        <div className="fx">
          {["#d4704c", "#f0a283", "#7a9a4a", "#e0b04a", "#bd5e3c"].map((c, i) => (
            <span key={c} className="fx-orb" style={{ background: c, left: `${10 + i * 19}%`, animationDelay: `${i * -2.3}s` }} />
          ))}
        </div>
      );
    case "rings":
    case "pulse":
      return (
        <div className={`fx ${fx === "rings" ? "fx-rings" : "fx-rings fx-rings-fast"}`}>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} style={{ animationDelay: `${i * (fx === "rings" ? 1.5 : 0.9)}s` }} />
          ))}
        </div>
      );
    case "aisles":
      return (
        <div className="fx fx-aisles">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span key={i} style={{ left: `${i * 18 - 6}%`, animationDelay: `${i * -0.7}s` }} />
          ))}
        </div>
      );
    case "steam":
      return (
        <div className="fx">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="fx-steam" style={{ left: `${30 + i * 10}%`, animationDelay: `${i * -1.4}s` }} />
          ))}
        </div>
      );
  }
}

/**
 * Højdepunkterne som Apple viser dem: store kort, der glider ind fra siden og selv kører videre,
 * når man ikke rører dem. Prikkerne viser hvor man er, og pillen fylder op mod næste kort (synlig systemstatus).
 * Afspil/pause giver brugeren kontrollen, og berøring stopper afspilningen.
 */
export default function Highlights({ items }: { items: Highlight[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [inView, setInView] = useState(false);

  // Afspil automatisk, medmindre brugeren har slået bevægelse fra.
  useEffect(() => {
    const id = requestAnimationFrame(() => setPlaying(!window.matchMedia("(prefers-reduced-motion: reduce)").matches));
    return () => cancelAnimationFrame(id);
  }, []);

  const go = useCallback((i: number) => {
    const el = track.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.clientWidth) / 2, behavior: "smooth" });
  }, []);

  // Hvilket kort er i midten.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const mid = el.scrollLeft + el.clientWidth / 2;
        let best = 0;
        let dist = Infinity;
        [...el.children].forEach((c, i) => {
          const h = c as HTMLElement;
          const d = Math.abs(h.offsetLeft + h.clientWidth / 2 - mid);
          if (d < dist) {
            dist = d;
            best = i;
          }
        });
        setActive(best);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Kør kun, når karrusellen er i syne.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !inView) return;
    const t = setTimeout(() => go((active + 1) % items.length), INTERVAL);
    return () => clearTimeout(t);
  }, [playing, inView, active, go, items.length]);

  const stop = () => setPlaying(false);

  return (
    <div className="mt-28">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="font-display text-[36px] leading-[1.05] sm:text-[56px]">Se højdepunkterne.</h2>
      </div>

      <div
        ref={track}
        onPointerDown={stop}
        onWheel={(e) => Math.abs(e.deltaX) > Math.abs(e.deltaY) && stop()}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[max(20px,calc((100vw-1100px)/2))] sm:gap-6"
        aria-roledescription="karrusel"
        aria-label="Højdepunkter fra appen"
      >
        {items.map((h, i) => {
          const on = i === active;
          return (
            <article
              key={h.title}
              aria-roledescription="kort"
              aria-label={`${i + 1} af ${items.length}: ${h.eyebrow}`}
              className={`hl-card relative h-[620px] w-[min(1100px,calc(100vw-40px))] shrink-0 snap-center overflow-hidden rounded-[32px] bg-[#0a0908] ring-1 ring-white/[0.06] transition-opacity duration-700 sm:h-[640px] ${
                on ? "is-on" : "opacity-50"
              }`}
            >
              <Effect fx={h.fx} />
              <div className="relative z-10 flex h-full flex-col md:flex-row">
                <div className="px-7 pt-9 md:flex md:w-[46%] md:flex-col md:justify-center md:px-14 md:pt-0">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#f0a283]">{h.eyebrow}</p>
                  <h3 className="font-display mt-3 text-[28px] leading-[1.08] sm:text-[40px]">{h.title}</h3>
                  <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-white/65 sm:text-[17px]">{h.body}</p>
                </div>
                <div className="relative flex flex-1 items-end justify-center">
                  <div className="hl-phone relative w-[220px] sm:w-[270px]">
                    <div className="relative aspect-[1000/2100] rounded-[16%/7.4%] bg-[#0b0b0c] p-[3.2%] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/15">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={h.img} alt={h.alt} loading={i < 2 ? "eager" : "lazy"} className="h-full w-full rounded-[13%/6%] object-cover object-top" />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Prikker og afspil/pause, som på Apples side */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <div className="flex h-14 items-center gap-3 rounded-full bg-white/[0.08] px-6 backdrop-blur">
          {items.map((h, i) => (
            <button
              key={h.title}
              type="button"
              onClick={() => {
                stop();
                go(i);
              }}
              aria-label={`Vis ${h.eyebrow}`}
              aria-current={i === active ? "true" : undefined}
              className="relative h-2 overflow-hidden rounded-full bg-white/35 transition-all duration-500"
              style={{ width: i === active ? 44 : 8 }}
            >
              {i === active && (
                <span
                  key={`${active}-${playing && inView}`}
                  className="absolute inset-y-0 left-0 rounded-full bg-white"
                  style={playing && inView ? { animation: `hl-fill ${INTERVAL}ms linear forwards` } : { width: "100%" }}
                />
              )}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Sæt på pause" : "Afspil"}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.08] backdrop-blur transition hover:bg-white/[0.14]"
        >
          {playing ? (
            <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden>
              <rect x="1" y="1" width="4" height="14" rx="1.2" />
              <rect x="9" y="1" width="4" height="14" rx="1.2" />
            </svg>
          ) : (
            <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden>
              <path d="M2 1.8v12.4a1 1 0 0 0 1.5.86l10-6.2a1 1 0 0 0 0-1.72l-10-6.2A1 1 0 0 0 2 1.8Z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
