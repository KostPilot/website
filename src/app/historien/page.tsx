import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/site/Nav";
import Reveal from "@/components/site/Reveal";
import LogoMark from "@/components/site/LogoMark";
import ExpandingCard from "@/components/site/ExpandingCard";
import { CountUp, ScrollWords } from "@/components/site/motion";
import { Footer, LinkedInIcon } from "@/components/site/Closing";
import { LINKEDIN } from "@/components/site/links";

export const metadata: Metadata = {
  title: "Historien",
  description: "Om to venner på 24, en SU der skulle række længere, og regnestykket, der blev til KostPilot. Fortalt af Oliver, medstifter.",
  alternates: { canonical: "/historien" },
  openGraph: {
    type: "article",
    siteName: "KostPilot",
    locale: "da_DK",
    url: "/historien",
    title: "Historien · KostPilot",
    description: "Om to venner på 24, en SU der skulle række længere, og regnestykket, der blev til KostPilot. Fortalt af Oliver, medstifter.",
    images: [{ url: "/og/historien.jpg", width: 1200, height: 630, alt: "Kasper og Oliver: To venner. Én skør idé." }],
  },
  twitter: { card: "summary_large_image", title: "Historien · KostPilot", description: "Om to venner på 24, en SU der skulle række længere, og regnestykket, der blev til KostPilot. Fortalt af Oliver, medstifter.", images: ["/og/historien.jpg"] },
};

const FOUNDERS = [
  {
    name: "Oliver",
    role: "Idéerne",
    facts: ["24 år", "Design og Anvendelse af Kunstig Intelligens", "Aalborg Universitet"],
    linkedin: "https://www.linkedin.com/in/oliver-richard-lundstr%C3%B8m-9bb9252a6/",
  },
  {
    name: "Kasper",
    role: "Jordforbindelsen",
    facts: ["24 år", "Cybersikkerhed", "Erhvervsakademi Aarhus"],
    linkedin: "https://www.linkedin.com/in/kasper-gissel-27a492254/",
  },
];

const JOURNEY = ["Tegnebrættet", "Mockups", "Brugertests", "Mange fejl", "En app, vi er stolte af"];

const PRINCIPLES = [
  {
    t: "Rigtige tal",
    b: "Priserne kommer fra kædernes egne tilbud, og næringsindholdet fra Den Danske Fødevaredatabase (DTU). Vi gætter ikke.",
  },
  {
    t: "Dine data er dine",
    b: "Appen lærer kun af det, du gør, hvis du selv slår det til under Privatliv & data.",
  },
  {
    t: "Ærlige om det, der mangler",
    b: "Når noget ikke er færdigt, skriver vi \"kommer snart\". Vi lover ikke det, appen ikke kan i dag.",
  },
];

/** Et kapitel i klummen: lille label, serif-overskrift og smal brødtekst, der er let at læse. */
function Chapter({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <Reveal as="section" className="mx-auto max-w-[640px] px-5 py-14 sm:py-20">
      <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.22em] text-[#bd5e3c]">
        <span className="font-display text-[15px] normal-case tracking-normal">Kapitel {n}</span>
        <span className="h-px w-10 bg-[#d4704c]/40" />
      </p>
      <h2 className="font-display mt-4 text-[34px] leading-[1.08] sm:text-[46px]">{title}</h2>
      <div className="mt-6 space-y-5 text-[18px] leading-[1.7] text-[#3a3a3a] sm:text-[19px]">{children}</div>
    </Reveal>
  );
}

