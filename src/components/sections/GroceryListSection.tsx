import PhoneMockup from "@/components/shared/PhoneMockup";
import ScrollReveal from "@/components/shared/ScrollReveal";

const GROCERY_CATEGORIES = [
  {
    name: "Produce",
    items: [
      { name: "Bananas (1 bunch)", price: "$0.79", checked: true },
      { name: "Avocados (3)", price: "$3.50", checked: true },
      { name: "Spinach (1 bag)", price: null, checked: true },
      { name: "Courgettes (2)", price: "$2.99", checked: false },
    ],
  },
  {
    name: "Dairy & Refrigerated",
    items: [
      { name: "Milk (1 gal)", price: "$3.09", checked: true },
      { name: "Eggs (1 doz)", price: "$1.50", checked: false },
    ],
  },
  {
    name: "Bakery & Bread",
    items: [
      { name: "Whole Wheat Bread", price: "$4.49", checked: false },
      { name: "Greek Yogurt (2)", price: "$1.50", checked: false },
    ],
  },
  {
    name: "Pantry & Staples",
    items: [
      { name: "Pasta", price: "$3.99", checked: false },
      { name: "Canned Tomatoes (2)", price: "$1.80", checked: true },
      { name: "Olive Oil (1 bottle)", price: "$9.99", checked: false },
    ],
  },
];

function GroceryListPhoneMockupContent() {
  return (
    <div className="flex h-[560px] flex-col bg-[#faf9f7]">
      {/* Header */}
      <div className="bg-white px-4 pb-3 pt-4 shadow-sm">
        <p className="text-[13px] font-bold text-[#e84c1e]">Grocery List</p>
      </div>

      {/* List content */}
      <div className="flex-1 overflow-hidden px-4 py-2">
        {GROCERY_CATEGORIES.map((category) => (
          <div key={category.name} className="mb-3">
            <p className="mb-1.5 text-[8.5px] font-bold uppercase tracking-widest text-[#e84c1e]">
              {category.name}
            </p>
            <div className="space-y-1">
              {category.items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between py-0.5"
                >
                  <div className="flex items-center gap-2">
                    {/* Checkbox */}
                    <div
                      className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] border ${
                        item.checked
                          ? "border-[#e84c1e] bg-[#e84c1e]"
                          : "border-[#ccc] bg-white"
                      }`}
                    >
                      {item.checked && (
                        <span className="text-[6px] font-bold text-white">✓</span>
                      )}
                    </div>
                    <span
                      className={`text-[9px] ${
                        item.checked ? "text-[#bbb] line-through" : "text-[#333]"
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                  {item.price && (
                    <span className="text-[9px] text-[#888]">{item.price}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Running total */}
      <div className="flex items-center justify-between rounded-b-[4px] bg-[#e84c1e] px-5 py-3">
        <span className="text-[10px] font-bold text-white">Running Total:</span>
        <span className="text-[13px] font-bold text-white">$43.60</span>
      </div>
    </div>
  );
}

export default function GroceryListSection() {
  return (
    <section className="bg-[#f2ede6]">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-28">
        {/* Left: copy */}
        <div className="flex flex-col gap-7">
          <ScrollReveal>
            <div className="flex flex-col gap-4">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#e84c1e]">
                Step 3
              </p>
              <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.025em] text-[#111]">
                Get one smart grocery list
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className="flex flex-col gap-6">
              <p className="max-w-md text-lg leading-relaxed text-[#555]">
                Kostpilot consolidates every ingredient from your weekly plan into a
                single, organised shopping list — sorted by supermarket aisle so
                your trip is fast and efficient.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Auto-generated from your meal plan",
                  "Organised by supermarket aisle",
                  "Running total so you always know the cost",
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
            <GroceryListPhoneMockupContent />
          </PhoneMockup>
        </ScrollReveal>
      </div>
    </section>
  );
}
