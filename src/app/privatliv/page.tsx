import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/site/Nav";
import { Footer } from "@/components/site/Closing";

// Privatlivspolitik (GDPR art. 13). Skal altid passe til appen og til kostpilot_beta/docs/gdpr/
// (fortegnelse, databehandlere, opbevaring, samtykke). Ændres den væsentligt: øg VERSION og
// PRIVACY_VERSION i appen (src/services/signupHelpers.ts), så brugerne bedes acceptere igen.
export const metadata: Metadata = {
  title: "Privatlivspolitik",
  description: "Hvilke oplysninger KostPilot gemmer, hvorfor, hvor, hvor længe, og hvordan du får indsigt, trækker samtykke tilbage eller sletter dem.",
  alternates: { canonical: "/privatliv" },
};

const VERSION = "29. september 2026";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-black/[0.07] py-10">
      <h2 className="font-display text-[26px] leading-tight sm:text-[30px]">{title}</h2>
      <div className="mt-4 space-y-4 text-[16.5px] leading-[1.7] text-[#3a3a3a] [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_strong]:text-[#1c1c1c] [&_ul]:space-y-2">
        {children}
      </div>
    </section>
  );
}

const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-[#bd5e3c] underline underline-offset-4" target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
    {children}
  </a>
);

const TOC = [
  ["hvem", "Hvem er vi"],
  ["hvad", "Hvilke oplysninger vi gemmer"],
  ["hvorfor", "Hvorfor, og hvad der giver os lov"],
  ["samtykke", "Dine samtykker og aldersgrænse"],
  ["piloten", "Piloten"],
  ["hvor", "Hvor dine oplysninger ligger"],
  ["hvorlaenge", "Hvor længe vi gemmer dem"],
  ["rettigheder", "Dine rettigheder"],
  ["hjemmesiden", "Hjemmesiden, ventelisten og invitationer"],
  ["sikkerhed", "Sikkerhed"],
  ["kontakt", "Ændringer og kontakt"],
];

const RETENTION = [
  ["Konto, præferencer, madplaner, lister og køkken", "Så længe du har en konto"],
  ["Allergier og krop (helbredsoplysninger)", "Til du trækker samtykket tilbage eller sletter kontoen"],
  ["Dine valg i appen til personlig indlæring", "12 måneder"],
  ["Samtaler med piloten", "12 måneder. Noter kan du selv slette"],
  ["Anonym brugsstatistik", "13 måneder"],
  ["Fejlrapporter", "24 måneder"],
  ["Konti uden login", "Slettes efter 24 måneder, med varsel 30 dage før"],
  ["Ventelisten", "Til du afmelder dig, og senest 6 måneder efter at appen er åbnet for alle"],
];

