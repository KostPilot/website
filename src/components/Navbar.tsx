export default function Navbar() {
  return (
    <header className="border-b border-emerald-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <span className="text-lg font-bold text-emerald-700">Kostpilot</span>
        <nav className="hidden gap-6 text-sm font-medium text-slate-600 sm:flex">
          <a href="#deal-flow" className="hover:text-emerald-700">
            Deal flow
          </a>
          <a href="#meal-plan" className="hover:text-emerald-700">
            Meal plan
          </a>
          <a href="#grocery-list" className="hover:text-emerald-700">
            Grocery list
          </a>
        </nav>
      </div>
    </header>
  );
}
