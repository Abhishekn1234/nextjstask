"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import Navbar from "./components/Navbar";
import HeroSection from "./components/Herosection";
import ContentSection from "./components/Contentsection";
import Testimonials from "./components/Testimonal";
import Footer from "./Footer";
import FAQAccordion from "./Faqaccordion";

import { LandingContent } from "./types/content";
import LogoCloud from "./components/Heroafter";
import HealthHero from "./HealthHero";

export default function Home() {
  const [content, setContent] = useState<LandingContent | null>(null);


  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then(setContent)
      .catch(() => setContent(null));
  }, []);


  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [logoRef, logoInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [testimonialRef, testimonialInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [faqRef, faqInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [healthRef, healthInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  if (!content) {
    return (
      <p className="text-center mt-24 text-gray-500 text-lg">
        No content available
      </p>
    );
  }


  const scrollInClass = (inView: boolean) =>
    inView
      ? "opacity-100 translate-y-0 transition-all duration-1000 ease-out"
      : "opacity-0 translate-y-5 transition-all duration-1000 ease-out";

  return (
    <>
      <Navbar />

      <div id="hero" ref={heroRef} className={scrollInClass(heroInView)}>
        <HeroSection hero={content.hero} />
      </div>

      
      <div id="logo" ref={logoRef} className={scrollInClass(logoInView)}>
        <LogoCloud />
      </div>

      <div id="about" ref={aboutRef} className={scrollInClass(aboutInView)}>
        <ContentSection title={content.about.heading}>
          <h3 className="text-2xl font-semibold text-center mt-4">
            Smart Nutrition Planning
          </h3>
          <p className="max-w-3xl mx-auto text-gray-600 text-base leading-relaxed mt-2 text-center">
            {content.about.paragraph}
          </p>
        </ContentSection>
      </div>

    
      <div id="testimonials" ref={testimonialRef} className={scrollInClass(testimonialInView)}>
        <Testimonials testimonials={content.testimonials} />
      </div>

      
      {content.faq.length > 0 && (
        <div id="faq" ref={faqRef} className={`mt-20 ${scrollInClass(faqInView)}`}>
          <FAQAccordion faqs={content.faq} />
        </div>
      )}


      <div id="health" ref={healthRef} className={scrollInClass(healthInView)}>
        <HealthHero />
      </div>

      <Footer scrollToSection={scrollToSection} />
    </>
  );
}
