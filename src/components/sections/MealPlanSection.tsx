import PhoneMockup from "@/components/shared/PhoneMockup";
import ScrollReveal from "@/components/shared/ScrollReveal";

const DAYS = ["M", "TW", "TH", "FR", "SA", "SU"];
const MEALS = [
  { name: "Avocado Toast", type: "Breakfast", color: "bg-[#e8f5e8]" },
  { name: "Quinoa Salad", type: "Lunch", color: "bg-[#fff3e0]" },
  { name: "Creamy Rigatoni", type: "Dinner", color: "bg-[#fce4ec]" },
  { name: "Greek Yogurt", type: "Breakfast", color: "bg-[#e3f2fd]" },
  { name: "Chicken Wrap", type: "Lunch", color: "bg-[#f3e5f5]" },
  { name: "Turkey Roast", type: "Dinner", color: "bg-[#fff8e1]" },
  { name: "Smoothie Bowl", type: "Breakfast", color: "bg-[#e8f5e8]" },
  { name: "Baked Cod", type: "Lunch", color: "bg-[#e3f2fd]" },
  { name: "Pasta Bake", type: "Dinner", color: "bg-[#fce4ec]" },
];

function MealPlanPhoneMockupContent() {
  return (
    <div className="flex h-[540px] flex-col bg-[#faf9f7]">
      {/* Header */}
      <div className="flex items-center justify-between bg-white px-4 py-3 shadow-sm">
        <p className="text-[12px] font-bold tracking-widest text-[#111]">WEEKLY MEAL PLAN</p>
        <span className="text-[14px]">🍴</span>
      </div>

      {/* Day selector */}
      <div className="flex items-center gap-1.5 bg-white px-3 pb-3 pt-1">
        {DAYS.map((day, i) => (
          <div key={day} className="flex flex-1 flex-col items-center gap-0.5">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-bold ${
                i <= 2
                  ? "border-2 border-[#e84c1e] text-[#e84c1e]"
                  : "bg-[#f0ede8] text-[#aaa]"
              }`}
            >
              {day}
            </div>
          </div>
        ))}
      </div>

      {/* Meal grid */}
      <div className="flex-1 overflow-hidden px-3 pt-2">
        <p className="mb-2 text-[9px] font-bold uppercase tracking-widest text-[#999]">
          7-Day Meal Plan
        </p>
        <div className="grid grid-cols-3 gap-1.5">
          {MEALS.map((meal) => (
            <div
              key={meal.name}
              className={`relative rounded-xl p-2 ${meal.color}`}
            >
              {/* Checkmark */}
              <div className="absolute right-1.5 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#e84c1e]">
                <span className="text-[7px] font-bold text-white">✓</span>
              </div>
              {/* Plate icon area */}
              <div className="mb-1 flex h-10 w-full items-center justify-center rounded-lg bg-white/60">
                <div className="h-5 w-6 rounded-full bg-white/80" />
              </div>
              <p className="text-[7px] font-semibold leading-tight text-[#333]">
                {meal.name}
              </p>
              <p className="text-[6.5px] text-[#888]">{meal.type}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom action */}
      <div className="px-3 py-3">
        <button className="w-full rounded-full bg-[#e84c1e] py-2 text-[10px] font-bold text-white">
          Regenerate plan
        </button>
      </div>
    </div>
  );
}

export default function MealPlanSection() {
  return (
    <section className="bg-[#111]">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-28">
        {/* Left: phone mockup — order reversed on desktop */}
        <ScrollReveal className="flex justify-center lg:order-first">
          <PhoneMockup>
            <MealPlanPhoneMockupContent />
          </PhoneMockup>
        </ScrollReveal>

        {/* Right: copy */}
        <div className="flex flex-col gap-7">
          <ScrollReveal delay={80}>
            <div className="flex flex-col gap-4">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#e84c1e]">
                Step 2
              </p>
              <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.025em] text-white">
                Turn deals into a full week of meals
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="flex flex-col gap-5">
              <p className="max-w-md text-lg leading-relaxed text-[#999]">
                Choose your preferences — dietary needs, portion sizes, how many
                dinners you cook — and Kostpilot generates a complete 7-day plan
                built around that week&rsquo;s best offers.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Personalised to your taste preferences",
                  "Covers breakfast, lunch, and dinner",
                  "Swap any meal with a single tap",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#e84c1e]/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#e84c1e]" />
                    </span>
                    <span className="text-[15px] leading-snug text-[#999]">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
