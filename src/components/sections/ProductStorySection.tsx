"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PhoneMockup from "@/components/shared/PhoneMockup";

type StoryStep = {
  id: number;
  title: string;
  description: string;
  label: string;
};

const STORY_STEPS: StoryStep[] = [
  {
    id: 0,
    title: "Start with supermarket deals",
    description:
      "Kostpilot scans weekly offers and surfaces realistic meal options with clear prices, discounts, and store details.",
    label: "Deals",
  },
  {
    id: 1,
    title: "Build your weekly meal plan",
    description:
      "Pick your preferences, review suggestions, and generate a practical week of meals anchored to those deals.",
    label: "Meal Plan",
  },
  {
    id: 2,
    title: "Finish with one grocery list",
    description:
      "Everything from your selected meals is organized into one efficient list so one trip to the store is enough.",
    label: "Grocery List",
  },
];

function DealsState() {
  return (
    <div className="flex h-[520px] flex-col bg-[#faf9f7]">
      <div className="flex items-center justify-between bg-white px-4 py-3 shadow-sm">
        <div>
          <p className="text-[9px] font-medium uppercase tracking-widest text-[#999]">
            This week
          </p>
          <p className="text-[12px] font-bold text-[#111]">Daily Deals</p>
        </div>
        <div className="rounded-full bg-[#fef1ec] px-2 py-1 text-[10px] font-semibold text-[#e84c1e]">
          128 offers
        </div>
      </div>

      <div className="flex gap-2 bg-white px-4 pb-2 pt-1">
        {[
          { text: "All", active: true },
          { text: "Meat", active: false },
          { text: "Veg", active: false },
          { text: "Fish", active: false },
        ].map((chip) => (
          <span
            key={chip.text}
            className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${
              chip.active ? "bg-[#e84c1e] text-white" : "bg-[#f0ede8] text-[#777]"
            }`}
          >
            {chip.text}
          </span>
        ))}
      </div>

      <div className="flex-1 space-y-2 overflow-hidden px-3 py-2">
        {[
          {
            name: "Creamy Tomato Rigatoni",
            store: "Grocery Store A",
            price: "£4.90",
            old: "£7.13",
            off: "30% OFF",
          },
          {
            name: "Lemon Herb Chicken",
            store: "Grocery Store B",
            price: "£6.74",
            old: "£8.99",
            off: "25% OFF",
          },
          {
            name: "Teriyaki Salmon Bowl",
            store: "Grocery Store C",
            price: "£5.59",
            old: "£6.99",
            off: "20% OFF",
          },
        ].map((deal) => (
          <article
            key={deal.name}
            className="flex gap-3 rounded-xl border border-[#f0ede8] bg-white p-2.5 shadow-sm"
          >
            <div className="h-14 w-14 shrink-0 rounded-lg bg-gradient-to-br from-[#f5e0cc] to-[#eac9a8]" />
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h4 className="text-[10px] font-semibold text-[#111]">{deal.name}</h4>
                <p className="text-[8px] text-[#aaa]">{deal.store}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-[11px] font-bold text-[#111]">{deal.price}</span>
                  <span className="text-[8px] text-[#bbb] line-through">{deal.old}</span>
                </div>
                <span className="rounded-md bg-[#fef1ec] px-1.5 py-0.5 text-[8px] font-bold text-[#e84c1e]">
                  {deal.off}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function MealPlanState() {
  return (
    <div className="flex h-[520px] flex-col bg-[#faf9f7]">
      <div className="flex items-center justify-between bg-white px-4 py-3 shadow-sm">
        <div>
          <p className="text-[9px] font-medium uppercase tracking-widest text-[#999]">
            Generated
          </p>
          <p className="text-[12px] font-bold text-[#111]">Weekly Meal Plan</p>
        </div>
        <div className="text-[12px]">🍽️</div>
      </div>

      <div className="flex gap-1.5 bg-white px-3 pb-3 pt-1">
        {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
          <span
            key={`${day}-${i}`}
            className={`flex h-6 w-6 items-center justify-center rounded-full text-[8px] font-bold ${
              i < 4
                ? "border border-[#e84c1e] text-[#e84c1e]"
                : "bg-[#f0ede8] text-[#aaa]"
            }`}
          >
            {day}
          </span>
        ))}
      </div>

      <div className="flex-1 space-y-2 overflow-hidden px-3 pb-3">
        {[
          { day: "Monday", meal: "Rigatoni + side salad", type: "Dinner" },
          { day: "Tuesday", meal: "Chicken wraps", type: "Lunch" },
          { day: "Wednesday", meal: "Teriyaki salmon bowl", type: "Dinner" },
          { day: "Thursday", meal: "Greek yogurt bowl", type: "Breakfast" },
          { day: "Friday", meal: "Pasta bake", type: "Dinner" },
        ].map((entry) => (
          <article
            key={entry.day}
            className="rounded-lg border border-[#f0ede8] bg-white px-3 py-2"
          >
            <p className="text-[8px] font-semibold uppercase tracking-wide text-[#999]">
              {entry.day}
            </p>
            <h4 className="text-[10px] font-semibold text-[#111]">{entry.meal}</h4>
            <p className="text-[8px] text-[#aaa]">{entry.type}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function GroceryListState() {
  return (
    <div className="flex h-[520px] flex-col bg-[#faf9f7]">
      <div className="flex items-center justify-between bg-white px-4 py-3 shadow-sm">
        <h4 className="text-[12px] font-bold text-[#111]">Grocery List</h4>
        <span className="rounded-full bg-[#fef1ec] px-2 py-1 text-[9px] font-semibold text-[#e84c1e]">
          $43.60
        </span>
      </div>

      <div className="flex-1 space-y-2 overflow-hidden px-3 py-3">
        {[
          {
            category: "Produce",
            items: ["Bananas", "Avocados", "Spinach"],
          },
          {
            category: "Dairy & Refrigerated",
            items: ["Milk", "Eggs"],
          },
          {
            category: "Pantry & Staples",
            items: ["Pasta", "Canned tomatoes", "Olive oil"],
          },
        ].map((group) => (
          <section
            key={group.category}
            className="rounded-lg border border-[#f0ede8] bg-white px-3 py-2"
          >
            <p className="text-[8px] font-bold uppercase tracking-wide text-[#e84c1e]">
              {group.category}
            </p>
            <ul className="mt-1 space-y-1">
              {group.items.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-[3px] border border-[#e84c1e] bg-[#fef1ec]" />
                  <span className="text-[9px] text-[#444]">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

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

  const phoneStates = useMemo(
    () => [<DealsState key="deals" />, <MealPlanState key="plan" />, <GroceryListState key="list" />],
    [],
  );

  return (
    <section id="product-story" className="bg-[#f8f5f0] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <header className="mb-10 lg:mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#e84c1e]">
            Interactive Product Story
          </p>
          <h2 className="mt-3 max-w-xl text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.02em] text-[#111]">
            Follow one journey from discount to dinner plan
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
                      {`Step ${index + 1} · ${step.label}`}
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
                <div className="relative h-[520px] overflow-hidden bg-[#faf9f7]">
                  {phoneStates.map((state, index) => {
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
                        {state}
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
                    aria-label={`Go to ${step.label}`}
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
