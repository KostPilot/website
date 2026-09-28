"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { isValidWaitlistEmail, normalizeEmail } from "@/lib/waitlist";
import LogoMark from "@/components/site/LogoMark";

type SubmissionState = "idle" | "submitting" | "success" | "duplicate" | "error";

const WAITLIST_ENDPOINT = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT ?? "/api/waitlist";

const field =
  "w-full border-0 border-b border-black/15 bg-transparent px-0 pb-2 pt-1 text-[17px] text-[#1c1c1c] outline-none transition placeholder:text-black/30 focus:border-[#D4704C] disabled:opacity-60";

/** Et lille felt på boardingkortet: label i versaler og værdien under. */
function Meta({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-black/40">{label}</p>
      <p className={`mt-1 text-[15px] font-semibold ${accent ? "text-[#bd5e3c]" : "text-[#1c1c1c]"}`}>{value}</p>
    </div>
  );
}

/** Toppen af boardingkortet: brandbånd, rute og flyoplysninger. Samme på formularen og kvitteringen. */
function PassHead() {
  return (
    <>
      <div className="flex items-center justify-between bg-gradient-to-r from-[#bd5e3c] via-[#d4704c] to-[#e08560] px-6 py-4 text-white sm:px-8">
        <div className="flex items-center gap-2.5">
          <LogoMark size={24} cord="#d4704c" />
          <span className="font-display text-[18px]">KostPilot</span>
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/85">Boardingkort</span>
      </div>
      <div className="px-6 pt-6 sm:px-8">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-black/40">Fra</p>
            <p className="font-display text-[26px] leading-tight text-[#1c1c1c] sm:text-[32px]">Ventelisten</p>
          </div>
          <div className="relative mx-1 h-px flex-1 border-t-2 border-dashed border-[#d4704c]/40" aria-hidden>
            <span className="pass-plane absolute -top-[9px] left-0 flex h-4 w-4 items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-4 w-4 rotate-90 text-[#d4704c]" fill="currentColor">
                <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5Z" />
              </svg>
            </span>
          </div>
          <div className="text-right">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-black/40">Til</p>
            <p className="font-display text-[26px] leading-tight text-[#1c1c1c] sm:text-[32px]">iPhone</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-4">
          <Meta label="Fly" value="KP 02" />
          <Meta label="Gate" value="TestFlight" />
          <Meta label="Afgang" value="Snart" accent />
          <Meta label="Sæde" value="Tildeles" />
        </div>
      </div>
      {/* Perforeringen: stiplet linje med halvcirkler skåret ud i siderne */}
      <div className="relative my-6 h-6" aria-hidden>
        <span className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-[#0f0d0c]" />
        <span className="absolute -right-3 top-0 h-6 w-6 rounded-full bg-[#0f0d0c]" />
        <span className="absolute inset-x-5 top-1/2 border-t-2 border-dashed border-black/10" />
      </div>
    </>
  );
}

/**
 * Ventelisten som et boardingkort til fly KP 02. Først kun e-mail (lav kognitiv belastning);
 * navn, alder og by folder sig ud som valgfrit, når e-mailen er gyldig. Én indsendelse til API'et som før.
 */
export default function WaitlistSignupForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [touched, setTouched] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");
  const [joined, setJoined] = useState({ email: "", name: "" });

  const normalizedEmail = useMemo(() => normalizeEmail(email), [email]);
  const valid = isValidWaitlistEmail(email);
  // Vis først fejlen, når man har forladt feltet, så man ikke bliver irettesat midt i skrivningen.
  const showInlineError = touched && email.length > 0 && !valid;
  const busy = submissionState === "submitting";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);

    if (!valid) {
      setSubmissionState("error");
      setMessage("Indtast en gyldig e-mailadresse.");
      return;
    }

    setSubmissionState("submitting");
    setMessage("");

    try {
      const response = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizedEmail,
          name: name.trim() || undefined,
          age: age.trim() || undefined,
          location: location.trim() || undefined,
        }),
      });

      const payload = (await response.json().catch(() => null)) as { message?: string } | null;

      if (response.ok || response.status === 409) {
        setJoined({ email: normalizedEmail, name: name.trim() });
        setSubmissionState(response.ok ? "success" : "duplicate");
        setEmail("");
        setName("");
        setAge("");
        setLocation("");
        setTouched(false);
        return;
      }

      setSubmissionState("error");
      setMessage(payload?.message ?? "Noget gik galt. Prøv igen om lidt.");
    } catch {
      setSubmissionState("error");
      setMessage("Kunne ikke kontakte ventelisten. Prøv igen om lidt.");
    }
  }

  if (submissionState === "success" || submissionState === "duplicate") {
    return (
      <WaitlistJoined
        email={joined.email}
        name={joined.name}
        already={submissionState === "duplicate"}
        onAnother={() => {
          setSubmissionState("idle");
          setMessage("");
        }}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-xl text-left">
      <div className="overflow-hidden rounded-[28px] bg-[#f8f5f0] shadow-[0_40px_120px_-30px_rgba(212,112,76,0.55),0_0_0_1px_rgba(255,255,255,0.06)]">
        <PassHead />

        <div className="px-6 pb-7 sm:px-8 sm:pb-8">
          <label htmlFor="waitlist-email" className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-black/40">
            Passagerens e-mail
          </label>
          <input
            id="waitlist-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="navn@eksempel.dk"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (submissionState === "error") {
                setSubmissionState("idle");
                setMessage("");
              }
            }}
            onBlur={() => setTouched(true)}
            className={`${field} mt-1 text-[19px]`}
            aria-invalid={showInlineError}
            aria-describedby="waitlist-email-help"
            disabled={busy}
          />
          {showInlineError && <p className="mt-2 text-[13.5px] text-[#bd5e3c]">Tjek lige e-mailen. Den ser ikke helt rigtig ud.</p>}

          {/* De valgfri felter folder sig ud, når e-mailen er gyldig */}
          <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${valid ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
            <div className="overflow-hidden">
              <p className="mt-6 text-[13px] text-black/45">Fortæl lidt om dig, hvis du vil. Det er valgfrit.</p>
              <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-[1.4fr_0.6fr_1fr]">
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="waitlist-name" className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-black/40">
                    Navn
                  </label>
                  <input id="waitlist-name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} disabled={busy} tabIndex={valid ? 0 : -1} className={field} />
                </div>
                <div>
                  <label htmlFor="waitlist-age" className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-black/40">
                    Alder
                  </label>
                  <input id="waitlist-age" type="text" inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value)} disabled={busy} tabIndex={valid ? 0 : -1} className={field} />
                </div>
                <div>
                  <label htmlFor="waitlist-city" className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-black/40">
                    By
                  </label>
                  <input
                    id="waitlist-city"
                    type="text"
                    autoComplete="address-level2"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    disabled={busy}
                    tabIndex={valid ? 0 : -1}
                    className={field}
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={busy}
            className="mt-7 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#D4704C] px-6 text-[16px] font-semibold text-white shadow-[0_12px_30px_-10px_rgba(212,112,76,0.8)] transition hover:bg-[#BD5E3C] disabled:cursor-not-allowed disabled:bg-[#b87a63]"
          >
            {busy ? "Checker ind..." : "Check ind på ventelisten"}
            {!busy && <span aria-hidden>→</span>}
          </button>

          {message && submissionState === "error" && (
            <p className="mt-3 text-center text-[13.5px] text-[#bd5e3c]" role="alert">
              {message}
            </p>
          )}
        </div>
      </div>

      <p id="waitlist-email-help" className="mt-4 text-center text-[13px] leading-relaxed text-white/45">
        Vi bruger kun din e-mail til at sende din invitation og besked, når KostPilot åbner.
      </p>
    </form>
  );
}

