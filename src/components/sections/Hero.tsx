import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
      <div className="space-y-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Kostpilot
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Planlaeg maaltider hurtigere og spar penge paa indkoeb.
        </h1>
        <p className="max-w-xl text-lg text-slate-600">
          En enkel platform til meal planning, indkoebslister og ugentligt overblik.
        </p>
        <div className="flex gap-3">
          <Button>Kom i gang</Button>
          <Button variant="ghost">Se demo</Button>
        </div>
      </div>
      <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-8 text-slate-500">
        Hero placeholder
      </div>
    </section>
  );
}
