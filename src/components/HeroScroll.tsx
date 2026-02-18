"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  {
    num: "01",
    label: "ORIGIN",
    tag: "WELCOME",
    title: ["BUILDING THE", "FUTURE"],
    subtitle: "Physics & AI at Carnegie Mellon University",
    cta: "EXPLORE",
    ctaHref: "#projects",
  },
  {
    num: "02",
    label: "VENTURES",
    tag: "STARTUPS",
    title: ["FROM IDEA", "TO IMPACT"],
    subtitle: "Founded 3 startups. Shipped products. Got users.",
  },
  {
    num: "03",
    label: "ENGINEERING",
    tag: "ROBOTICS & ROCKETS",
    title: ["PRECISION", "ENGINEERED"],
    subtitle: "5-DOF robot arms. Sounding rockets. FRC lead programmer.",
  },
  {
    num: "04",
    label: "CRAFT",
    tag: "HANDS ON",
    title: ["BUILT BY", "HAND"],
    subtitle: "Modding an Audi S5. Flipping cars. Getting dirty.",
  },
  {
    num: "05",
    label: "CONNECT",
    tag: "WHAT'S NEXT",
    title: ["LET'S BUILD", "SOMETHING"],
    subtitle: "",
    cta: "GET IN TOUCH",
    ctaHref: "#contact",
  },
];

interface HeroScrollProps {
  onProgress: (progress: number) => void;
  onTheme: (theme: "dark" | "light") => void;
}

export default function HeroScroll({ onProgress, onTheme }: HeroScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sidebarOpacity, setSidebarOpacity] = useState(1);
  const [contentOpacity, setContentOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollHeight = containerRef.current.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollHeight));

      onProgress(progress);

      const idx = Math.min(Math.floor(progress * sections.length), sections.length - 1);
      setActiveIndex(idx);

      // Fade sidebar near end
      setSidebarOpacity(progress < 0.85 ? 1 : Math.max(0, (1 - progress) / 0.15));

      // Fade content between sections
      const sectionProg = (progress * sections.length) % 1;
      if (sectionProg < 0.1) setContentOpacity(sectionProg / 0.1);
      else if (sectionProg > 0.85) setContentOpacity((1 - sectionProg) / 0.15);
      else setContentOpacity(1);

      // Theme: match to section index not progress for consistency
      // Sections 0,1 = dark, section 2 = light, sections 3,4 = dark
      if (idx <= 1) onTheme("dark");
      else if (idx === 2) onTheme("light");
      else onTheme("dark");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onProgress, onTheme]);

  const active = sections[activeIndex];
  // Text color must match background theme exactly
  const isDark = activeIndex !== 2;
  const textColor = isDark ? "#ffffff" : "#09090b";
  const mutedColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
  const borderColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";

  return (
    <div ref={containerRef} style={{ height: "500vh", position: "relative" }}>
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        overflow: "hidden",
        transition: "color 0.6s ease",
        color: textColor,
      }}>

        {/* Corner crosshairs */}
        {[
          { top: 32, right: 32, left: "auto", bottom: "auto" },
          { bottom: 32, right: 32, top: "auto", left: "auto" },
          { bottom: 32, left: 32, top: "auto", right: "auto" },
        ].map((pos, i) => (
          <div key={i} style={{
            position: "absolute",
            ...pos,
            width: 20,
            height: 20,
            opacity: sidebarOpacity * 0.3,
            transition: "opacity 0.5s",
            zIndex: 20,
          }}>
            <div style={{
              position: "absolute",
              width: 1,
              height: "100%",
              left: "50%",
              background: "currentColor",
            }} />
            <div style={{
              position: "absolute",
              height: 1,
              width: "100%",
              top: "50%",
              background: "currentColor",
            }} />
          </div>
        ))}

        {/* Left sidebar */}
        <div style={{
          position: "absolute",
          left: 32,
          top: 100,
          bottom: 100,
          display: "flex",
          flexDirection: "column",
          zIndex: 20,
          opacity: sidebarOpacity,
          transition: "opacity 0.7s",
        }}>
          {/* Top crosshair */}
          <div style={{ width: 16, height: 16, marginBottom: 24, position: "relative" }}>
            <div style={{ position: "absolute", width: 1, height: "100%", left: "50%", background: "currentColor", opacity: 0.4 }} />
            <div style={{ position: "absolute", height: 1, width: "100%", top: "50%", background: "currentColor", opacity: 0.4 }} />
          </div>

          {sections.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
              <div style={{
                width: 1,
                height: i === activeIndex ? 44 : 22,
                background: i === activeIndex ? "currentColor" : mutedColor,
                transition: "all 0.5s",
                flexShrink: 0,
              }} />
              <div style={{
                opacity: i === activeIndex ? 1 : 0.25,
                transform: `translateX(${i === activeIndex ? 0 : -4}px)`,
                transition: "all 0.5s",
              }}>
                <div style={{ fontSize: 10, opacity: 0.5, fontFamily: "monospace" }}>{s.num}</div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" as const }}>{s.label}</div>
              </div>
            </div>
          ))}

          <div style={{ flex: 1, width: 1, background: "currentColor", opacity: 0.08 }} />
        </div>

        {/* Main content */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          padding: "0 32px",
          opacity: contentOpacity,
          transition: "opacity 0.3s ease",
        }}>
          <div style={{ maxWidth: 900, width: "100%" }}>
            {/* Tag */}
            <div style={{
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase" as const,
              opacity: 0.5,
              marginBottom: 24,
            }}>
              {active.tag}
            </div>

            {/* Title */}
            <div style={{ marginBottom: 32 }}>
              {active.title.map((line, i) => (
                <div key={`${activeIndex}-${i}`} style={{
                  fontSize: "clamp(3rem, 10vw, 9rem)",
                  fontWeight: 700,
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                  textTransform: "uppercase" as const,
                }}>
                  {line}
                </div>
              ))}
            </div>

            {/* Subtitle */}
            {active.subtitle && (
              <p style={{
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                fontWeight: 300,
                opacity: 0.5,
                maxWidth: 500,
                lineHeight: 1.6,
                marginBottom: 40,
              }}>
                {active.subtitle}
              </p>
            )}

            {/* CTA */}
            {active.cta && (
              <a href={active.ctaHref} style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "16px 32px",
                border: `1px solid ${borderColor}`,
                fontSize: 12,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                fontWeight: 500,
                textDecoration: "none",
                color: "inherit",
                transition: "all 0.3s",
              }}>
                {active.cta}
              </a>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        {activeIndex === 0 && (
          <div style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            opacity: 0.3,
          }}>
            <span style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase" as const }}>Scroll to explore</span>
            <span style={{ fontSize: 18 }}>↓</span>
          </div>
        )}
      </div>
    </div>
  );
}
