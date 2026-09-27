import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import Showcase from "@/components/site/Showcase";
import { Footer, HowItWorks, Waitlist } from "@/components/site/Closing";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Showcase />
        <HowItWorks />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
