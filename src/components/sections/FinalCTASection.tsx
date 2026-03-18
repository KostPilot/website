import PhoneMockup from "@/components/shared/PhoneMockup";
import ScrollReveal from "@/components/shared/ScrollReveal";

function FinalPhoneMockupContent() {
  const deals = [
    {
      badge: "30% OFF",
      name: "Creamy Tomato Rigatoni",
      store: "Grocery Store A",
      price: "£4.90",
      original: "£7.13",
      color: "from-[#f5e0cc] to-[#eac9a8]",
    },
    {
      badge: "25% OFF",
      name: "Lemon Herb Roasted Chicken",
      store: "Grocery Store B",
      price: "£6.74",
      original: "£8.99",
      color: "from-[#ddeedd] to-[#c8e0c8]",
    },
  ];

  return (
    <div className="flex h-[500px] flex-col bg-[#faf9f7]">
      {/* App header */}
      <div className="flex items-center justify-between bg-white px-4 py-3 shadow-sm">
        <span className="text-[12px] font-bold tracking-widest text-[#111]">DAILY DEALS</span>
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fef1ec]">
          <span className="text-[11px]">🛒</span>
        </div>
      </div>

      {/* Deal cards */}
      <div className="flex-1 space-y-2.5 overflow-hidden px-3 pt-3">
        {deals.map((deal) => (
          <div
            key={deal.name}
            className="overflow-hidden rounded-xl border border-[#f0ede8] bg-white shadow-sm"
          >
            <div
              className={`relative h-28 bg-gradient-to-br ${deal.color}`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-14 w-18 rounded-full bg-white/20" />
              </div>
              <span className="absolute right-2 top-2 rounded-md bg-[#e84c1e] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                {deal.badge}
              </span>
            </div>
            <div className="px-3 py-2.5">
              <p className="text-[11px] font-semibold text-[#111]">{deal.name}</p>
              <p className="mt-0.5 text-[9px] text-[#999]">{deal.store}</p>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[13px] font-bold text-[#111]">{deal.price}</span>
                  <span className="text-[9px] text-[#bbb] line-through">{deal.original}</span>
                </div>
                <button className="rounded-full bg-[#e84c1e] px-3 py-1 text-[9px] font-semibold text-white">
                  View Deal
                </button>
              </div>
            </div>
          </div>
        ))}
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

export default function FinalCTASection() {
  return (
    <section id="final-cta" className="bg-[#111]">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-28">
        {/* Left: copy */}
        <div className="flex flex-col gap-8">
          <ScrollReveal>
            <h2 className="text-[clamp(2.4rem,5vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
              Stop thinking about dinner
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="flex flex-col gap-7">
              <p className="max-w-md text-lg leading-relaxed text-[#888]">
                Join Kostpilot early and be first to plan meals smarter, spend less
                on groceries, and put an end to the weekly dinner guessing game.
              </p>

              <div className="flex flex-col gap-4">
                <a
                  href="#final-cta"
                  className="inline-flex w-fit items-center justify-center rounded-full bg-[#e84c1e] px-8 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-[#c73d14]"
                >
                  Get early access
                </a>
                <p className="text-[11px] font-medium uppercase tracking-widest text-[#555]">
                  Free during beta · Available on iOS and Android
                </p>
              </div>

              <a
                href="mailto:hello@kostpilot.app"
                className="w-fit text-sm text-[#555] transition-colors hover:text-[#888]"
              >
                Questions? hello@kostpilot.app
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Right: phone mockup */}
        <ScrollReveal delay={180} className="flex justify-center lg:justify-end">
          <PhoneMockup>
            <FinalPhoneMockupContent />
          </PhoneMockup>
        </ScrollReveal>
      </div>
    </section>
  );
}
