import PhoneMockup from "@/components/shared/PhoneMockup";

function DealCard({
  badge,
  name,
  store,
  price,
  originalPrice,
}: {
  badge: string;
  name: string;
  store: string;
  price: string;
  originalPrice: string;
}) {
  return (
    <div className="mx-3 mb-3 overflow-hidden rounded-xl border border-[#f0ede8] bg-white shadow-sm">
      {/* Meal image placeholder */}
      <div className="relative h-28 bg-gradient-to-br from-[#f5e6d8] to-[#e8d0b8]">
        {/* Food illustration using CSS */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-20 rounded-full bg-[#d4956a]/30" />
          <div className="absolute h-10 w-14 rounded-full bg-[#c07a4a]/20" />
        </div>
        {/* Badge */}
        <span className="absolute right-2 top-2 rounded-md bg-[#e84c1e] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
          {badge}
        </span>
      </div>
      {/* Details */}
      <div className="px-3 py-2.5">
        <p className="text-[11px] font-semibold text-[#111]">{name}</p>
        <p className="mt-0.5 text-[9px] text-[#999]">{store}</p>
        <div className="mt-1.5 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[12px] font-bold text-[#111]">{price}</span>
            <span className="text-[9px] text-[#bbb] line-through">{originalPrice}</span>
          </div>
          <button className="rounded-full bg-[#e84c1e] px-2.5 py-1 text-[9px] font-semibold text-white">
            View Deal
          </button>
        </div>
      </div>
    </div>
  );
}

function HeroPhoneMockupContent() {
  return (
    <div className="flex h-[520px] flex-col bg-[#faf9f7]">
      {/* Status bar */}
      <div className="flex items-center justify-between bg-white px-4 py-1.5">
        <span className="text-[9px] font-medium text-[#111]">10:30</span>
        <div className="flex items-center gap-1">
          <span className="text-[9px] text-[#555]">●●●</span>
          <span className="text-[9px] text-[#555]">WiFi</span>
          <span className="text-[9px] text-[#555]">▣</span>
        </div>
      </div>

      {/* App header */}
      <div className="flex items-center justify-between bg-white px-4 pb-3 pt-1 shadow-sm">
        <span className="text-[11px] font-bold tracking-widest text-[#111]">DAILY DEALS</span>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#fef1ec]">
          <span className="text-[10px]">🛒</span>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-hidden pt-2">
        <DealCard
          badge="30% OFF"
          name="Creamy Tomato Rigatoni"
          store="Grocery Store A"
          price="£4.90"
          originalPrice="£7.13"
        />
        <DealCard
          badge="25% OFF"
          name="Lemon Herb Roasted Chicken"
          store="Grocery Store B"
          price="£6.74"
          originalPrice="£8.99"
        />
      </div>

      {/* Bottom tab bar */}
      <div className="flex items-center justify-around border-t border-[#f0ede8] bg-white px-2 py-2">
        {[
          { label: "Home", active: true },
          { label: "Search", active: false },
          { label: "Favorites", active: false },
          { label: "Profile", active: false },
        ].map((tab) => (
          <div key={tab.label} className="flex flex-col items-center gap-0.5">
            <div
              className={`h-3.5 w-3.5 rounded-sm ${tab.active ? "bg-[#e84c1e]" : "bg-[#ccc]"}`}
            />
            <span
              className={`text-[8px] ${tab.active ? "font-semibold text-[#e84c1e]" : "text-[#999]"}`}
            >
              {tab.label}
            </span>
            {tab.active && (
              <div className="h-0.5 w-3 rounded-full bg-[#e84c1e]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function FloatingAccent({
  name,
  price,
  badge,
  colorClass,
  wrapperClass,
  floatClass,
}: {
  name: string;
  price: string;
  badge: string;
  colorClass: string;
  wrapperClass: string;
  floatClass: string;
}) {
  return (
    <div className={`pointer-events-none absolute hidden lg:block ${wrapperClass}`}>
      <div className={`${floatClass} w-36 rounded-xl bg-white shadow-lg`}>
        <div className={`h-10 rounded-t-xl ${colorClass}`} />
        <div className="px-2.5 py-2">
          <p className="text-[9px] font-semibold leading-tight text-[#111]">{name}</p>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#111]">{price}</span>
            <span className="rounded bg-[#e84c1e] px-1 py-0.5 text-[7px] font-bold text-white">
              {badge}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f8f5f0]">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
        {/* Left: copy — CSS-animated, no JS needed */}
        <div className="flex flex-col gap-7">
          <div className="hero-badge inline-flex w-fit rounded-full border border-[#e84c1e]/20 bg-[#fef1ec] px-3.5 py-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#e84c1e]">
              Now in beta
            </span>
          </div>

          <h1 className="hero-heading text-[clamp(2.4rem,5vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#111]">
            Plan your meals around supermarket deals
          </h1>

          <div className="hero-body flex flex-col gap-5">
            <p className="max-w-md text-lg leading-relaxed text-[#555]">
              Kostpilot turns weekly supermarket offers into a ready-made meal
              plan and smart shopping list — in seconds.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#final-cta"
                className="inline-flex items-center justify-center rounded-full bg-[#e84c1e] px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#c73d14]"
              >
                Get early access
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-1.5 px-2 py-3.5 text-[15px] font-medium text-[#555] transition-colors hover:text-[#111]"
              >
                See how it works
                <span className="text-[#e84c1e]">→</span>
              </a>
            </div>

            <p className="text-xs font-medium uppercase tracking-widest text-[#aaa]">
              Free during beta · Cancel anytime
            </p>
          </div>
        </div>

        {/* Right: phone mockup + subtle floating accents */}
        <div className="relative flex justify-center lg:justify-end">
          {/* Floating accent 1 — top right, very subtle */}
          <FloatingAccent
            name="Pasta Arrabiata"
            price="£3.20"
            badge="-28%"
            colorClass="bg-gradient-to-br from-[#f5e0cc] to-[#eac9a8]"
            wrapperClass="-top-2 right-0 rotate-2 opacity-65"
            floatClass="float-slow"
          />
          {/* Floating accent 2 — lower left, very subtle */}
          <FloatingAccent
            name="Fresh Salmon"
            price="£5.40"
            badge="-22%"
            colorClass="bg-gradient-to-br from-[#d4e8f5] to-[#b8d4e8]"
            wrapperClass="bottom-10 -left-2 -rotate-2 opacity-55"
            floatClass="float-medium"
          />

          <div className="hero-phone">
            <PhoneMockup>
              <HeroPhoneMockupContent />
            </PhoneMockup>
          </div>
        </div>
      </div>
    </section>
  );
}
