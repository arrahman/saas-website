import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Integrations from './components/Integrations';
import Products from './components/Products';
import HowItWorks from './components/HowItWorks';
import Solutions from './components/Solutions';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Integrations />
        <Products />
        <HowItWorks />
        <Solutions />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
