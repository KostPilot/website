import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-black/8 bg-[#f8f5f0]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        {/* Logo + tagline */}
        <div className="flex flex-col gap-3">
          <a href="#" className="flex items-center gap-2.5">
            <Image
              src="/logo/logo.png"
              alt="Kostpilot logo"
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
            <span className="text-[15px] font-semibold tracking-tight text-[#111]">
              Kostpilot
            </span>
          </a>
          <p className="max-w-xs text-sm text-[#888]">
            Planlæg måltider ud fra butikkernes tilbud. Spar penge og tid.
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-3 sm:items-end">
          <div className="flex gap-6">
            <a
              href="#how-it-works"
              className="text-sm text-[#666] transition-colors hover:text-[#111]"
            >
              Sådan virker det
            </a>
            <a
              href="#deals"
              className="text-sm text-[#666] transition-colors hover:text-[#111]"
            >
              Funktioner
            </a>
            <a
              href="#final-cta"
              className="text-sm text-[#666] transition-colors hover:text-[#111]"
            >
              Venteliste
            </a>
          </div>
          <a
            href="mailto:hello@kostpilot.app"
            className="text-sm text-[#888] transition-colors hover:text-[#111]"
          >
            hello@kostpilot.app
          </a>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-black/5 px-5 py-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs text-[#aaa]">
          © {new Date().getFullYear()} Kostpilot. Alle rettigheder forbeholdes.
        </p>
      </div>
    </footer>
  );
}
