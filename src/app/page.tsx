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
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  const bgColor = theme === "dark" ? "#000000" : "#f0f0f0";
  const fgColor = theme === "dark" ? "#ffffff" : "#09090b";

  return (
    <main
      className="relative min-h-screen theme-wrapper"
      style={{
        backgroundColor: bgColor,
        color: fgColor,
        ["--bg" as string]: bgColor,
        ["--fg" as string]: fgColor,
      }}
    >
      <Navbar theme={theme} />

      {/* 3D Scene */}
      {!isMobile && <Scene3D scrollProgress={scrollProgress} mousePos={mousePos} />}

      {/* Hero scroll section */}
      <HeroScroll onProgress={handleProgress} onTheme={handleTheme} />

      {/* Normal content after hero */}
      <div style={{ background: "#000", color: "#fff" }}>
        <Projects />
        <Experience />
        <Contact />
      </div>
    </main>
  );
}
