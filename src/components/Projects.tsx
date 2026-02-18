"use client";

const projects = [
  {
    title: "EasyClaw",
    desc: "Consumer AI personal assistant platform. Managed OpenClaw wrapper — one-click deploy, usage-based billing.",
    tags: ["Next.js", "AWS", "Stripe", "Telegram"],
    link: "https://github.com/ZHANGV25/EasyClaw",
    linkLabel: "GitHub",
    date: "2026",
  },
  {
    title: "Quorum",
    desc: "Accounting made easy for contractors. B2C SaaS on the App Store. Backed by Schwartz Center for Entrepreneurship.",
    tags: ["Flutter", "Firebase", "REST API"],
    link: "https://usequorum.app",
    linkLabel: "usequorum.app",
    date: "2025",
  },
  {
    title: "BibleBuddy Kids",
    desc: "Duolingo for the Bible, for kids. 1,000+ iOS downloads. Congressional App Challenge 1st Place.",
    tags: ["iOS", "Swift", "EdTech"],
    link: "https://biblebuddykids.com",
    linkLabel: "biblebuddykids.com",
    date: "2023",
    award: "🏆 Congressional App Challenge 1st Place",
  },
  {
    title: "EventMonkey",
    desc: "OCR posters to calendar events. First startup. Backed by Schwartz Center for Entrepreneurship.",
    tags: ["Flutter", "Firebase", "OCR"],
    date: "2025",
  },
  {
    title: "Student Launch Challenge",
    desc: "Designed a rocket for a college-level rocketry competition while in high school. Raised $8k in funding, organized FAA licensing.",
    tags: ["Aerospace", "CAD", "MATLAB"],
    date: "2024–2025",
  },
  {
    title: "Patent Pending CT Scan",
    desc: "Provisional patent for a new CT scan method using stereoscopy techniques to limit radiation exposure.",
    tags: ["Medical", "Physics", "Patent"],
    date: "2023–Present",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 py-32 px-8 max-w-7xl mx-auto">
      <div className="mb-20">
        <div className="section-label mb-4 text-zinc-500">Projects</div>
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
          What I&apos;ve <span className="opacity-30">_</span> Built
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div key={p.title} className="project-card group">
            {/* Image placeholder */}
            <div className="w-full h-44 rounded-xl bg-white/[0.03] border border-white/5 mb-6 flex items-center justify-center">
              <span className="text-zinc-700 text-xs tracking-widest uppercase">Screenshot</span>
            </div>

            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
              <span className="text-zinc-600 text-xs font-mono mt-1">{p.date}</span>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed mb-4 font-light">{p.desc}</p>

            {p.award && (
              <div className="text-xs text-yellow-500/80 mb-4 font-medium">{p.award}</div>
            )}

            <div className="flex flex-wrap gap-2 mb-4">
              {p.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>

            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-zinc-400 hover:text-white transition-colors underline underline-offset-4 decoration-zinc-700"
              >
                {p.linkLabel} →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
