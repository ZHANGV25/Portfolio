"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroScroll from "@/components/HeroScroll";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const handleProgress = useCallback((p: number) => setScrollProgress(p), []);
  const handleTheme = useCallback((t: "dark" | "light") => setTheme(t), []);

  const isDark = theme === "dark";
  const bgColor = isDark ? "#050505" : "#e4e4e7";

  return (
    <>
      {/* Background that covers entire page and transitions */}
      <div style={{
        position: "fixed",
        inset: 0,
        background: bgColor,
        transition: "background 0.8s ease",
        zIndex: 0,
      }} />

      <Navbar theme={theme} />

      {!isMobile && <Scene3D scrollProgress={scrollProgress} mousePos={mousePos} />}

      {/* All content above the fixed bg */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <HeroScroll onProgress={handleProgress} onTheme={handleTheme} />

        {/* Content sections - light theme */}
        <div style={{
          background: "#f0f0f0",
          color: "#09090b",
        }}>
          <Projects />
          <Experience />
          <Contact />
        </div>
      </div>
    </>
  );
}
