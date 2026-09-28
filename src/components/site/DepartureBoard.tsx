"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ0123456789-";

/** Et felt på tavlen: bogstaverne klaprer igennem alfabetet og lander ét ad gangen. */
function Flap({ text, width, start, tone = "text-white" }: { text: string; width: number; start: boolean; tone?: string }) {
  const target = text.toUpperCase().padEnd(width, " ");
  const [shown, setShown] = useState(target.replace(/./g, " "));

  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(target);
      return;
    }
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      setShown(
        [...target]
          .map((c, i) => (frame > 6 + i * 2 ? c : c === " " && frame > i * 2 ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]))
          .join("")
      );
      if (frame > 6 + target.length * 2) clearInterval(id);
    }, 45);
    return () => clearInterval(id);
  }, [start, target]);

  return (
    <span className={`flex gap-[3px] font-mono text-[14px] font-semibold md:text-[17px] ${tone}`} aria-hidden>
      {[...shown].map((c, i) => (
        <span key={i} className="relative flex h-[1.9em] w-[1.2em] items-center justify-center rounded-[4px] bg-[#1d1a18] shadow-[inset_0_-1px_0_rgba(255,255,255,0.04)]">
          {c}
          <span className="absolute inset-x-0 top-1/2 h-px bg-black/60" />
        </span>
      ))}
    </span>
  );
}

type Row = { flight: string; dest: string; status: string; tone: string; live?: boolean };

/** Afgangstavlen: hvor KostPilot er på vej hen. Ingen datoer, kun ærlig status. */
export default function DepartureBoard({ rows }: { rows: Row[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setStart(true), io.disconnect()), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full overflow-hidden rounded-[28px] bg-[#141110] p-5 ring-1 ring-white/10 sm:p-8">
      <ul className="flex flex-col gap-5 md:gap-3" aria-label="KostPilots vej til App Store">
        {rows.map((r) => (
          <li key={r.flight} className="flex flex-col gap-1.5 md:flex-row md:items-center md:gap-4">
            <span className="sr-only">
              {r.dest}: {r.status}
            </span>
            <span className="hidden lg:block">
              <Flap text={r.flight} width={5} start={start} tone="text-white/50" />
            </span>
            <Flap text={r.dest} width={11} start={start} />
            <span className="flex items-center gap-3">
              <Flap text={r.status} width={13} start={start} tone={r.tone} />
              {r.live && <span className="live-dot h-2 w-2 shrink-0 rounded-full bg-[#6fae7a]" />}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
