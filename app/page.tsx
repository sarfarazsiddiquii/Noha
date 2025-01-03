import LandingPageHeader from "./components/landing-page-header";
import Hero from "./components/hero";
import Features from "./components/features";
import About from "./components/about";
import UseCases from "./components/use-cases";

export default function HomePage() {
  return (
    <div suppressHydrationWarning>
      <LandingPageHeader />
      <Hero />
      <Features />
      <About />
      <UseCases />
    </div>
  );
}
