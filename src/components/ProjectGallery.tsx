"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Code, Rocket, Car, ExternalLink, Github } from "lucide-react";

const categories = [
  { id: "all", label: "All Projects" },
  { id: "robotics", label: "Robotics", icon: Cpu },
  { id: "software", label: "Software", icon: Code },
  { id: "aerospace", label: "Rocketry", icon: Rocket },
  { id: "automotive", label: "Cars", icon: Car },
];

const projects = [
  {
    id: 1,
    title: "Autonomous Swarm Robots",
    category: "robotics",
    description: "Multi-agent systems using decentralized control for cooperative tasks. Implemented at CMU RI.",
    tags: ["ROS2", "Python", "CAD"],
    link: "#",
    github: "#"
  },
  {
    id: 2,
    title: "High-Altitude Sounding Rocket",
    category: "aerospace",
    description: "Designed carbon-fiber airframe and recovery system for a class-M solid motor project.",
    tags: ["Aerospace", "Composite Materials", "MATLAB"],
    link: "#"
  },
  {
    id: 3,
    title: "Portfolio 2026",
    category: "software",
    description: "High-performance interactive portfolio built with Next.js, Three.js, and Framer Motion.",
    tags: ["Next.js", "Three.js", "Tailwind"],
    github: "#"
  },
  {
    id: 4,
    title: "EV Conversion Telemetry",
    category: "automotive",
    description: "Real-time CAN bus data visualization for a classic car electric conversion project.",
    tags: ["C++", "Embedded", "CAN bus"],
    link: "#"
  },
  {
    id: 5,
    title: "Bipedal Balance Controller",
    category: "robotics",
    description: "Reinforcement learning based controller for maintaining stability in dynamic environments.",
    tags: ["PyTorch", "Simulation", "Robotics"],
    github: "#"
  },
  {
    id: 6,
    title: "CFD Wing Optimization",
    category: "aerospace",
    description: "Simulating and optimizing airfoil geometries for low-Reynolds number flight.",
    tags: ["OpenFOAM", "Fluid Dynamics", "Python"],
    link: "#"
  }
];

export default function ProjectGallery() {
  const [filter, setFilter] = useState("all");

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
      >
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Technical <span className="text-zinc-500">_</span> Portfolio
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl">
            A selection of projects spanning interdisciplinary engineering and creative technology.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all border ${
                  filter === cat.id 
                  ? "bg-white text-zinc-950 border-white shadow-lg shadow-white/10 scale-105" 
                  : "bg-white/5 text-zinc-400 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                {Icon && <Icon size={16} />}
                {cat.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group relative flex flex-col justify-between p-8 rounded-[2rem] bg-zinc-900/40 border border-white/5 overflow-hidden hover:bg-zinc-900/60 hover:border-white/10 transition-colors"
            >
              {/* Card content */}
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-zinc-400 group-hover:text-white transition-colors">
                    {project.category === 'robotics' && <Cpu size={24} />}
                    {project.category === 'software' && <Code size={24} />}
                    {project.category === 'aerospace' && <Rocket size={24} />}
                    {project.category === 'automotive' && <Car size={24} />}
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <a href={project.github} className="p-2 text-zinc-500 hover:text-white transition-colors">
                        <Github size={20} />
                      </a>
                    )}
                    {project.link && (
                      <a href={project.link} className="p-2 text-zinc-500 hover:text-white transition-colors">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="space-y-3 font-sans">
                    <h3 className="text-2xl font-semibold text-white group-hover:text-zinc-200 transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed font-light">
                        {project.description}
                    </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-8">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-[10px] font-medium tracking-wider uppercase bg-white/5 text-zinc-500 rounded-lg border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Decorative hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
