import Link from "next/link";
import Reveal from "./Reveal";
import LogoMark from "./LogoMark";
import WaitlistSignupForm from "@/components/forms/WaitlistSignupForm";
import { PAGES } from "./pages";
import { LINKEDIN } from "./links";

/** Ventelisten: mørk igen, med logoet og gløden -- afslutningen på keynoten. */
export function Waitlist() {
  return (
    <section id="venteliste" data-theme="dark" className="relative overflow-hidden bg-[#0f0d0c] py-28 text-white">
      <div className="glow h-[760px] w-[760px]" style={{ left: "calc(50% - 380px)", top: "calc(50% - 380px)" }} />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 text-center">
        <Reveal>
          <LogoMark size={64} cord="#0f0d0c" />
        </Reveal>
        <Reveal delay={100}>
          <h2 className="font-display mt-6 text-[40px] leading-[1.05] sm:text-[62px]">Vær blandt de første.</h2>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-white/70">
            KostPilot er i lukket beta. Skriv dig op, så får du en invitation, når vi åbner på iPhone.
          </p>
        </Reveal>
        <Reveal delay={200} className="mt-10 flex w-full justify-center">
          <WaitlistSignupForm />
        </Reveal>
        <Reveal delay={260}>
          <Link href="/lancering" className="mt-8 inline-flex items-center gap-2 text-[15px] text-white/60 transition hover:text-white">
            <span className="live-dot h-2 w-2 rounded-full bg-[#6fae7a]" />
            Se hvor langt vi er mod App Store
            <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

/** Mød holdet: et kig bag kulisserne, der leder videre til historien (tillid og ansigter bag produktet). */
export function MeetTheTeam() {
  return (
    <section className="bg-[#f8f5f0] px-5 pb-28 text-[#1c1c1c]">
      <Reveal className="mx-auto grid max-w-6xl items-center gap-10 overflow-hidden rounded-[36px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_60px_-30px_rgba(0,0,0,0.25)] md:grid-cols-2 md:gap-0">
        <div className="relative h-[320px] md:h-full md:min-h-[460px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/historien/grundlaeggerne.jpg" alt="Kasper og Oliver fortæller om KostPilot" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[50%_30%]" />
        </div>
        <div className="px-8 pb-10 md:px-14 md:py-14">
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#bd5e3c]">Holdet bag</p>
          <h2 className="font-display mt-4 text-[34px] leading-[1.08] sm:text-[46px]">
            To venner. Én <em className="font-normal italic text-[#bd5e3c]">skør</em> idé.
          </h2>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-[#4a4a4a]">
            Oliver og Kasper er 24 år og startede KostPilot, fordi SU&apos;en skulle række længere. Læs om regnestykket, der satte det hele i gang.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/historien" className="rounded-full bg-[#1c1c1c] px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-black">
              Læs historien
            </Link>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full px-5 py-3 text-[15px] font-medium text-[#1c1c1c] ring-1 ring-black/15 transition hover:ring-black/30"
            >
              <LinkedInIcon size={15} />
              Følg os på LinkedIn
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer data-theme="dark" className="bg-[#0f0d0c] pb-12 pt-6 text-white/55">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/10 px-5 pt-8 text-[13px] sm:flex-row">
        <div className="flex items-center gap-2.5 text-white/80">
          <LogoMark size={22} cord="#0f0d0c" />
          <span className="font-display text-[16px]">KostPilot</span>
        </div>
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
          {PAGES.map((p) => (
            <Link key={p.href} href={p.href} className="transition hover:text-white">
              {p.label}
            </Link>
          ))}
          <Link href="/privatliv" className="transition hover:text-white">
            Privatliv
          </Link>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition hover:text-white">
            <LinkedInIcon />
            LinkedIn
          </a>
          <a href="mailto:oliver@kost-pilot.dk" className="transition hover:text-white">
            oliver@kost-pilot.dk
          </a>
          <p>© {new Date().getFullYear()} KostPilot · Lavet i Danmark</p>
        </div>
      </div>
      {/* Virksomhedsoplysninger (e-handelslovens § 7): navn, CVR, adresse og e-mail */}
      <p className="mx-auto mt-6 max-w-6xl px-5 text-center text-[12px] text-white/40 sm:text-left">
        KostPilot ApS · CVR 46414241 · Lønneparken 7, 6. 4., 9000 Aalborg · oliver@kost-pilot.dk
      </p>
    </footer>
  );
}