export default function Privacy() {
  return (
    <>
      <Nav />
      <main className="bg-[#f8f5f0] text-[#1c1c1c]">
        <div className="mx-auto max-w-[720px] px-5 pb-24 pt-32 sm:pt-40">
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#bd5e3c]">Privatliv</p>
          <h1 className="font-display mt-4 text-[42px] leading-[1.05] sm:text-[60px]">Dine data. Kort og ærligt.</h1>
          <p className="mt-6 text-[18px] leading-relaxed text-[#4a4a4a]">
            KostPilot skal hjælpe dig med at spise godt for færre penge. Til det skal appen vide lidt om dig. Her står præcis hvad, hvorfor, hvor længe, og
            hvordan du bestemmer over det.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["Gemt i EU", "På servere i Irland."],
              ["Ingen reklamer", "Vi sælger aldrig dine oplysninger."],
              ["Du bestemmer", "Samtykker er slået fra, indtil du slår dem til."],
            ].map(([t, b]) => (
              <div key={t} className="rounded-[20px] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_40px_-24px_rgba(0,0,0,0.2)]">
                <p className="text-[16px] font-semibold">{t}</p>
                <p className="mt-1 text-[14.5px] leading-relaxed text-[#4a4a4a]">{b}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[14px] text-[#9a9a9a]">Version {VERSION}</p>

          <nav aria-label="Indhold" className="mt-8 rounded-[24px] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_40px_-24px_rgba(0,0,0,0.2)]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#9a9a9a]">Indhold</p>
            <ol className="mt-3 grid gap-x-6 gap-y-2 text-[15px] sm:grid-cols-2">
              {TOC.map(([id, t], i) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-[#1c1c1c] underline-offset-4 hover:underline">
                    <span className="mr-2 text-[#bd5e3c]">{i + 1}.</span>
                    {t}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-6">
            <Section id="hvem" title="1. Hvem er vi">
              <p>
                Dataansvarlig er <strong>KostPilot ApS</strong>, CVR 46414241, Lønneparken 7, 6. 4., 9000 Aalborg. Skriv til os på{" "}
                <A href="mailto:oliver@kost-pilot.dk">oliver@kost-pilot.dk</A>. Vi har ikke en databeskyttelsesrådgiver, fordi vi ikke er forpligtet til det,
                men henvendelser om persondata besvares af stifterne.
              </p>
            </Section>

            <Section id="hvad" title="2. Hvilke oplysninger vi gemmer">
              <ul>
                <li>
                  <strong>Din konto:</strong> e-mail, navn og adgangskode (kun krypteret som hash). Hvornår du accepterede vilkårene og bekræftede din
                  alder.
                </li>
                <li>
                  <strong>Dine præferencer:</strong> budget, hvor mange I er, dine butikker, kostform (fx vegetar) og det, du ikke spiser.
                </li>
                <li>
                  <strong>Allergier og krop, kun med dit samtykke:</strong> allergier, vægt, højde, fødselsdato, køn, aktivitetsniveau og mål.
                </li>
                <li>
                  <strong>Det, du laver i appen:</strong> madplaner, indkøbslister, dit køkken (det du har derhjemme), gemte retter, prisvagter og hvad du har
                  brugt og sparet.
                </li>
                <li>
                  <strong>Piloten:</strong> dine beskeder til piloten og det, du beder den huske.
                </li>
                <li>
                  <strong>Dine valg i appen, kun med dit samtykke:</strong> fx hvilke retter du vælger og bytter, så forslagene passer bedre.
                </li>
                <li>
                  <strong>Husstanden:</strong> er du med i en husstand, deles indkøbsliste, køkken, budget og madplan med dem, du har inviteret. De kan også se
                  dit navn, din e-mail og dine allergier, så en fælles madplan er sikker for alle.
                </li>
                <li>
                  <strong>Invitationer:</strong> din personlige invitationskode, og hvor mange der har åbnet den og er kommet med.
                </li>
                <li>
                  <strong>Feedback:</strong> det, du selv skriver til os, og teknisk information om din telefon, hvis du sender en fejlrapport.
                </li>
              </ul>
            </Section>

            <Section id="hvorfor" title="3. Hvorfor, og hvad der giver os lov">
              <ul>
                <li>
                  <strong>For at appen virker</strong> (konto, madplan, indkøb, tilbud, piloten, husstand): fordi vi har en aftale med dig, når du opretter en
                  konto (GDPR art. 6, stk. 1, litra b).
                </li>
                <li>
                  <strong>Allergier og krop:</strong> kun med dit udtrykkelige samtykke (art. 9, stk. 2, litra a, og art. 6, stk. 1, litra a).
                </li>
                <li>
                  <strong>Personlig indlæring, anonym statistik og nyheder på mail:</strong> kun med dit samtykke (art. 6, stk. 1, litra a, og
                  markedsføringslovens § 10).
                </li>
                <li>
                  <strong>Fejlrapporter og sikker drift:</strong> vores legitime interesse i at rette fejl og holde tjenesten sikker (art. 6, stk. 1, litra f).
                </li>
              </ul>
              <p>Vi viser ingen reklamer, og vi sælger aldrig dine oplysninger. Vi træffer ingen afgørelser om dig, der alene er automatiske og har retsvirkning.</p>
            </Section>

            <Section id="samtykke" title="4. Dine samtykker og aldersgrænse">
              <p>
                Alle samtykker er slået fra, indtil du selv slår dem til. Du kan se, give og trække dem tilbage i appen under{" "}
                <strong>Profil, Privatliv &amp; data</strong>, og vi gemmer, hvornår du gjorde det. Trækker du samtykket til allergier og krop tilbage, sletter
                vi oplysningerne med det samme.
              </p>
              <p>
                <strong>Du skal være mindst 15 år</strong> for at bruge KostPilot. I Danmark kræver det samtykke fra en forælder at behandle
                persondata om børn under 15 år (databeskyttelseslovens § 6), og KostPilot er ikke lavet til børn.
              </p>
            </Section>

            <Section id="piloten" title="5. Piloten">
              <p>
                Piloten forstår det, du skriver, <strong>på selve telefonen</strong> (vores egen model eller Apple Intelligence). Dine beskeder sendes ikke til
                OpenAI, Google eller andre AI-udbydere. Samtalen gemmes på din konto, så piloten kan huske sammenhængen, og slettes efter 12 måneder.
              </p>
              <p>Piloten udfører aldrig noget stort uden din godkendelse.</p>
            </Section>

            <Section id="hvor" title="6. Hvor dine oplysninger ligger">
              <ul>
                <li>
                  <strong>Supabase</strong> (database og login) på servere hos Amazon Web Services i <strong>Irland</strong>, altså i EU.
                </li>
                <li>
                  <strong>Cloudflare</strong> leverer hjemmesiden, ventelisten og invitationslinks.
                </li>
                <li>
                  <strong>Zoho</strong> leverer vores e-mail (EU-datacenter). Skriver du til os, ligger din mail dér.
                </li>
              </ul>
              <p>
                De er vores databehandlere og må kun bruge oplysningerne til at levere deres tjeneste til os. Vi har databehandleraftaler med dem. Supabase og
                Cloudflare er amerikanske virksomheder; skulle de få adgang til data fra USA, sker det efter EU-Kommissionens standardkontrakter og EU-US Data
                Privacy Framework. Apple leverer App Store og TestFlight som selvstændig dataansvarlig efter Apples egne vilkår.
              </p>
              <p>Tilbud og priser henter vi fra Salling Group og REMA 1000. Vi sender ingen oplysninger om dig til dem.</p>
            </Section>

            <Section id="hvorlaenge" title="7. Hvor længe vi gemmer dem">
              <div className="overflow-hidden rounded-[18px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                {RETENTION.map(([what, how], i) => (
                  <div key={what} className={`grid gap-1 px-5 py-3.5 text-[15px] sm:grid-cols-[1.2fr_1fr] sm:gap-4 ${i ? "border-t border-black/[0.06]" : ""}`}>
                    <span className="font-medium text-[#1c1c1c]">{what}</span>
                    <span className="text-[#4a4a4a]">{how}</span>
                  </div>
                ))}
              </div>
              <p>Sletter du kontoen, sletter vi alle dine oplysninger. Sikkerhedskopier hos Supabase slettes automatisk efter Supabases faste regler.</p>
            </Section>

            <Section id="rettigheder" title="8. Dine rettigheder">
              <ul>
                <li>
                  <strong>Indsigt og dataportabilitet:</strong> Profil, Privatliv &amp; data, Eksportér data. Du får en kopi af alt i et maskinlæsbart format.
                </li>
                <li>
                  <strong>Sletning:</strong> Profil, Privatliv &amp; data, Slet konto permanent.
                </li>
                <li>
                  <strong>Berigtigelse:</strong> ret det selv i appen, eller skriv til os.
                </li>
                <li>
                  <strong>Begrænsning og indsigelse:</strong> skriv til os, så stopper vi behandlingen, mens vi ser på det.
                </li>
                <li>
                  <strong>Tilbagetrækning af samtykke:</strong> når som helst i appen. Det påvirker ikke det, vi lovligt har gjort før.
                </li>
                <li>
                  <strong>Klage:</strong> du kan klage til <A href="https://www.datatilsynet.dk">Datatilsynet</A>, Carl Jacobsens Vej 35, 2500 Valby.
                </li>
              </ul>
              <p>Vi svarer inden for en måned.</p>
            </Section>

            <Section id="hjemmesiden" title="9. Hjemmesiden, ventelisten og invitationer">
              <p>
                Skriver du dig på ventelisten, gemmer vi din e-mail og, hvis du vil, navn, alder og by. Vi bruger det kun til at sende dig en invitation og
                besked, når KostPilot åbner. Skriv til os, så sletter vi dig fra listen.
              </p>
              <p>
                Åbner nogen dit invitationslink, tæller vi det på din kode. Vi gemmer ikke IP-adresse eller andet, der kan identificere den, der åbnede
                linket.
              </p>
              <p>
                Hjemmesiden bruger ingen cookies til sporing, analyse eller reklamer. Cloudflare kan sætte en teknisk nødvendig cookie for at beskytte siden mod
                angreb, og Cloudflare gemmer IP-adresser kortvarigt af samme grund.
              </p>
            </Section>

            <Section id="sikkerhed" title="10. Sikkerhed">
              <p>
                Alle forbindelser er krypterede, og data er krypteret, hvor det ligger. Hver bruger kan kun se sine egne data og sin husstands data, og kun
                stifterne har adgang til databasen. Skulle der ske et brud på sikkerheden, anmelder vi det til Datatilsynet inden for 72
                timer og giver dig besked, hvis det kan gå ud over dig.
              </p>
            </Section>

            <Section id="kontakt" title="11. Ændringer og kontakt">
              <p>
                Ændrer vi, hvordan vi bruger dine oplysninger, opdaterer vi siden her. Er ændringen væsentlig, beder vi dig acceptere den i appen. Spørgsmål?
                Skriv til <A href="mailto:oliver@kost-pilot.dk">oliver@kost-pilot.dk</A>.
              </p>
              <p>
                <Link href="/" className="text-[#bd5e3c] underline underline-offset-4">
                  Tilbage til forsiden
                </Link>
              </p>
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
