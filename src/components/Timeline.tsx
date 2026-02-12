"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Star } from "lucide-react";

const timelineData = [
  {
    date: "2024 - Present",
    title: "Undergraduate Researcher",
    subtitle: "Carnegie Mellon Robotics Institute",
    description: "Developing decentralized control frameworks for multi-robot systems. Focusing on swarm intelligence and robust communication.",
    icon: Star,
    type: "work"
  },
  {
    date: "2023 - 2027",
    title: "B.S. Mechanical Engineering",
    subtitle: "Carnegie Mellon University",
    description: "Concentration in Robotics and Control Systems. Active member of CMU Rocket Command and Robotics Club.",
    icon: GraduationCap,
    type: "edu"
  },
  {
    date: "2024 (Summer)",
    title: "Engineering Intern",
    subtitle: "Aerospace Dynamics Lab",
    description: "Conducted CFD simulations and wind tunnel testing for high-altitude prototype airfoils. Optimized drag coefficients by 12%.",
    icon: Briefcase,
    type: "work"
  },
  {
    date: "2022 - 2023",
    title: "Lead Design Engineer",
    subtitle: "High School Robotics Team",
    description: "Led a team of 15 students in design and fabrication of a competitive 120lb robot. Reached regional finals.",
    icon: Briefcase,
    type: "work"
  }
];

export default function Timeline() {
  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          Journey <span className="text-zinc-500">_</span> Timeline
        </h2>
        <p className="text-zinc-400 text-lg">A chronological view of my academic and professional milestones.</p>
      </div>

      <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-800 before:to-transparent">
        
        {timelineData.map((item, index) => (
          <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            
            {/* Icon circle */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-zinc-950 text-zinc-400 group-hover:text-white group-hover:border-white/20 transition-all z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              <item.icon size={18} />
            </div>

            {/* Content card */}
            <motion.div 
              initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-[calc(100%-4rem)] md:w-[45%] p-6 rounded-3xl bg-white/5 border border-white/5 space-y-2 group-hover:bg-white/[0.08] group-hover:border-white/10 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                <time className="text-zinc-500 font-mono text-xs uppercase tracking-widest">{item.date}</time>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                  item.type === 'work' ? 'border-zinc-700 text-zinc-400' : 'border-white/10 text-zinc-500'
                }`}>
                  {item.type === 'work' ? 'EXPERIENCE' : 'EDUCATION'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">{item.title}</h3>
              <p className="text-zinc-400 font-medium text-sm">{item.subtitle}</p>
              <p className="text-zinc-500 text-sm font-light leading-relaxed pt-2">
                {item.description}
              </p>
            </motion.div>
          </div>
        ))}

      </div>
    </section>
  );
}
