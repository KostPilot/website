"use client";

import { useEffect, useState } from "react";
import LogoMark from "./LogoMark";

/** Glasmenu: gennemsigtig over den mørke hero, papir-glas når man ruller ned i de lyse sektioner. */
export default function Nav() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const dark = document.querySelectorAll("[data-theme='dark']");
      let overDark = false;
      dark.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= 40 && r.bottom >= 40) overDark = true;
      });
      setLight(!overDark);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        light ? "bg-[#f8f5f0]/80 text-[#1c1c1c] shadow-[0_1px_0_rgba(0,0,0,0.06)]" : "bg-[#0f0d0c]/40 text-white"
      } backdrop-blur-xl`}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2.5" aria-label="KostPilot, til toppen">
          <LogoMark size={26} cord={light ? "#f8f5f0" : "#0f0d0c"} />
          <span className="font-display text-[19px]">KostPilot</span>
        </a>
        <div className="flex items-center gap-6 text-[14px]">
          <a href="#funktioner" className="hidden opacity-80 transition hover:opacity-100 sm:inline">
            Funktioner
          </a>
          <a href="#saadan" className="hidden opacity-80 transition hover:opacity-100 sm:inline">
            Sådan virker det
          </a>
          <a href="#venteliste" className="rounded-full bg-[#D4704C] px-4 py-1.5 font-semibold text-white transition hover:bg-[#BD5E3C]">
            Skriv dig op
          </a>
        </div>
      </nav>
    </header>
  );
}
