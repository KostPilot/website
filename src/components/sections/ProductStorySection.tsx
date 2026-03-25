"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import PhoneMockup from "@/components/shared/PhoneMockup";

type StoryStep = {
  id: number;
  title: string;
  description: string;
  label: string;
  screenSrc: string;
  screenAlt: string;
};

const STORY_STEPS: StoryStep[] = [
  {
    id: 0,
    title: "Start med ugens tilbud",
    description:
      "Kostpilot samler butikkernes tilbud ét sted og viser dig præcis, hvad du faktisk kan lave mad af den uge.",
    label: "Tilbud",
    screenSrc: "/app-screens/offers.svg",
    screenAlt: "Tilbudsskærm med ugens tilbud og filtre",
  },
  {
    id: 1,
    title: "Byg en madplan der passer til dig",
    description:
      "Dine præferencer omsættes til en madplan, så du hurtigt kan vælge retter og justere dem med få tryk.",
    label: "Madplan",
    screenSrc: "/app-screens/meal-plan.svg",
    screenAlt: "Madplan med ugens måltider og valg for denne uge",
  },
  {
    id: 2,
    title: "Afslut med én samlet indkøbsliste",
    description:
      "Når planen er klar, får du en indkøbsliste med budget og butiksfordeling, så turen i butikken bliver enkel.",
    label: "Indkøbsliste",
    screenSrc: "/app-screens/shopping-list.svg",
    screenAlt: "Indkøbsliste med budget og oversigt over butikker",
  },
];