/** Kvitteringen: boardingkortet bliver stemplet, og man kan dele siden videre. */
function WaitlistJoined({ email, name, already, onAnother }: { email: string; name: string; already: boolean; onAnother: () => void }) {
  const heading = useRef<HTMLHeadingElement>(null);
  const [shared, setShared] = useState<"" | "copied" | "failed">("");

  // Flyt fokus til kvitteringen, så skærmlæsere og tastatur følger med.
  useEffect(() => {
    heading.current?.focus();
  }, []);

  async function share() {
    const url = "https://kost-pilot.dk";
    const data = { title: "KostPilot", text: "Madplanen, der betaler sig selv. Skriv dig på ventelisten:", url };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(url);
      setShared("copied");
    } catch (err) {
      if ((err as Error)?.name !== "AbortError") setShared("failed");
    }
  }

  return (
    <div className="waitlist-joined w-full max-w-xl text-left" role="status">
      <div className="relative overflow-hidden rounded-[28px] bg-[#f8f5f0] shadow-[0_40px_120px_-30px_rgba(212,112,76,0.55),0_0_0_1px_rgba(255,255,255,0.06)]">
        <PassHead />
        <div className="relative px-6 pb-8 sm:px-8">
          {/* Stemplet */}
          <div className="pass-stamp pointer-events-none absolute -top-2 right-6 flex h-[112px] w-[112px] flex-col items-center justify-center rounded-full border-[3px] border-[#bd5e3c] text-[#bd5e3c] sm:right-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Boarding</span>
            <span className="font-display text-[20px] leading-none">Bekræftet</span>
            <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em]">KP 02</span>
          </div>

          <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-black/40">Passager</p>
          <p className="mt-1 max-w-[62%] truncate font-mono text-[17px] font-semibold text-[#1c1c1c]">{name || email}</p>
          {name && <p className="max-w-[62%] truncate font-mono text-[13.5px] text-black/50">{email}</p>}

          <h3 ref={heading} tabIndex={-1} className="font-display mt-7 text-[30px] leading-[1.08] text-[#1c1c1c] outline-none sm:text-[34px]">
            {already ? "Du står allerede på listen." : "Du er checket ind."}
          </h3>
          <p className="mt-2 text-[16px] leading-relaxed text-[#4a4a4a]">
            {already
              ? "Vi har din e-mail, og du hører fra os, så snart KostPilot åbner på iPhone."
              : "Du er blandt de første, der får en invitation, når vi åbner for TestFlight. Vi skriver til dig."}
          </p>

          <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={share}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#D4704C] px-6 text-[15px] font-semibold text-white transition hover:bg-[#BD5E3C]"
            >
              Tag en ven med om bord
            </button>
            <button type="button" onClick={onAnother} className="text-[14px] text-black/50 underline-offset-4 transition hover:text-black hover:underline">
              Skriv en anden e-mail op
            </button>
          </div>
          <p className="mt-3 min-h-5 text-[13px] text-black/50" aria-live="polite">
            {shared === "copied" ? "Linket er kopieret." : shared === "failed" ? "Kunne ikke dele. Linket er kost-pilot.dk" : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
