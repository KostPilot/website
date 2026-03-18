import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-emerald-600 p-8 text-white">
        <h2 className="text-2xl font-bold">Klar til at forenkle madplanen?</h2>
        <p className="mt-3 text-emerald-100">Placeholder til signup-tekst og value proposition.</p>
        <Button className="mt-6 bg-white text-emerald-700 hover:bg-emerald-50">
          Opret gratis konto
        </Button>
      </div>
    </section>
  );
}
