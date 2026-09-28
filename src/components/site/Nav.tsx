"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoMark from "./LogoMark";
import { PAGES } from "./pages";

/** Glasmenu med den aktive side markeret: gennemsigtig over de mørke sektioner, papir-glas over de lyse. */
export default function Nav() {
  const path = usePathname().replace(/\/$/, "") || "/";
  const [light, setLight] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      let overDark = false;
      document.querySelectorAll("[data-theme='dark']").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= 40 && r.bottom >= 40) overDark = true;
      });
      setLight(!overDark);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [path]);

  const cta = path === "/lancering" ? "#venteliste" : "/#venteliste";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        light ? "bg-[#f8f5f0]/80 text-[#1c1c1c] shadow-[0_1px_0_rgba(0,0,0,0.06)]" : "bg-[#0f0d0c]/40 text-white"
      } backdrop-blur-xl`}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2.5" aria-label="KostPilot, til forsiden">
          <LogoMark size={26} cord={light ? "#f8f5f0" : "#0f0d0c"} />
          <span className="font-display text-[19px]">KostPilot</span>
        </Link>
        <div className="flex items-center gap-1 text-[14px] sm:gap-2">
          {PAGES.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              aria-current={path === p.href ? "page" : undefined}
              className={`hidden rounded-full px-3 py-1.5 transition sm:inline ${
                path === p.href ? (light ? "bg-black/[0.06] font-medium" : "bg-white/10 font-medium") : "opacity-70 hover:opacity-100"
              }`}
            >
              {p.label}
            </Link>
          ))}
          <a href={cta} className="ml-2 rounded-full bg-[#D4704C] px-4 py-1.5 font-semibold text-white transition hover:bg-[#BD5E3C]">
            Skriv dig op
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Luk menuen" : "Åbn menuen"}
            className="-mr-2 ml-1 flex h-10 w-10 items-center justify-center sm:hidden"
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 h-[1.5px] w-5 bg-current transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-[1.5px] w-5 bg-current transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </nav>
      {open && (
        <div className="px-5 pb-6 pt-2 sm:hidden">
          {PAGES.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              onClick={() => setOpen(false)}
              aria-current={path === p.href ? "page" : undefined}
              className={`font-display block py-3 text-[28px] ${path === p.href ? "" : "opacity-60"}`}
            >
              {p.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
