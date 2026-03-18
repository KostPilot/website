import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import CTA from "@/components/sections/CTA";
import DealFlow from "@/components/sections/DealFlow";
import GroceryList from "@/components/sections/GroceryList";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import MealPlan from "@/components/sections/MealPlan";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <DealFlow />
        <MealPlan />
        <GroceryList />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
