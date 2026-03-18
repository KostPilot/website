import PhoneMockup from "@/components/shared/PhoneMockup";
import ScrollReveal from "@/components/shared/ScrollReveal";

function DealsPhoneMockupContent() {
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
    {
      badge: "20% OFF",
      name: "Teriyaki Salmon Bowl",
      store: "Grocery Store C",
      price: "£5.59",
      original: "£6.99",
      color: "from-[#d4e8f5] to-[#b8d4e8]",
    },
  ];

  return (
    <div className="flex h-[500px] flex-col bg-[#faf9f7]">
      {/* App header */}
      <div className="flex items-center justify-between bg-white px-4 py-3 shadow-sm">
        <div>
          <p className="text-[9px] font-medium uppercase tracking-widest text-[#999]">
            This week
          </p>
          <p className="text-[12px] font-bold text-[#111]">Daily Deals</p>
        </div>
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fef1ec]">
          <span className="text-[11px]">🔔</span>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-hidden bg-white px-4 pb-3 pt-1">
        {["All", "Meat", "Veg", "Fish", "Pasta"].map((chip, i) => (
          <span
            key={chip}
            className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-semibold ${
              i === 0
                ? "bg-[#e84c1e] text-white"
                : "bg-[#f0ede8] text-[#777]"
            }`}
          >
            {chip}
          </span>
        ))}
      </div>

      {/* Deal list */}
      <div className="flex-1 space-y-2.5 overflow-hidden px-3 pt-2">
        {deals.map((deal) => (
          <div
            key={deal.name}
            className="flex gap-3 rounded-xl border border-[#f0ede8] bg-white p-2.5 shadow-sm"
          >
            {/* Thumbnail */}
            <div
              className={`h-14 w-14 shrink-0 rounded-lg bg-gradient-to-br ${deal.color}`}
            />
            {/* Info */}
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <p className="text-[10px] font-semibold leading-tight text-[#111]">
                  {deal.name}
                </p>
                <p className="mt-0.5 text-[8px] text-[#aaa]">{deal.store}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-[11px] font-bold text-[#111]">{deal.price}</span>
                  <span className="text-[8px] text-[#bbb] line-through">{deal.original}</span>
                </div>
                <span className="rounded-md bg-[#fef1ec] px-1.5 py-0.5 text-[8px] font-bold text-[#e84c1e]">
                  {deal.badge}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Updated label at bottom */}
      <div className="px-4 py-2.5 text-center">
        <p className="text-[8px] font-medium uppercase tracking-widest text-[#bbb]">
          Updated every Monday
        </p>
      </div>
    </div>
  );
}

export default function DealsSection() {
  return (
    <section id="deals" className="border-t border-black/6 bg-[#f8f5f0]">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-28">
        {/* Left: copy */}
        <div className="flex flex-col gap-7">
          <ScrollReveal>
            <div className="flex flex-col gap-4">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#e84c1e]">
                Step 1
              </p>
              <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.025em] text-[#111]">
                Start with what&rsquo;s on sale
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className="flex flex-col gap-6">
              <p className="max-w-md text-lg leading-relaxed text-[#555]">
                Kostpilot scans weekly supermarket offers and surfaces the best
                deals for real, cookable meals — not just discounted ingredients.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Deals refreshed every Monday morning",
                  "Matched to meals, not just ingredients",
                  "Covers multiple supermarkets at once",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-[#555]">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#e84c1e]/12">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#e84c1e]" />
                    </span>
                    <span className="text-[15px] leading-snug">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* Right: phone mockup */}
        <ScrollReveal delay={150} className="flex justify-center lg:justify-end">
          <PhoneMockup>
            <DealsPhoneMockupContent />
          </PhoneMockup>
        </ScrollReveal>
      </div>
    </section>
  );
}
