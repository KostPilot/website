"use client";

import { FormEvent, useMemo, useState } from "react";
import { isValidWaitlistEmail, normalizeEmail } from "@/lib/waitlist";

type SubmissionState = "idle" | "submitting" | "success" | "duplicate" | "error";

const WAITLIST_ENDPOINT = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT ?? "/api/waitlist";

export default function WaitlistSignupForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");

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
        setSubmissionState("success");
        setMessage(payload?.message ?? "Du er skrevet op. Vi sender din invite code ved lancering.");
        setEmail("");
        setName("");
        setAge("");
        setLocation("");
        return;
      }

      if (response.status === 409) {
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

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-4">
      <label htmlFor="waitlist-email" className="text-sm font-medium text-white">
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
          className="min-h-14 w-full rounded-full border border-white/12 bg-white px-5 text-[15px] text-[#111] outline-none transition focus:border-[#e84c1e] focus:ring-4 focus:ring-[#e84c1e]/15"
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
          className="min-h-14 w-full rounded-full border border-white/12 bg-white px-5 text-[15px] text-[#111] outline-none transition focus:border-[#e84c1e] focus:ring-4 focus:ring-[#e84c1e]/15"
        />
        <input
          type="text"
          placeholder="Alder"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          disabled={submissionState === "submitting"}
          className="min-h-14 w-full rounded-full border border-white/12 bg-white px-5 text-[15px] text-[#111] outline-none transition focus:border-[#e84c1e] focus:ring-4 focus:ring-[#e84c1e]/15"
        />
        <input
          type="text"
          placeholder="Location"
          autoComplete="address-level2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          disabled={submissionState === "submitting"}
          className="min-h-14 w-full rounded-full border border-white/12 bg-white px-5 text-[15px] text-[#111] outline-none transition focus:border-[#e84c1e] focus:ring-4 focus:ring-[#e84c1e]/15"
        />
        <button
          type="submit"
          disabled={submissionState === "submitting"}
          className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#e84c1e] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#c73d14] disabled:cursor-not-allowed disabled:bg-[#a8482a]"
        >
          {submissionState === "submitting" ? "Sender..." : "Tilmeld"}
        </button>
      </div>

      <p id="waitlist-email-help" className="text-sm leading-relaxed text-[#8f8f8f]">
        Vi bruger din e-mail til at sende invite code og besked, når Kostpilot lancerer.
      </p>

      {showInlineError ? (
        <p className="text-sm text-[#ffb39b]">Indtast en gyldig e-mailadresse.</p>
      ) : null}

      {message ? (
        <p
          className={`text-sm ${
            submissionState === "success"
              ? "text-[#b9e8c2]"
              : submissionState === "duplicate"
                ? "text-[#ffd08a]"
                : "text-[#ffb39b]"
          }`}
          role={submissionState === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
