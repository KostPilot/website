"use client";

import { useScrollProgress } from "./motion";
import LogoMark from "./LogoMark";

/**
 * Et kort midt på papiret, der vokser til hele skærmen, mens man ruller,
 * og til sidst får en stor overskrift ovenpå. Uden billede bruges brandets recap-gradient med mærket.
 */
export default function ExpandingCard({ src, alt = "", position = "50% 50%", children }: { src?: string; alt?: string; position?: string; children: React.ReactNode }) {
  const [ref, p] = useScrollProgress<HTMLDivElement>(0, 1);
  const size = 58 + 42 * p;
  const textOn = p > 0.55;
  return (
    <div ref={ref} className="relative h-[230vh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <div
          className="relative overflow-hidden"
          style={{ width: `${size}%`, height: `${size}%`, borderRadius: `${36 * (1 - p)}px` }}
        >
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: position, transform: `scale(${1.15 - 0.15 * p})` }} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,#0f0d0c_0%,#3a1c12_35%,#8a3f26_65%,#d4704c_85%,#f0a283_100%)]">
              <div style={{ transform: `scale(${1 + p * 0.6}) rotate(${-8 + 8 * p}deg)`, opacity: 1 - p * 0.75 }}>
                <LogoMark size={180} variant="cord" cord="#3a1c12" />
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" style={{ opacity: p }} />
          <div
            className="absolute inset-x-0 bottom-0 px-6 pb-[12vh] text-center text-white transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
            style={{ opacity: textOn ? 1 : 0, transform: textOn ? "none" : "translateY(24px)" }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
