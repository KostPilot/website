/**
 * KostPilots logomærke (samme geometri som LogoMark i appen, viewBox 0-200).
 * animate: fladerne popper ind, og snoren tegnes (CSS i globals.css; slået fra ved reduced motion).
 */
export default function LogoMark({ size = 40, animate = false, cord = "#fff" }: { size?: number; animate?: boolean; cord?: string }) {
  const a = animate;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" aria-hidden="true">
      <g fill="#D4704C">
        <path className={a ? "logo-bar" : undefined} d="M32,168 L66,168 L170,30 L136,30 Z" />
        <path className={a ? "logo-block-tl" : undefined} d="M32,30 L72,30 L105,60 L95,74 L78,98 L46,98 L32,84 Z" />
        <path className={a ? "logo-block-br" : undefined} d="M168,170 L128,170 L95,140 L105,126 L122,102 L154,102 L168,116 Z" />
      </g>
      {[
        ["a", "M74,80 C66,82 62,74 68,69 C74,64 84,68 88,76 C96,90 108,98 122,102"],
        ["b", "M126,120 C134,118 138,126 132,131 C126,136 116,132 112,124 C104,110 92,102 78,98"],
      ].map(([k, d]) => (
        <g key={k} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path className={a ? `logo-cord ${k}` : undefined} d={d} stroke={cord} strokeWidth={16} />
          <path className={a ? `logo-cord ${k}` : undefined} d={d} stroke="#D4704C" strokeWidth={8} />
        </g>
      ))}
    </svg>
  );
}
