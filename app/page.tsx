import Header from "./components/Header";
import Hero from "./components/Hero";
import Plans from "./components/Plans";
import Scheduled from "./components/Scheduled";
import TvSection from "./components/TvSection";
import Offers from "./components/Offers";
import AppSection from "./components/AppSection";
import RechargeOptions from "./components/RechargeOptions";
import Footer from "./components/Footer";
import ScrollReveal from "./components/ScrollReveal";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Plans />
      <ScrollReveal>
        <Scheduled />
      </ScrollReveal>
      <ScrollReveal>
        <TvSection />
      </ScrollReveal>
      <ScrollReveal>
        <Offers />
      </ScrollReveal>
      <ScrollReveal>
        <AppSection />
      </ScrollReveal>
      <ScrollReveal>
        <RechargeOptions />
      </ScrollReveal>
      <Footer />
    </main>
  );
}
