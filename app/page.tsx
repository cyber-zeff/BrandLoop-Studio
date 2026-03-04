"use client"

import ContactSection from "./components/Contact";
import FaqSection from "./components/FAQ";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PraiseSection from "./components/Praise";
import RatesSection from "./components/Rates";
import WorkSection from "./components/Work";

export default function Home() {
  return (
    <>
      <Navbar />
      <WorkSection />
      <RatesSection />
      <PraiseSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </>
  );
}
