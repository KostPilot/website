import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import ProductStorySection from "@/components/sections/ProductStorySection";
import DealsSection from "@/components/sections/DealsSection";
import MealPlanSection from "@/components/sections/MealPlanSection";
import GroceryListSection from "@/components/sections/GroceryListSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import FinalCTASection from "@/components/sections/FinalCTASection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f5f0] text-[#111]">
      <Navbar />
      <main>
        <Hero />
        <ProductStorySection />
        <DealsSection />
        <MealPlanSection />
        <GroceryListSection />
        <HowItWorksSection />
        <BenefitsSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
