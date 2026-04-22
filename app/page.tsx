import PageTransition from "@/components/ui/PageTransition";
import CallToAction from "@/components/sections/CallToAction";
import Hero from "@/components/sections/Hero";
import Industries from "@/components/sections/Industries";
import Services from "@/components/sections/Services";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <Services />
      <Industries />
      <CallToAction />
    </PageTransition>
  );
}