"use client";

import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f8f5f0]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <Image
            src="/logo/logo.png"
            alt="Kostpilot logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <span className="text-[15px] font-semibold tracking-tight text-[#111]">
            Kostpilot
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 sm:flex">
          <a
            href="#how-it-works"
            className="text-sm font-medium text-[#555] transition-colors hover:text-[#111]"
          >
            How it works
          </a>
          <a
            href="#deals"
            className="text-sm font-medium text-[#555] transition-colors hover:text-[#111]"
          >
            Features
          </a>
          <a
            href="#final-cta"
            className="inline-flex items-center justify-center rounded-full bg-[#e84c1e] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#c73d14]"
          >
            Get early access
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg sm:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-5 bg-[#111] transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-[#111] transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-[#111] transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-black/5 bg-[#f8f5f0] px-5 pb-5 sm:hidden">
          <nav className="flex flex-col gap-4 pt-4">
            <a
              href="#how-it-works"
              className="text-sm font-medium text-[#555]"
              onClick={() => setOpen(false)}
            >
              How it works
            </a>
            <a
              href="#deals"
              className="text-sm font-medium text-[#555]"
              onClick={() => setOpen(false)}
            >
              Features
            </a>
            <a
              href="#final-cta"
              className="inline-flex w-fit items-center justify-center rounded-full bg-[#e84c1e] px-5 py-2.5 text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Get early access
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
