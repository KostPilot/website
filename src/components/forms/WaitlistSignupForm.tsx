"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { isValidWaitlistEmail, normalizeEmail } from "@/lib/waitlist";
import LogoMark from "@/components/site/LogoMark";

type SubmissionState = "idle" | "submitting" | "success" | "duplicate" | "error";

const WAITLIST_ENDPOINT = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT ?? "/api/waitlist";

export default function WaitlistSignupForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");
  const [joinedEmail, setJoinedEmail] = useState("");

  const normalizedEmail = useMemo(() => normalizeEmail(email), [email]);

  const showInlineError =
    email.length > 0 && submissionState !== "success" && !isValidWaitlistEmail(email);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValidWaitlistEmail(email)) {
      setSubmissionState("error");
      setMessage("Indtast en gyldig e-mailadresse.");
      return;
    }

    setSubmissionState("submitting");
    setMessage("");

    try {
      const response = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          name: name.trim() || undefined,
          age: age.trim() || undefined,
          location: location.trim() || undefined,
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (response.ok) {
        setJoinedEmail(normalizedEmail);
        setSubmissionState("success");
        setMessage(payload?.message ?? "Du er skrevet op. Vi sender din invite code ved lancering.");
        setEmail("");
        setName("");
        setAge("");
        setLocation("");
        return;
      }

      if (response.status === 409) {
        setJoinedEmail(normalizedEmail);
        setSubmissionState("duplicate");
        setMessage(payload?.message ?? "Den e-mail er allerede skrevet op til ventelisten.");
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
        email={joinedEmail}
        already={submissionState === "duplicate"}
        onAnother={() => {
          setSubmissionState("idle");
          setMessage("");
          setEmail("");
        }}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-4">
      <label htmlFor="waitlist-email" className="sr-only">
        E-mail
      </label>

      <div className="flex flex-col gap-3">
        <input
          id="waitlist-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="navn@eksempel.dk"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);

            if (submissionState !== "idle") {
              setSubmissionState("idle");
              setMessage("");
            }
          }}
          className="min-h-14 w-full rounded-full border border-white/12 bg-white px-5 text-[15px] text-[#111] outline-none transition focus:border-[#D4704C] focus:ring-4 focus:ring-[#D4704C]/15"
          aria-invalid={showInlineError}
          aria-describedby="waitlist-email-help"
          disabled={submissionState === "submitting"}
        />
        <input
          type="text"
          placeholder="Navn"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={submissionState === "submitting"}
          className="min-h-14 w-full rounded-full border border-white/12 bg-white px-5 text-[15px] text-[#111] outline-none transition focus:border-[#D4704C] focus:ring-4 focus:ring-[#D4704C]/15"
        />
        <input
          type="text"
          placeholder="Alder"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          disabled={submissionState === "submitting"}
          className="min-h-14 w-full rounded-full border border-white/12 bg-white px-5 text-[15px] text-[#111] outline-none transition focus:border-[#D4704C] focus:ring-4 focus:ring-[#D4704C]/15"
        />
        <input
          type="text"
          placeholder="By"
          autoComplete="address-level2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          disabled={submissionState === "submitting"}
          className="min-h-14 w-full rounded-full border border-white/12 bg-white px-5 text-[15px] text-[#111] outline-none transition focus:border-[#D4704C] focus:ring-4 focus:ring-[#D4704C]/15"
        />
        <button
          type="submit"
          disabled={submissionState === "submitting"}
          className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#D4704C] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#BD5E3C] disabled:cursor-not-allowed disabled:bg-[#8f4a31]"
        >
          {submissionState === "submitting" ? "Sender..." : "Tilmeld"}
        </button>
      </div>

      <p id="waitlist-email-help" className="text-sm leading-relaxed text-[#8f8f8f]">
        Vi bruger din e-mail til at sende invite code og besked, når KostPilot lancerer.
      </p>

      {showInlineError ? (
        <p className="text-sm text-[#ffb39b]">Indtast en gyldig e-mailadresse.</p>
      ) : null}

      {message ? (
        <p className="text-sm text-[#ffb39b]" role="alert">
          {message}
        </p>
      ) : null}
    </form>
  );
}

/** Kvittering når man er kommet på listen: logoet tegner sig selv, og man kan dele siden videre. */
function WaitlistJoined({ email, already, onAnother }: { email: string; already: boolean; onAnother: () => void }) {
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
    <div className="waitlist-joined flex w-full max-w-md flex-col items-center rounded-[32px] bg-white/[0.05] px-6 py-10 text-center ring-1 ring-white/10" role="status">
      <LogoMark size={64} animate cord="#1a1716" />
      <h3 ref={heading} tabIndex={-1} className="font-display mt-6 text-[34px] leading-[1.08] text-white outline-none">
        {already ? "Du står allerede på listen." : "Du er på listen."}
      </h3>
      <p className="mt-3 max-w-sm text-[16px] leading-relaxed text-white/70">
        {already ? "Vi har din e-mail" : "Tak. Vi skriver til"}{" "}
        {email ? <span className="font-semibold text-white">{email}</span> : "dig"}
        {already ? ", og du får besked, når KostPilot åbner på iPhone." : ", når KostPilot åbner på iPhone. Du er blandt de første, der får en invitation."}
      </p>
      <div className="mt-8 flex w-full flex-col items-center gap-3">
        <button
          type="button"
          onClick={share}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#D4704C] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#BD5E3C] sm:w-auto"
        >
          Del KostPilot med en ven
        </button>
        <p className="min-h-5 text-[13px] text-white/55" aria-live="polite">
          {shared === "copied" ? "Linket er kopieret." : shared === "failed" ? "Kunne ikke dele. Linket er kost-pilot.dk" : ""}
        </p>
        <button type="button" onClick={onAnother} className="text-[13px] text-white/55 underline-offset-4 transition hover:text-white hover:underline">
          Skriv en anden e-mail op
        </button>
      </div>
    </div>
  );
}
