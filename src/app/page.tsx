import CTA from "@/components/CTA";
import DealFlow from "@/components/DealFlow";
import GroceryList from "@/components/GroceryList";
import Hero from "@/components/Hero";
import MealPlan from "@/components/MealPlan";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <DealFlow />
        <MealPlan />
        <GroceryList />
        <CTA />
      </main>
    </div>
  );
}
