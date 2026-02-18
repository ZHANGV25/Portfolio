"use client";

export default function Contact() {
  return (
    <section id="contact" className="relative z-10 py-32 px-8 border-t border-white/5">
      <div className="max-w-3xl mx-auto text-center">
        <div className="section-label mb-4 text-zinc-500">Contact</div>
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Let&apos;s Talk
        </h2>
        <p className="text-zinc-400 text-lg mb-12 font-light">
          Always open to interesting projects and conversations.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <a
            href="mailto:vhzhang2020@gmail.com"
            className="cta-btn"
          >
            <span className="crosshair" style={{ width: 12, height: 12, opacity: 0.4 }} />
            EMAIL ME
          </a>
          <a
            href="https://github.com/ZHANGV25"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn"
          >
            GITHUB
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-zinc-600 text-xs tracking-widest uppercase">
          <span>Pittsburgh, PA</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-zinc-800" />
          <span>(904)-307-8098</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-zinc-800" />
          <span>vhzhang2020@gmail.com</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[10px] text-zinc-700 tracking-widest uppercase max-w-5xl mx-auto">
        <span>© 2026 Victor Zhang</span>
        <div className="flex gap-6 mt-4 sm:mt-0">
          <span>Physics</span>
          <span>AI</span>
          <span>Robotics</span>
          <span>Startups</span>
        </div>
      </div>
    </section>
  );
}