export default function Story() {
  return (
    <>
      <Nav />
      <main className="bg-[#f8f5f0] text-[#1c1c1c]">
        {/* Åbningen */}
        <section className="mx-auto max-w-5xl px-5 pb-10 pt-36 text-center sm:pt-44">
          <p className="rise text-[13px] font-semibold uppercase tracking-[0.22em] text-[#bd5e3c]">Historien</p>
          <h1 className="rise font-display mx-auto mt-5 max-w-4xl text-[46px] leading-[1.02] sm:text-[84px]" style={{ "--delay": "120ms" } as React.CSSProperties}>
            God mad skal ikke koste <em className="font-normal italic text-[#bd5e3c]">mere.</em>
          </h1>
          <p className="rise mx-auto mt-7 max-w-2xl text-[18px] leading-relaxed text-[#4a4a4a] sm:text-[20px]" style={{ "--delay": "260ms" } as React.CSSProperties}>
            Om to venner, en SU, der skulle række længere, og en idé, der blev til en app.
          </p>
          <p className="rise mt-8 text-[14px] text-[#9a9a9a]" style={{ "--delay": "380ms" } as React.CSSProperties}>
            Klumme · Af Oliver, medstifter · 4 min. læsning
          </p>
        </section>

        {/* Billedet af os vokser til hele skærmen */}
        <ExpandingCard src="/historien/grundlaeggerne.jpg" alt="Kasper og Oliver fortæller om KostPilot" position="50% 32%">
          <h2 className="font-display mx-auto max-w-4xl text-[44px] leading-[1.02] sm:text-[88px]">
            To venner. Én <em className="font-normal italic">skør</em> idé.
          </h2>
        </ExpandingCard>

        {/* Kapitel 1 */}
        <Chapter n={1} title="Flyttet hjemmefra.">
          <p>
            <span className="font-display float-left mr-3 mt-1 text-[74px] leading-[0.8] text-[#d4704c]">J</span>eg var lige flyttet hjemmefra, og hver dag startede med
            det samme spørgsmål: Hvad skal jeg have at spise i aften?
          </p>
          <p>
            Så skulle der handles. Og bagefter skulle SU&apos;en helst række hele måneden. Det var mange små problemer på én gang, og ingen af dem havde en rigtig
            løsning.
          </p>
        </Chapter>

        {/* Tallet, der ændrede det hele */}
        <section className="px-5 py-10">
          <Reveal className="mx-auto max-w-4xl rounded-[36px] bg-white px-6 py-14 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_60px_-30px_rgba(0,0,0,0.25)] sm:px-14">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#9a9a9a]">En uge med en god plan</p>
            <div className="mt-8 grid items-end gap-8 sm:grid-cols-[1fr_auto_1fr]">
              <div>
                <p className="font-display text-[72px] leading-none sm:text-[96px]">
                  <CountUp to={200} />
                  <span className="text-[0.4em]"> kr</span>
                </p>
                <p className="mt-3 text-[16px] text-[#4a4a4a]">brugt på indkøb</p>
              </div>
              <p className="font-display pb-12 text-[28px] italic text-[#9a9a9a] max-sm:hidden">og</p>
              <div>
                <p className="font-display accent-text text-[72px] leading-none sm:text-[96px]">
                  <CountUp to={200} />
                  <span className="text-[0.4em]"> kr</span>
                </p>
                <p className="mt-3 text-[16px] text-[#4a4a4a]">sparet på tilbud</p>
              </div>
            </div>
            <p className="mx-auto mt-10 max-w-xl text-[17px] leading-relaxed text-[#4a4a4a]">
              Efter en grundig gennemgang af alle butikkernes tilbudsaviser kunne jeg handle for 200 kr. og samtidig spare omkring 200 kr.
            </p>
          </Reveal>
        </section>

        {/* Kapitel 2 */}
        <Chapter n={2} title="Så gik det op for mig.">
          <p>
            Tilbudsaviserne fandtes jo allerede, og de kan spare dig mange penge. Men kun hvis du bruger timer på at gå dem alle igennem og lægge en plan.
          </p>
          <p>
            Potentialet var enormt. Hvis man skar den tidskrævende del væk og lod en app gøre alt det kedelige, kunne man spare både tid og penge og bruge dem på noget
            bedre.
          </p>
        </Chapter>

        {/* Manifestet tændes ord for ord */}
        <section className="mx-auto max-w-4xl px-5 py-16 sm:py-24">
          <ScrollWords
            dim="rgba(28,28,28,0.14)"
            className="font-display text-[32px] leading-[1.18] sm:text-[52px]"
            text="Tilbudsavisen er kun halvdelen. Den anden halvdel er dig: hvad du kan lide, hvad der står i køleskabet, og hvor mange penge der er tilbage før SU'en. Det er det, KostPilot *binder* *sammen.*"
          />
        </section>

        {/* Kapitel 3 */}
        <Chapter n={3} title="Så spurgte jeg Kasper.">
          <p>
            Jeg vidste godt, at det ikke ville blive nemt. Så jeg spurgte Kasper, en gammel, god ven, om han var klar på min skøre idé. Han skulle lige til at læse
            cybersikkerhed i Aarhus, og jeg vidste, at han altid er klar til at knokle.
          </p>
          <p>
            Jeg havde brug for et hold med god dynamik. En jordnær makker, der kunne holde mine vildeste idéer nede på jorden. Det, jeg ikke vidste, var, hvor meget
            sværere det ville blive, end jeg troede.
          </p>
        </Chapter>

        {/* Grundlæggerne */}
        <section className="mx-auto grid max-w-4xl gap-5 px-5 pb-10 sm:grid-cols-2">
          {FOUNDERS.map((f, i) => (
            <Reveal key={f.name} delay={i * 120}>
              {/* Hele kortet er et link til personens egen LinkedIn */}
              <a
                href={f.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${f.name} på LinkedIn`}
                className="group relative block h-full overflow-hidden rounded-[32px] bg-[#0f0d0c] p-8 text-white transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(212,112,76,0.6)]"
              >
                <div className="glow -right-24 -top-24 h-72 w-72" />
                <span className="absolute right-6 top-6 flex items-center gap-1.5 rounded-full bg-white/[0.08] px-3 py-1.5 text-[12.5px] text-white/70 transition group-hover:bg-white/[0.14] group-hover:text-white">
                  <LinkedInIcon size={13} />
                  LinkedIn
                  <span aria-hidden className="transition group-hover:translate-x-0.5">↗</span>
                </span>
                <p className="relative text-[12px] font-semibold uppercase tracking-[0.22em] text-[#f0a283]">{f.role}</p>
                <p className="font-display relative mt-3 text-[44px] leading-none">{f.name}</p>
                <ul className="relative mt-6 flex flex-col items-start gap-2">
                  {f.facts.map((x) => (
                    <li key={x} className="rounded-full bg-white/[0.08] px-3 py-1.5 text-[13.5px] text-white/80">
                      {x}
                    </li>
                  ))}
                </ul>
              </a>
            </Reveal>
          ))}
        </section>

        <Reveal className="flex justify-center px-5 pb-6">
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-medium text-[#1c1c1c] ring-1 ring-black/15 transition hover:ring-black/30"
          >
            <LinkedInIcon size={15} />
            Følg KostPilot på LinkedIn
          </a>
        </Reveal>

        {/* Kapitel 4 */}
        <Chapter n={4} title="Et år senere.">
          <p>
            I dag, et år og utallige timer senere, har vi bygget en app, vi er tilfredse med og stolte af. Den er stadig undervejs, og vi er midt i den sidste
            finpudsning.
          </p>
        </Chapter>

        {/* Rejsen */}
        <section className="mx-auto max-w-5xl px-5 pb-16">
          <ol className="relative grid gap-6 sm:grid-cols-5 sm:gap-3">
            <span className="absolute left-[11px] top-3 h-[calc(100%-24px)] w-px bg-[#d4704c]/30 sm:left-0 sm:top-[11px] sm:h-px sm:w-full" aria-hidden />
            {JOURNEY.map((j, i) => (
              <Reveal as="li" key={j} delay={i * 140} className="relative flex items-center gap-4 sm:flex-col sm:items-start sm:gap-4">
                <span
                  className={`relative z-10 h-[23px] w-[23px] shrink-0 rounded-full border-2 ${
                    i === JOURNEY.length - 1 ? "border-[#d4704c] bg-[#d4704c] shadow-[0_0_0_6px_rgba(212,112,76,0.18)]" : "border-[#d4704c] bg-[#f8f5f0]"
                  }`}
                />
                <span className={`text-[16px] ${i === JOURNEY.length - 1 ? "font-semibold text-[#1c1c1c]" : "text-[#4a4a4a]"}`}>{j}</span>
              </Reveal>
            ))}
          </ol>
        </section>

        <section className="mx-auto max-w-4xl px-5 pb-28 pt-6 text-center">
          <Reveal>
            <p className="font-display text-[34px] leading-[1.15] sm:text-[52px]">
              &ldquo;Det, der for et år siden var helt uhåndgribeligt, er nu noget, man kan holde i <em className="font-normal italic text-[#bd5e3c]">hånden.</em>&rdquo;
            </p>
            <p className="mt-6 text-[15px] text-[#9a9a9a]">Oliver, medstifter</p>
          </Reveal>
        </section>

        {/* Snoren i logoet */}
        <section data-theme="dark" className="relative overflow-hidden bg-[#0f0d0c] py-28 text-white sm:py-36">
          <div className="glow h-[700px] w-[700px]" style={{ left: "calc(50% - 350px)", top: "calc(50% - 350px)" }} />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 text-center">
            <Reveal>
              <LogoMark size={140} cord="#0f0d0c" />
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-10 text-[13px] font-semibold uppercase tracking-[0.22em] text-[#D4704C]">Mærket</p>
              <h2 className="font-display mt-4 text-[38px] leading-[1.05] sm:text-[56px]">En snor, der binder det hele sammen.</h2>
              <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-white/70">
                Blokkene og den skrå bjælke er et X og et procenttegn på én gang. Snoren i midten er os: den binder tilbud, madplan og indkøb sammen til én ting, du ikke
                behøver tænke over.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Drømmen */}
        <section className="mx-auto max-w-5xl px-5 py-28 text-center sm:py-36">
          <Reveal>
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#bd5e3c]">Drømmen</p>
            <h2 className="font-display mx-auto mt-4 max-w-4xl text-[40px] leading-[1.05] sm:text-[68px]">
              Alle danske kæder. <em className="font-normal italic text-[#bd5e3c]">Én</em> app.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[18px] leading-relaxed text-[#4a4a4a]">
              Målet er at få alle danske dagligvarekæder med, så du kan se, hvor maden er billigst blandt netop de butikker, der ligger tæt på dig. En studerende i Aalborg
              skal ikke have anbefalinger fra en butik i Odense.
            </p>
          </Reveal>
        </section>

        {/* Principperne */}
        <section className="mx-auto max-w-6xl px-5 pb-28">
          <Reveal className="text-center">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#bd5e3c]">Sådan bygger vi</p>
            <h2 className="font-display mt-4 text-[36px] leading-[1.05] sm:text-[52px]">Tre ting, vi ikke går på kompromis med.</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.t} delay={i * 110} className="rounded-[28px] bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_40px_-20px_rgba(0,0,0,0.18)]">
                <p className="font-display text-[44px] leading-none text-[#D4704C]">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-6 text-[21px] font-semibold">{p.t}</h3>
                <p className="mt-2 text-[15.5px] leading-relaxed text-[#4a4a4a]">{p.b}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Videre */}
        <section className="border-t border-black/[0.06] px-5 py-24 text-center">
          <Reveal>
            <h2 className="font-display text-[34px] leading-[1.1] sm:text-[48px]">Vil du være med fra starten?</h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/#venteliste" className="rounded-full bg-[#D4704C] px-7 py-3.5 text-[16px] font-semibold text-white transition hover:bg-[#BD5E3C]">
                Skriv dig på ventelisten
              </Link>
              <Link href="/lancering" className="rounded-full px-6 py-3.5 text-[16px] font-medium text-[#1c1c1c] ring-1 ring-black/15 transition hover:ring-black/30">
                Se hvor langt vi er
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
