"use client";


import ProjectGallery from "@/components/ProjectGallery";
import AboutSection from "@/components/AboutSection";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import GlassCursor from "@/components/GlassCursor";
import Plasma from "@/components/Plasma";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full font-sans antialiased text-white bg-zinc-950 cursor-none">
      
      {/* Background Layer - Plasma */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <Plasma
            color="#c2b3d1"
            speed={0.6}
            direction="forward"
            scale={1}
            opacity={0.15}
            color="#c2b3d1"
          speed={0.6}
          direction="forward"
          scale={1}
          opacity={0.15}
          mouseInteractive
        />
      </div>

      {/* Glass Cursor - Top Layer */}
      <GlassCursor />

      {/* Content Layer */}
      <div className="relative z-10">



      {/* Overlay Gradient */}


      {/* Hero Section */}
      <section className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6">
        <div className="max-w-4xl w-full text-center space-y-10 bg-white/[0.02] p-10 md:p-16 rounded-[2.5rem] border border-white/5 shadow-[0_0_100px_-20px_rgba(255,255,255,0.05)] transition-all hover:bg-white/[0.05] hover:border-white/10 group">
          
          <header className="space-y-6 select-none">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 font-medium tracking-[0.2em] uppercase text-[10px]">
              Carnegie Mellon University
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter transition-all group-hover:tracking-tight">
              Victor Zhang <span className="text-zinc-600 transition-colors group-hover:text-zinc-400">_</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
              Mechanical Engineering & Robotics.
              <span className="block mt-2 text-zinc-500 font-normal">
                Designing the intersection of hardware, AI, and aesthetics.
              </span>
            </p>
          </header>

          <footer className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <a 
              href="#projects"
              className="w-full sm:w-auto px-10 py-4 bg-white text-zinc-950 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_-15px_rgba(255,255,255,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(255,255,255,0.4)] text-center"
            >
              Explore Projects
            </a>
            <button className="w-full sm:w-auto px-10 py-4 bg-white/5 text-white rounded-2xl font-bold border border-white/10 transition-all hover:bg-white/10 hover:border-white/20 active:scale-95">
              Get in Touch
            </button>
          </footer>
        </div>


      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-20 min-h-screen bg-zinc-950/10 border-t border-white/5">
        <ProjectGallery />
      </section>

      {/* About Section */}
      <section id="about" className="relative z-20 bg-zinc-950/30 border-t border-white/5">
        <AboutSection />
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="relative z-20 bg-zinc-950/10 border-t border-white/5">
        <Timeline />
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-20 bg-zinc-950/30 border-t border-white/5">
        <Contact />
      </section>

      {/* Footnote */}
      <footer className="relative z-20 pb-16 pt-8 border-t border-white/5 flex justify-center items-center gap-8 text-[10px] tracking-widest uppercase text-zinc-600 font-medium">
        <span>Rocketry</span>
        <span className="w-1 h-1 rounded-full bg-zinc-800" />
        <span>Automotive</span>
        <span className="w-1 h-1 rounded-full bg-zinc-800" />
        <span>Software</span>
      </footer>
      </div>
    </main>
  );
}
