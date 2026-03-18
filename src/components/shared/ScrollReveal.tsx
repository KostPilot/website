"use client";

import { useEffect, useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  /** Milliseconds to wait after entering the viewport before revealing */
  delay?: number;
  className?: string;
}

/**
 * Reveals its children once when they enter the viewport.
 * Uses IntersectionObserver + CSS classes defined in globals.css.
 * Once revealed, the element stays visible permanently.
 *
 * For above-the-fold hero content, use CSS animation classes directly
 * (hero-badge, hero-heading, hero-body, hero-phone) instead of this component.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const reveal = () => {
      el.classList.remove("reveal-init");
      el.classList.add("reveal-done");
      el.dataset.revealState = "done";

      if (process.env.NODE_ENV !== "production") {
        // Useful for verifying observer behavior in browser devtools.
        // eslint-disable-next-line no-console
        console.debug("[ScrollReveal] revealed", el);
      }
    };

    if (prefersReducedMotion) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            timer = setTimeout(reveal, delay);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (timer !== undefined) {
        clearTimeout(timer);
      }
    };
  }, [delay]);

  return (
    <div ref={ref} data-reveal-state="init" className={`reveal-init ${className}`}>
      {children}
    </div>
  );
}
