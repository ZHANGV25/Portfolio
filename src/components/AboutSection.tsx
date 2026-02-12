"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Award, Zap, Cpu, Code } from "lucide-react";

const skills = [
  { category: "MechE & Robotics", items: ["SolidWorks", "MATLAB", "ROS2", "Control Systems", "Mechatronics"] },
  { category: "Software & AI", items: ["Python", "C++", "React/Next.js", "Computer Vision", "PyTorch"] },
  { category: "Hands-on", items: ["3D Printing", "CNC Machining", "Composite Layup", "Vehicle Dynamics"] },
];

export default function AboutSection() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto space-y-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left: Bio & Education */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-10"
        >
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              About <span className="text-zinc-500">_</span> Me
            </h2>
            <div className="w-20 h-1 bg-white/10 rounded-full" />
          </div>

          <div className="prose prose-invert prose-zinc text-zinc-400 max-w-none text-lg leading-relaxed font-light space-y-6">
            <p>
              I am a Mechanical Engineering and Robotics student at <span className="text-white font-medium">Carnegie Mellon University</span>, 
              driven by the challenge of bridging the gap between sophisticated software and robust physical systems.
            </p>
            <p>
              My journey started with a fascination for the mechanics of high-speed vehicles and evolved into a deep involvement in 
              <span className="text-zinc-300"> rocketry</span>, <span className="text-zinc-300">automotive design</span>, and 
              <span className="text-zinc-300"> autonomous systems</span>. Whether I'm optimizing an airfoil in CFD or 
              programming a swarm of robots, I focus on performance, scalability, and elegant design.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-6 rounded-3xl bg-white/5 border border-white/10 transition-colors hover:border-white/20">
              <div className="p-3 rounded-2xl bg-white/5 text-zinc-400">
                <GraduationCap size={24} />
              </div>
              <div>
                <h4 className="text-white font-semibold">B.S. Mechanical Engineering & Robotics</h4>
                <p className="text-zinc-500 text-sm">Carnegie Mellon University • Graduation 2027</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 rounded-3xl bg-white/5 border border-white/10 transition-colors hover:border-white/20">
              <div className="p-3 rounded-2xl bg-white/5 text-zinc-400">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-white font-semibold">Pittsburgh, PA</h4>
                <p className="text-zinc-500 text-sm">Working from the heart of the Robotics Row</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Skill Matrix */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative p-10 rounded-[2.5rem] bg-zinc-900/40 border border-white/5"
        >
          <div className="space-y-12">
            <div className="flex items-center gap-3">
              <Zap className="text-white" size={24} />
              <h3 className="text-2xl font-semibold text-white">Skill Matrix</h3>
            </div>

            <div className="grid grid-cols-1 gap-10">
              {skills.map((group, idx) => (
                <div key={idx} className="space-y-4">
                  <h4 className="text-zinc-500 uppercase tracking-widest text-xs font-bold">{group.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-zinc-300 text-sm font-medium transition-colors hover:bg-white/[0.07] hover:border-white/20"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Subtle background detail */}
            <div className="absolute top-0 right-0 -z-10 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.05),transparent)] rounded-[2.5rem]" />
          </div>
        </motion.div>
      </div>

      {/* Experience Sneak Peek */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-4">
          <Award className="text-zinc-500" size={32} />
          <p className="text-zinc-400 text-sm">Multiple awards in regional robotics competitions and collegiate rocketry challenges.</p>
        </div>
        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-4">
          <Cpu className="text-zinc-500" size={32} />
          <p className="text-zinc-400 text-sm">Experience in full-stack hardware development, from PCB design to high-level control code.</p>
        </div>
        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-4">
          <Code className="text-zinc-500" size={32} />
          <p className="text-zinc-400 text-sm">Strong foundation in computational methods and simulation-heavy engineering projects.</p>
        </div>
      </motion.div>
    </section>
  );
}
