import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import Showcase from "@/components/site/Showcase";
import { Footer, MeetTheTeam, Waitlist } from "@/components/site/Closing";
import HowItWorks from "@/components/site/HowItWorks";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Showcase />
        <HowItWorks />
        <MeetTheTeam />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
