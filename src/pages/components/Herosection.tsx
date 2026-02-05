"use client";

import { useEffect, useRef, useState } from "react";
import { FloatingCard } from "../FloatingCard";
import { LandingContent } from "../types/content";

export default function HeroSection({ hero }: { hero: LandingContent["hero"] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    // Import GSAP and ScrollTrigger inside useEffect
    let gsap: any;
    let ScrollTrigger: any;
    (async () => {
      const gsapModule = await import("gsap");
      gsap = gsapModule.gsap;
      const stModule = await import("gsap/ScrollTrigger");
      ScrollTrigger = stModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.from(".hero-animate", {
          opacity: 0,
          y: 20,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        });

        if (phoneRef.current) tl.from(phoneRef.current, { y: 50, opacity: 0, duration: 1 });

        if (!isMobile) {
          if (leftCardRef.current)
            tl.from(leftCardRef.current, { x: -50, opacity: 0, duration: 0.8, ease: "back.out(1.2)" }, "-=0.6");
          if (rightCardRef.current)
            tl.from(rightCardRef.current, { x: 50, opacity: 0, duration: 0.8, ease: "back.out(1.2)" }, "-=0.6");
        }
      }, sectionRef);

      return () => ctx.revert();
    })();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className={`min-h-screen flex flex-col items-center overflow-hidden font-inter
        ${isMobile ? "px-4 pt-16 pb-24 bg-gradient-to-b from-white to-blue-50" : "px-8 sm:px-10 lg:px-20 pt-24 pb-40 bg-gradient-to-b from-white to-blue-50"}`}
    >
      <div ref={phoneRef} className="relative flex flex-col items-center w-full max-w-xs mb-40 sm:mb-52">
        {!isMobile && (
          <>
            <div ref={leftCardRef} className="absolute -left-36 top-10">
              <FloatingCard title="Day Off" value="20 OUT OF 40" type="chart" />
            </div>
            <div ref={rightCardRef} className="absolute -right-36 top-10">
              <FloatingCard title="Work Hour Analysis" value="45 Hours - 45 Mins" type="graph" />
            </div>
          </>
        )}
        {isMobile && (
          <div className="flex flex-col gap-4 mt-8 w-full items-center">
            <FloatingCard title="Day Off" value="20 OUT OF 40" type="chart" className="relative" />
            <FloatingCard title="Work Hour Analysis" value="45 Hours - 45 Mins" type="graph" className="relative" />
          </div>
        )}
      </div>

      <div className="text-center max-w-xl mx-auto px-2 sm:px-0">
        <h1 className="hero-animate font-extrabold text-gray-900 leading-tight mb-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          {hero.title}
        </h1>
        <p className="hero-animate text-gray-500 mb-8 text-base sm:text-lg md:text-xl">
          {hero.subtitle}
        </p>

        <div className="hero-animate flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-6 py-3 rounded-full bg-gray-200 text-black font-semibold hover:bg-gray-300 transition-colors duration-300 w-full sm:w-auto">
             App Store
          </button>
          <button className="px-6 py-3 rounded-full bg-gray-200 text-black font-semibold hover:bg-gray-300 transition-colors duration-300 w-full sm:w-auto">
            ▶ Google Play
          </button>
        </div>
      </div>
    </section>
  );
}
