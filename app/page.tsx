import PageTransition from "@/components/ui/PageTransition";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Industries from "@/components/sections/Industries";
import Stats from "@/components/sections/Stats";
import Process from "@/components/sections/Process";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import CallToAction from "@/components/sections/CallToAction";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <PageTransition>
      <>
        <Hero />
        <Stats />
        <Services />
        <Process />
        <Industries />
        <WhyChooseUs />
        <CallToAction />
        <FinalCTA />
      </>
    </PageTransition>
  );
}