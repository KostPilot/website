"use client";

import { useEffect, useRef, useState } from "react";

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Hvor langt elementet er rullet igennem skærmen, 0-1.
 * 0 når toppen rammer `start` (andel af skærmhøjden), 1 når bunden rammer `end`.
 * Ved reduced motion er den altid 1, så alt står færdigt.
 */
export function useScrollProgress<T extends HTMLElement>(start = 0.85, end = 0.35) {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    if (reducedMotion()) {
      const id = requestAnimationFrame(() => setP(1));
      return () => cancelAnimationFrame(id);
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const from = vh * start;
      const to = vh * end - r.height;
      setP(Math.min(1, Math.max(0, (from - r.top) / (from - to))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [start, end]);
  return [ref, p] as const;
}

/**
 * En sætning der tændes ord for ord, mens man ruller forbi.
 * Ord i *stjerner* bliver terrakotta, når de er tændt.
 */
export function ScrollWords({ text, className = "", dim = "rgba(255,255,255,0.18)" }: { text: string; className?: string; dim?: string }) {
  const [ref, p] = useScrollProgress<HTMLParagraphElement>(0.9, 0.55);
  const words = text.split(" ");
  const lit = p * words.length;
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const accent = w.startsWith("*");
        const on = i < lit;
        return (
          <span
            key={i}
            className={`transition-colors duration-300 ${on && accent ? "accent-text" : ""}`}
            style={on ? undefined : { color: dim }}
          >
            {w.replaceAll("*", "")}{" "}
          </span>
        );
      })}
    </p>
  );
}

/** Tæller op til `to`, første gang tallet kommer i syne. */
export function CountUp({ to, duration = 1400, suffix = "" }: { to: number; duration?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) {
      const id = requestAnimationFrame(() => setN(to));
      return () => cancelAnimationFrame(id);
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const k = Math.min(1, (t - t0) / duration);
          setN(Math.round(to * (1 - Math.pow(1 - k, 3))));
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);
  return (
    <span ref={ref} className="tabular-nums">
      {n.toLocaleString("da-DK")}
      {suffix}
    </span>
  );
}