export default function ProductStorySection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [previousStep, setPreviousStep] = useState<number | null>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const clearPreviousTimeoutRef = useRef<number | null>(null);

  const EXIT_DURATION = 240;
  const ENTER_DELAY = 120;
  const ENTER_DURATION = 380;
  const TOTAL_DURATION = 500;
  const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

  const transitionToStep = useMemo(
    () => (nextStep: number) => {
      setCurrentStep((current) => {
        if (current === nextStep) return current;

        setPreviousStep(current);

        if (clearPreviousTimeoutRef.current !== null) {
          window.clearTimeout(clearPreviousTimeoutRef.current);
        }

        clearPreviousTimeoutRef.current = window.setTimeout(() => {
          setPreviousStep((prev) => (prev === current ? null : prev));
        }, TOTAL_DURATION + 40);

        return nextStep;
      });
    },
    [TOTAL_DURATION],
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((node, index) => {
      if (!node) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              transitionToStep(index);
            }
          });
        },
        {
          threshold: 0.5,
          rootMargin: "-20% 0px -35% 0px",
        },
      );

      observer.observe(node);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [transitionToStep]);

  useEffect(() => {
    return () => {
      if (clearPreviousTimeoutRef.current !== null) {
        window.clearTimeout(clearPreviousTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section id="product-story" className="bg-[#f8f5f0] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <header className="mb-10 lg:mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#e84c1e]">
            Sådan hænger det sammen
          </p>
          <h2 className="mt-3 max-w-xl text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.02em] text-[#111]">
            Følg turen fra tilbud til en færdig ugeplan
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-14">
          <div className="space-y-0">
            {STORY_STEPS.map((step, index) => {
              const isCurrent = currentStep === index;
              const isPrevious = previousStep === index;

              const cardMotionStyle: React.CSSProperties = isCurrent
                ? {
                    opacity: 1,
                    transform: "translateY(0)",
                    transition:
                      previousStep !== null
                        ? `opacity ${ENTER_DURATION}ms ${EASING} ${ENTER_DELAY}ms, transform ${ENTER_DURATION}ms ${EASING} ${ENTER_DELAY}ms, border-color ${TOTAL_DURATION}ms ${EASING}, background-color ${TOTAL_DURATION}ms ${EASING}, box-shadow ${TOTAL_DURATION}ms ${EASING}`
                        : `border-color ${TOTAL_DURATION}ms ${EASING}, background-color ${TOTAL_DURATION}ms ${EASING}, box-shadow ${TOTAL_DURATION}ms ${EASING}`,
                  }
                : isPrevious
                  ? {
                      opacity: 0,
                      transform: "translateY(-20px)",
                      transition: `opacity ${EXIT_DURATION}ms ${EASING}, transform ${EXIT_DURATION}ms ${EASING}, border-color ${TOTAL_DURATION}ms ${EASING}, background-color ${TOTAL_DURATION}ms ${EASING}, box-shadow ${TOTAL_DURATION}ms ${EASING}`,
                    }
                  : {
                      opacity: 1,
                      transform: "translateY(0)",
                      transition: `border-color ${TOTAL_DURATION}ms ${EASING}, background-color ${TOTAL_DURATION}ms ${EASING}, box-shadow ${TOTAL_DURATION}ms ${EASING}`,
                    };

              return (
                <div
                  key={step.id}
                  ref={(node) => {
                    stepRefs.current[index] = node;
                  }}
                  className="min-h-[62vh] border-l border-[#e8e4df] pl-6 pr-1 py-8 lg:min-h-[70vh]"
                >
                  <div
                    className={`max-w-md rounded-2xl border px-5 py-6 will-change-[transform,opacity] ${
                      isCurrent
                        ? "border-[#e84c1e]/35 bg-[#fff2ec] shadow-sm"
                        : "border-transparent bg-transparent"
                    }`}
                    style={cardMotionStyle}
                  >
                    <p
                      className={`text-[11px] font-semibold uppercase tracking-widest transition-colors ${
                        isCurrent ? "text-[#e84c1e]" : "text-[#9a9a9a]"
                      }`}
                    >
                      {`Trin ${index + 1} · ${step.label}`}
                    </p>
                    <h3 className="mt-3 text-[clamp(1.25rem,2.2vw,1.7rem)] font-bold leading-[1.15] tracking-[-0.015em] text-[#111]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#555]">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:sticky lg:top-24">
            <div className="flex flex-col items-center gap-5">
              <PhoneMockup>
                <div className="relative h-[606px] overflow-hidden bg-[#faf9f7] sm:h-[648px]">
                  {STORY_STEPS.map((step, index) => {
                    const isCurrent = currentStep === index;
                    const isPrevious = previousStep === index;

                    const phoneMotionStyle: React.CSSProperties = isCurrent
                      ? {
                          opacity: 1,
                          transform: "translateY(0)",
                          zIndex: 20,
                          transition:
                            previousStep !== null
                              ? `opacity ${ENTER_DURATION}ms ${EASING} ${ENTER_DELAY}ms, transform ${ENTER_DURATION}ms ${EASING} ${ENTER_DELAY}ms`
                              : "none",
                        }
                      : isPrevious
                        ? {
                            opacity: 0,
                            transform: "translateY(-20px)",
                            zIndex: 10,
                            transition: `opacity ${EXIT_DURATION}ms ${EASING}, transform ${EXIT_DURATION}ms ${EASING}`,
                          }
                        : {
                            opacity: 0,
                            transform: "translateY(20px)",
                            zIndex: 0,
                            transition: "none",
                          };

                    return (
                      <div
                        key={index}
                        className="absolute inset-0 will-change-[transform,opacity]"
                        style={{
                          ...phoneMotionStyle,
                          pointerEvents: isCurrent ? "auto" : "none",
                        }}
                        aria-hidden={!isCurrent && !isPrevious}
                      >
                        <Image
                          src={step.screenSrc}
                          alt={step.screenAlt}
                          fill
                          sizes="300px"
                          className="object-cover object-top"
                        />
                      </div>
                    );
                  })}
                </div>
              </PhoneMockup>

              <div className="flex items-center gap-2" aria-label="Story progress">
                {STORY_STEPS.map((step, index) => (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => {
                      const prefersReducedMotion =
                        typeof window !== "undefined" &&
                        typeof window.matchMedia === "function" &&
                        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

                      stepRefs.current[index]?.scrollIntoView({
                        behavior: prefersReducedMotion ? "auto" : "smooth",
                        block: "center",
                      });
                      transitionToStep(index);
                    }}
                    className={`relative h-2.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      currentStep === index ? "w-7 bg-[#e84c1e]" : "w-2.5 bg-[#d4cdc4]"
                    }`}
                    aria-label={`Gå til ${step.label}`}
                    aria-pressed={currentStep === index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
