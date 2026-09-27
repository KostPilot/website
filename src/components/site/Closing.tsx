import Reveal from "./Reveal";
import LogoMark from "./LogoMark";
import WaitlistSignupForm from "@/components/forms/WaitlistSignupForm";

/** Lys "papir"-del: sådan virker det i tre trin -- som appens egne lyse skærme. */
export function HowItWorks() {
  const steps = [
    { n: "1", t: "Fortæl hvad du kan lide", b: "Budget, hvor mange I er, og hvad I ikke spiser. Det tager et minut." },
    { n: "2", t: "Få ugens plan", b: "Ud fra tilbuddene i dine butikker og det, du har i køkkenet." },
    { n: "3", t: "Handl og lav mad", b: "Listen i butikkens rækkefølge, og madlavning trin for trin." },
  ];
  return (
    <section id="saadan" className="bg-[#f8f5f0] py-28 text-[#1c1c1c]">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#D4704C]">Sådan virker det</p>
          <h2 className="font-display mt-4 text-[38px] leading-[1.05] sm:text-[56px]">Tre trin. Så kører det.</h2>
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 110} className="rounded-[28px] bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_40px_-20px_rgba(0,0,0,0.18)]">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F7E6DE] text-[17px] font-bold text-[#D4704C]">{s.n}</div>
              <h3 className="mt-6 text-[21px] font-semibold">{s.t}</h3>
              <p className="mt-2 text-[15.5px] leading-relaxed text-[#4a4a4a]">{s.b}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mx-auto mt-16 max-w-3xl text-center text-[14px] leading-relaxed text-[#9a9a9a]">
          Næringsdata: Den Danske Fødevaredatabase (fcdb.fooddata.dk), Fødevareinstituttet, Danmarks Tekniske Universitet, CC BY 4.0, suppleret med
          U.S. Department of Agriculture, FoodData Central. Opskriftsfotos fra Pexels.
        </Reveal>
      </div>
    </section>
  );
}

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
      </div>
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
          <a href="mailto:oliver@kost-pilot.dk" className="transition hover:text-white">
            oliver@kost-pilot.dk
          </a>
          <p>© {new Date().getFullYear()} KostPilot · Lavet i Danmark</p>
        </div>
      </div>
    </footer>
  );
}
