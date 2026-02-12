"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 max-w-4xl mx-auto text-center space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          Let's <span className="text-zinc-500">_</span> Connect
        </h2>
        <p className="text-zinc-400 text-lg font-light">
          Whether it's a robotics project, a collaboration, or just to talk tech, my inbox is always open.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
      >
        <a 
          href="mailto:contact@example.com"
          className="group flex flex-col items-center gap-4 p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/[0.08] hover:border-white/10 transition-all"
        >
          <div className="p-4 rounded-2xl bg-white/5 text-zinc-400 group-hover:text-white group-hover:bg-white/10 transition-all">
            <Mail size={32} />
          </div>
          <div>
            <span className="block text-white font-semibold">Email</span>
            <span className="text-zinc-500 text-xs uppercase tracking-widest">Send a Message</span>
          </div>
        </a>

        <a 
          href="https://linkedin.com"
          target="_blank"
          className="group flex flex-col items-center gap-4 p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/[0.08] hover:border-white/10 transition-all"
        >
          <div className="p-4 rounded-2xl bg-white/5 text-zinc-400 group-hover:text-white group-hover:bg-white/10 transition-all">
            <Linkedin size={32} />
          </div>
          <div>
            <span className="block text-white font-semibold">LinkedIn</span>
            <span className="text-zinc-500 text-xs uppercase tracking-widest">Connect Professionaly</span>
          </div>
        </a>

        <a 
          href="https://github.com"
          target="_blank"
          className="group flex flex-col items-center gap-4 p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/[0.08] hover:border-white/10 transition-all"
        >
          <div className="p-4 rounded-2xl bg-white/5 text-zinc-400 group-hover:text-white group-hover:bg-white/10 transition-all">
            <Github size={32} />
          </div>
          <div>
            <span className="block text-white font-semibold">GitHub</span>
            <span className="text-zinc-500 text-xs uppercase tracking-widest">View Source Code</span>
          </div>
        </a>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="pt-8"
      >
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-3 px-10 py-5 bg-white text-zinc-950 rounded-2xl font-bold shadow-xl transition-all"
        >
          <Send size={20} />
          Reach Out Fast
        </motion.button>
      </motion.div>
    </section>
  );
}
