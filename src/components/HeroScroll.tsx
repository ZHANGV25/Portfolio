"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  {
    num: "01",
    label: "ORIGIN",
    tag: "WELCOME",
    title: "BUILDING THE\nFUTURE",
    subtitle: "Physics & AI at Carnegie Mellon University",
    cta: "EXPLORE",
  },
  {
    num: "02",
    label: "VENTURES",
    tag: "STARTUPS",
    title: "FROM IDEA\nTO IMPACT",
    subtitle: "Founded 3 startups. Shipped products. Got users.",
  },
  {
    num: "03",
    label: "ENGINEERING",
    tag: "ROBOTICS & ROCKETS",
    title: "PRECISION\nENGINEERED",
    subtitle: "5-DOF robot arms. Sounding rockets. FRC lead programmer.",
  },
  {
    num: "04",
    label: "CRAFT",
    tag: "HANDS ON",
    title: "BUILT BY\nHAND",
    subtitle: "Modding an Audi S5. Flipping cars. Getting dirty.",
  },
  {
    num: "05",
    label: "CONNECT",
    tag: "WHAT'S NEXT",
    title: "LET'S BUILD\nSOMETHING",
    subtitle: "",
    cta: "GET IN TOUCH",
  },
];

interface HeroScrollProps {
  onProgress: (progress: number) => void;
  onTheme: (theme: "dark" | "light") => void;
}

export default function HeroScroll({ onProgress, onTheme }: HeroScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollHeight = containerRef.current.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollHeight));
      
      onProgress(progress);
      
      const sectionIndex = Math.min(Math.floor(progress * sections.length), sections.length - 1);
      const sectionProg = (progress * sections.length) % 1;
      setActiveIndex(sectionIndex);
      setSectionProgress(sectionProg);
      setIsVisible(progress < 0.98);

      // Theme: sections 0,1 = dark, 2 = light, 3,4 = dark
      if (progress < 0.3) onTheme("dark");
      else if (progress < 0.55) onTheme("light");
      else onTheme("dark");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onProgress, onTheme]);

  const active = sections[activeIndex];

  return (
    <div ref={containerRef} style={{ height: "500vh" }} className="relative">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        
        {/* Corner crosshairs */}
        {isVisible && (
          <>
            <div className="crosshair absolute top-8 right-8 transition-opacity duration-500" style={{ opacity: isVisible ? 0.3 : 0, transform: `rotate(${sectionProgress * 90}deg)` }} />
            <div className="crosshair absolute bottom-8 right-8 transition-opacity duration-500" style={{ opacity: isVisible ? 0.3 : 0, transform: `rotate(${-sectionProgress * 90}deg)` }} />
            <div className="crosshair absolute bottom-8 left-8 transition-opacity duration-500" style={{ opacity: isVisible ? 0.3 : 0, transform: `rotate(${sectionProgress * 45}deg)` }} />
          </>
        )}

        {/* Left sidebar */}
        {isVisible && (
          <div className="absolute left-8 top-24 bottom-24 flex flex-col z-20 transition-opacity duration-700" style={{ opacity: isVisible ? 1 : 0 }}>
            <div className="crosshair mb-4" style={{ opacity: 0.4 }} />
            
            {sections.map((s, i) => (
              <div key={i} className="flex items-start gap-3 mb-2">
                <div className="flex flex-col items-center">
                  <div
                    className="w-[1px] transition-all duration-500"
                    style={{
                      height: i === activeIndex ? "40px" : "20px",
                      background: i === activeIndex ? "currentColor" : "rgba(255,255,255,0.15)",
                    }}
                  />
                </div>
                <div
                  className="transition-all duration-500"
                  style={{
                    opacity: i === activeIndex ? 1 : 0.3,
                    transform: `translateX(${i === activeIndex ? 0 : -4}px)`,
                  }}
                >
                  <div className="text-[10px] opacity-50 font-mono">{s.num}</div>
                  <div className="text-[11px] font-semibold tracking-[0.15em] uppercase">{s.label}</div>
                </div>
              </div>
            ))}
            
            <div className="flex-1 w-[1px] bg-current opacity-10 ml-0" />
          </div>
        )}

        {/* Main content */}
        <div className="absolute inset-0 flex items-center justify-center z-10 px-8">
          <div className="max-w-5xl w-full">
            {/* Tag */}
            <div className="section-label mb-6 transition-all duration-500" key={`tag-${activeIndex}`}>
              {active.tag}
            </div>

            {/* Title */}
            <h1 className="hero-title mb-8 transition-all duration-700" key={`title-${activeIndex}`}>
              {active.title.split("\n").map((line, i) => (
                <span key={i} className="block" style={{ 
                  animationDelay: `${i * 0.1}s`,
                  opacity: 1,
                }}>
                  {line}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            {active.subtitle && (
              <p className="hero-subtitle mb-10 transition-all duration-500" key={`sub-${activeIndex}`}>
                {active.subtitle}
              </p>
            )}

            {/* CTA */}
            {active.cta && (
              <a href="#projects" className="cta-btn" key={`cta-${activeIndex}`}>
                <span className="crosshair" style={{ width: 14, height: 14, opacity: 0.5 }} />
                {active.cta}
              </a>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        {activeIndex === 0 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-40">
            <span className="text-[10px] tracking-[0.3em] uppercase">Explore the void</span>
            <span className="text-lg">↓</span>
          </div>
        )}
      </div>
    </div>
  );
}
